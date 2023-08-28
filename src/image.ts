interface ImageInfo {
  img?: HTMLImageElement
  src: string
  w: number
  h: number
}
/**
* 获取单张图片的尺寸信息
* @param {string} src 图片地址
* @returns Promise<ImageInfo>
*/
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

    img.onerror = () => resolve({ src, w: 0, h: 0 })
  })
}
/**
* 获取多张图片的尺寸信息
* @param {Array<string>} images 图片地址或者图片信息数组
* @returns Promise<ImageInfo>
*/
export function getSizes(src: ImageInfo[]): Promise<ImageInfo[]> {
  return Promise.all(
    src.map((item) => {
      if (!item.w)
        return getSize(item.src)
      return item
    }),
  )
}
