export function detectWrapper(htmlString: string) {
  let div = document.createElement('div');
  div.innerHTML = htmlString;
  return div.querySelectorAll('p').length === 1;
}
