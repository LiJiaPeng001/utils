export * from './authority'
export * from './validate'

export function getStyle(obj: HTMLElement, attr: keyof CSSStyleDeclaration) {
  return window.getComputedStyle(obj, null)[attr]
}

export function copyText(text: string): void {
  const textArea = document.createElement('textarea')

  textArea.style.position = 'fixed'
  textArea.style.top = '-900px'
  textArea.style.left = '-900px'
  textArea.style.width = '2em'
  textArea.style.height = '2em'
  textArea.value = text
  document.body.appendChild(textArea)
  textArea.select()
  try {
    document.execCommand('copy')
  }
  catch (err) {
    console.error('复制失败,请您手动复制')
  }
  document.body.removeChild(textArea)
}
