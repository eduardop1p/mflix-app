import { LoadingSpinner } from './styled';

/* eslint-disable */

export default function Loading(props) {
  const {
    colorTranparent,
    colorVertical,
    popular,
    margin,
    borderRadiusZero,
    zIndexFive,
  } = props;

  return (
    <LoadingSpinner
      popular={popular}
      colorTranparent={colorTranparent}
      colorVertical={colorVertical}
      margin={margin}
      borderRadiusZero={borderRadiusZero}
      zIndexFive={zIndexFive}
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
