/* eslint-disable */

export default function setDate(past7Day = 0, future) {
  const date = new Date();
  if (future) {
    date.setDate(date.getDate() + past7Day);
  } else {
    date.setDate(date.getDate() - past7Day);
  }

  const zeroLeft = (num) => (num < 10 ? `0${num}` : num);

  return `${date.getFullYear()}-${zeroLeft(date.getMonth() + 1)}-${zeroLeft(
    date.getDate()
  )}`;
}
