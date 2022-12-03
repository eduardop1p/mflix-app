/* eslint-disable */

export default function removeLoadingSipnner(event) {
  const loadingSpinner = event.target.parentElement.querySelector(
    'img + .container-load'
  );
  if (!loadingSpinner) return;
  return loadingSpinner.remove();
}
