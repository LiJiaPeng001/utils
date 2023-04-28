export function getStyle(
  element: HTMLElement,
  property: keyof CSSStyleDeclaration
): string {
  return window.getComputedStyle(element, null)[property] as string;
}

export async function copyText(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (error) {
    const textArea = document.createElement("textarea");
    const style = {
      position: "fixed",
      top: "-900px",
      left: "-900px",
      width: "2em",
      height: "2em",
    };
    Object.assign(textArea.style, style);
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();
    if (document.execCommand) {
      document.execCommand("copy");
      document.body.removeChild(textArea);
      return true;
    } else {
      document.body.removeChild(textArea);
      return false;
    }
  }
}
