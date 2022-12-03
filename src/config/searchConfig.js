/* eslint-disable */

export default function searchConfig(event) {
  event.preventDefault();
  const value = event.target.querySelector('input').value;
  if (!value) {
    return;
  }
  return event.target.submit();
}
