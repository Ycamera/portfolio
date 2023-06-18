export function getRootFontSize() {
  const rootFontSizeOrigin = window.getComputedStyle(document.querySelector("html")).getPropertyValue("font-size");
  const numberOfRootFontSize = Number(rootFontSizeOrigin.replace("px", ""));
  return numberOfRootFontSize;
}
