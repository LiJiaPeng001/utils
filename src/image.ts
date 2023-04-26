interface ImageInfo {
  img?: HTMLImageElement
  src: string
  w: number
  h: number
}

export function getSize(src: string): Promise<ImageInfo> {
  return new Promise((resolve) => {
    const img = new Image()
    img.src = src
    img.crossOrigin = 'anonymous'
    img.onload = function () {
      resolve({
        img,
        src,
        w: img.width,
        h: img.height,
      })
    }

    img.onerror = () => resolve({ src, w: 1, h: 1 })
  })
}

export async function getSizes(src: string | ImageInfo[]): Promise<ImageInfo[]> {
  if (typeof src === 'string') {
    const image = await getSize(src)
    return [image]
  }

  return Promise.all(
    src.map((item) => {
      if (typeof item === 'string')
        return getSize(item)

      if (!item.w)
        return getSize(item.src)

      return item
    }),
  )
}
