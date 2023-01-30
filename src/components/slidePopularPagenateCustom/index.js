import { color1 } from '../../colors';
import SlidePopularPagenateCustomContainer from './styled';

/* eslint-disable */

export default function SlidePopularPagenateCustom() {
  return (
    <SlidePopularPagenateCustomContainer>
      <button className="button-previous-element">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="18px"
          viewBox="0 0 24 24"
          width="18px"
          fill={color1}
        >
          <path d="M0 0h24v24H0V0z" fill="none" opacity=".87" />
          <path d="M17.51 3.87L15.73 2.1 5.84 12l9.9 9.9 1.77-1.77L9.38 12l8.13-8.13z" />
        </svg>
      </button>
      <button className="button-next-element">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="18px"
          viewBox="0 0 24 24"
          width="18px"
          fill={color1}
        >
          <g>
            <path d="M0,0h24v24H0V0z" fill="none" />
          </g>
          <g>
            <polygon points="6.23,20.23 8,22 18,12 8,2 6.23,3.77 14.46,12" />
          </g>
        </svg>
      </button>
    </SlidePopularPagenateCustomContainer>
  );
}
