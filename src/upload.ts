interface UploadOptions {
  multiple: boolean
  accept?: string
}

let input: HTMLInputElement

/**
 * @desc 获取上传文件
 * @param options UploadOptions
 * @returns Array
 */

export function getFiles(options: UploadOptions): Promise<FileList> {
  return new Promise((resolve) => {
    if (!input) {
      input = document.createElement('input')
      input.type = 'file'
      input.style.position = 'fixed'
      input.style.top = '-1000px'
      document.body.append(input)
    }
    input.multiple = options.multiple
    input.accept = options.accept || 'image/*'
    input.value = ''
    input.click()
    input.onchange = function () {
      resolve(input.files as FileList)
    }
  })
}

/**
 * @desc file转base6
 */
export function fileToBase64(file: File) {
  const reader = new FileReader()
  return new Promise((resolve, reject) => {
    reader.onload = function (e) {
      resolve(e.target?.result)
    }
    reader.onerror = function (error) {
      reject(error)
    }
    reader.readAsDataURL(file)
  })
}

/**
 * @desc 获取file blob地址
 */
export function getBlobUrl(file: File) {
  let url = null
  if (window.createObjectURL !== undefined) {
    // basic
    url = window.createObjectURL(file)
  }
  else if (window.URL !== undefined) {
    // mozilla(firefox)
    url = window.URL.createObjectURL(file)
  }
  else if (window.webkitURL !== undefined) {
    // webkit or chrome
    url = window.webkitURL.createObjectURL(file)
  }
  return url
}
