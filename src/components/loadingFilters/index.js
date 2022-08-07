import { LoadingSpinner } from './styled';

/* eslint-disable */

export default function LoadingFilters() {
  return (
    <LoadingSpinner className="container-load">
      <div className="load-spinner">
        <div className="load">
          <div className="l1">
            <div></div>
            <div></div>
          </div>
          <div className="l2">
            <div></div>
            <div></div>
          </div>
        </div>
      </div>
    </LoadingSpinner>
  );
}
