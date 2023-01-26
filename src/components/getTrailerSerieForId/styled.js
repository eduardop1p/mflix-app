import styled from 'styled-components';

import { color1 } from '../../colors';

const MsgVideoTrailerErrorContainer = styled.div`
  height: 100%;
  width: 100%;

  & > small {
    color: ${color1};
    font-size: 0.62rem;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    opacity: 0.9;
    bottom: 1.5rem;
  }

  & > video {
    object-fit: contain;

    height: 100%;
    width: 100%;
  }
`;

export default MsgVideoTrailerErrorContainer;
