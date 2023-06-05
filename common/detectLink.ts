export function detectLink(htmlString: string) {
  let div = document.createElement('div');
  div.innerHTML = htmlString;
  if (div.querySelector('a')) {
    // eslint-disable-next-line no-undef
    const aTag: NodeListOf<HTMLAnchorElement> | null =
      div.querySelectorAll('a');

    aTag.forEach((item) => {
      const newATag = item.cloneNode(true) as HTMLAnchorElement;
      if (newATag.target !== '_blank') {
        newATag.target = '_blank';
      }
      htmlString = htmlString.replace(
        item.outerHTML.toString(),
        newATag.outerHTML.toString()
      );
    });

    return htmlString;
  }

  return htmlString;
}
