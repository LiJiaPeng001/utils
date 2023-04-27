interface UploadOptions {
  multiple?: boolean
  accept?: string
}

function createInput(): HTMLInputElement {
  const className = 'peeeng-upload-input'
  let input = document.getElementsByClassName(className)[0] as HTMLInputElement
  if (!input) {
    input = document.createElement('input')
    input.type = 'file'
    input.className = className
    input.style.position = 'fixed'
    input.style.top = '-1000px'
    document.body.append(input)
  }
  return input
}

/**
 * @desc 获取上传文件
 * @param options UploadOptions
 * @returns Array
 */

export function getFiles({ multiple = false, accept = 'image/*' }: UploadOptions): Promise<FileList> {
  return new Promise((resolve) => {
    const input = createInput()
    input.multiple = multiple
    input.accept = accept
    input.value = ''
    input.click()
    input.onchange = () => resolve(input.files as FileList)
  })
}

/**
 * @desc file转base6
 */
export function fileToBase64(file: File): Promise<string> {
  const reader = new FileReader()
  return new Promise((resolve, reject) => {
    reader.onload = e => resolve(e.target?.result as string)
    reader.onerror = error => reject(error)
    reader.readAsDataURL(file)
  })
}

/**
 * @desc 获取file blob地址
 */
export const getBlobUrl = (file: File): string => URL.createObjectURL(file)
