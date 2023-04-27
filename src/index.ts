export function getStyle(element: HTMLElement, property: keyof CSSStyleDeclaration): string {
  return window.getComputedStyle(element, null)[property] as string
}

export async function copyText(text: string): Promise<boolean> {
  const textArea = document.createElement('textarea')
  const style = {
    position: 'fixed',
    top: '-900px',
    left: '-900px',
    width: '2em',
    height: '2em',
  }
  Object.assign(textArea.style, style)
  textArea.value = text
  document.body.appendChild(textArea)
  textArea.select()
  try {
    await navigator.clipboard.writeText(text)
    document.body.removeChild(textArea)
    return true
  }
  catch (error) {
    document.body.removeChild(textArea)
    return false
  }
}
