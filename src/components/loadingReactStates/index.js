import { LoadingSpinner } from './styled';

/* eslint-disable */

export default function Loading(props) {
  const { colorTranparent, colorVertical, popular, margin } = props;

  return (
    <LoadingSpinner
      popular={popular}
      colorTranparent={colorTranparent}
      colorVertical={colorVertical}
      margin={margin}
      className="container-load"
    >
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
