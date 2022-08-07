import { Component } from 'react';

import * as colors from '../../colors/index';

export default class RatingSystem extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    /* eslint-disable */
    const { vote_average, color } = this.props;

    return (
      <>
        {vote_average <= 2 || vote_average > 2 ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            enableBackground="new 0 0 24 24"
            height="15px"
            viewBox="0 0 24 24"
            width="15px"
            fill={color ? color : colors.color2}
          >
            <g>
              <path d="M0,0h24v24H0V0z" fill="none" />
              <path d="M0,0h24v24H0V0z" fill="none" />
            </g>
            <g>
              <path d="M12,17.27L18.18,21l-1.64-7.03L22,9.24l-7.19-0.61L12,2L9.19,8.63L2,9.24l5.46,4.73L5.82,21L12,17.27z" />
            </g>
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="15px"
            viewBox="0 0 24 24"
            width="15px"
            fill={color ? color : colors.color2}
          >
            <path d="M0 0h24v24H0V0z" fill="none" />
            <path d="M22 9.24l-7.19-.62L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27 18.18 21l-1.63-7.03L22 9.24zM12 15.4l-3.76 2.27 1-4.28-3.32-2.88 4.38-.38L12 6.1l1.71 4.04 4.38.38-3.32 2.88 1 4.28L12 15.4z" />
          </svg>
        )}

        {vote_average >= 4 ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            enableBackground="new 0 0 24 24"
            height="15px"
            viewBox="0 0 24 24"
            width="15px"
            fill={color ? color : colors.color2}
          >
            <g>
              <path d="M0,0h24v24H0V0z" fill="none" />
              <path d="M0,0h24v24H0V0z" fill="none" />
            </g>
            <g>
              <path d="M12,17.27L18.18,21l-1.64-7.03L22,9.24l-7.19-0.61L12,2L9.19,8.63L2,9.24l5.46,4.73L5.82,21L12,17.27z" />
            </g>
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="15px"
            viewBox="0 0 24 24"
            width="15px"
            fill={color ? color : colors.color2}
          >
            <path d="M0 0h24v24H0V0z" fill="none" />
            <path d="M22 9.24l-7.19-.62L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27 18.18 21l-1.63-7.03L22 9.24zM12 15.4l-3.76 2.27 1-4.28-3.32-2.88 4.38-.38L12 6.1l1.71 4.04 4.38.38-3.32 2.88 1 4.28L12 15.4z" />
          </svg>
        )}

        {vote_average >= 6 ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            enableBackground="new 0 0 24 24"
            height="15px"
            viewBox="0 0 24 24"
            width="15px"
            fill={color ? color : colors.color2}
          >
            <g>
              <path d="M0,0h24v24H0V0z" fill="none" />
              <path d="M0,0h24v24H0V0z" fill="none" />
            </g>
            <g>
              <path d="M12,17.27L18.18,21l-1.64-7.03L22,9.24l-7.19-0.61L12,2L9.19,8.63L2,9.24l5.46,4.73L5.82,21L12,17.27z" />
            </g>
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="15px"
            viewBox="0 0 24 24"
            width="15px"
            fill={color ? color : colors.color2}
          >
            <path d="M0 0h24v24H0V0z" fill="none" />
            <path d="M22 9.24l-7.19-.62L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27 18.18 21l-1.63-7.03L22 9.24zM12 15.4l-3.76 2.27 1-4.28-3.32-2.88 4.38-.38L12 6.1l1.71 4.04 4.38.38-3.32 2.88 1 4.28L12 15.4z" />
          </svg>
        )}

        {vote_average >= 8 ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            enableBackground="new 0 0 24 24"
            height="15px"
            viewBox="0 0 24 24"
            width="15px"
            fill={color ? color : colors.color2}
          >
            <g>
              <path d="M0,0h24v24H0V0z" fill="none" />
              <path d="M0,0h24v24H0V0z" fill="none" />
            </g>
            <g>
              <path d="M12,17.27L18.18,21l-1.64-7.03L22,9.24l-7.19-0.61L12,2L9.19,8.63L2,9.24l5.46,4.73L5.82,21L12,17.27z" />
            </g>
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="15px"
            viewBox="0 0 24 24"
            width="15px"
            fill={color ? color : colors.color2}
          >
            <path d="M0 0h24v24H0V0z" fill="none" />
            <path d="M22 9.24l-7.19-.62L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27 18.18 21l-1.63-7.03L22 9.24zM12 15.4l-3.76 2.27 1-4.28-3.32-2.88 4.38-.38L12 6.1l1.71 4.04 4.38.38-3.32 2.88 1 4.28L12 15.4z" />
          </svg>
        )}

        {vote_average >= 10 ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            enableBackground="new 0 0 24 24"
            height="15px"
            viewBox="0 0 24 24"
            width="15px"
            fill={color ? color : colors.color2}
          >
            <g>
              <path d="M0,0h24v24H0V0z" fill="none" />
              <path d="M0,0h24v24H0V0z" fill="none" />
            </g>
            <g>
              <path d="M12,17.27L18.18,21l-1.64-7.03L22,9.24l-7.19-0.61L12,2L9.19,8.63L2,9.24l5.46,4.73L5.82,21L12,17.27z" />
            </g>
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="15px"
            viewBox="0 0 24 24"
            width="15px"
            fill={color ? color : colors.color2}
          >
            <path d="M0 0h24v24H0V0z" fill="none" />
            <path d="M22 9.24l-7.19-.62L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27 18.18 21l-1.63-7.03L22 9.24zM12 15.4l-3.76 2.27 1-4.28-3.32-2.88 4.38-.38L12 6.1l1.71 4.04 4.38.38-3.32 2.88 1 4.28L12 15.4z" />
          </svg>
        )}
      </>
    );
  }
}
