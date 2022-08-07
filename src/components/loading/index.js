import { useSelector } from 'react-redux';

import { LoadingStyled, LogoMflix } from './styled';

export default function Loading() {
  const loadingState = useSelector((state) => state.loading.loadingState);

  return (
    loadingState && (
      <LoadingStyled>
        <h1>MFLIX</h1>
        <LogoMflix>
          <div className="oco">
            <div></div>
            <div></div>
            <div></div>
          </div>
        </LogoMflix>
      </LoadingStyled>
    )
  );
}
