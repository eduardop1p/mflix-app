import { deburr } from 'lodash';

export default function clearLinkTitle(linkTitle) {
  return deburr(linkTitle)
    .toLocaleLowerCase()
    .replace(/ /g, '-')
    .replace(/:/g, '');
}
