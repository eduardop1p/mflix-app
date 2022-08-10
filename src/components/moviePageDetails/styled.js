import styled from 'styled-components';

import * as colors from '../../colors/index';

export const Main = styled.main`
  width: 100%;
  position: relative;
  z-index: 1;
`;

export const BgImgPageDetails = styled.div`
  width: 100%;
  height: 270px;
  background-image: url(${(props) => props.backdrop_path});
  background-repeat: no-repeat;
  background-size: cover;
  position: absolute;
  border-radius: 0 1rem 0 0;
  overflow: hidden;
  z-index: -1;

  & > .bg-color-page-details {
    background-color: ${colors.color3};
    width: 100%;
    height: 100%;
    opacity: 0.8;
  }
`;

export const ContainerDatails = styled.div`
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  width: 100%;

  h4 {
    font-size: 16.5px;
    font-weight: 500;
    color: ${colors.color1};
  }

  h5 {
    font-size: 12.5px;
    font-weight: 600;
    color: #57566c;
  }

  & > .d0 {
    display: flex;
    gap: 1rem;

    & > .midia-files-collection {
      margin-top: 12rem;
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
      width: 100%;

      & > .favorite {
        width: 50px;
        height: 50px;
        align-self: flex-end;
        position: relative;

        & > svg {
          width: 100%;
          height: 100%;

          & > path {
            cursor: pointer;
            transition: all 0.1s linear;
          }

          & > [data-favorite='true'] {
            fill: #ff0000;
          }

          & > [data-favorite='false'] {
            fill: #fff;
          }

          & > [data-scale] {
            transform: scale(1.1);
          }
        }
      }

      & > .collection-class {
        & > h4 {
          margin-bottom: 1.2rem;
        }

        & > .no-collection {
          width: 100%;
          max-height: 435px;

          & > img {
            width: 100%;
            max-height: inherit;
            border-radius: 8px;
          }
        }
      }
    }
  }

  & > .movies-new {
    position: relative;
    height: 270px;

    & > h4 {
      font-size: 17px;
      margin-bottom: 1.2rem;
      font-weight: 600;
    }
  }
`;

export const PosterDetailsSimilarTrailer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  width: calc(100% - 25%);

  & > .poster-details-similar {
    display: flex;
    gap: 2rem;

    & > .poster-description {
      width: 300px;
      flex: none;
      height: 450px;
      position: relative;

      & > img {
        width: 100%;
        height: 100%;
        border-radius: 1rem;
        margin-bottom: 1rem;
      }

      & > .description {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;

        & > :last-child {
          color: #57566c;
          font-weight: 400;
          font-size: 12.5px;
          width: 100%;
          height: 200px;
          flex: none;
          overflow: hidden;

          &:hover,
          &:focus {
            overflow-y: scroll;
            overflow-x: hidden;

            &::-webkit-scrollbar {
              width: 3px;
            }

            &::-webkit-scrollbar-thumb {
              border-radius: 1rem;
              background-color: ${colors.color2};
            }

            &::-webkit-scrollbar-track {
              background-color: transparent;
            }
          }
        }
      }
    }

    & > .details-similar {
      margin-top: 6rem;
      display: flex;
      flex-direction: column;
      gap: 3rem;
      width: 650px;

      & > .d1 {
        display: flex;
        flex-direction: column;
        gap: 12px;

        & > h1 {
          max-width: 40rem;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
          font-size: 2rem;
          font-weight: 700;
          margin: 3px 0;
          color: ${colors.color1};
          cursor: default;
        }

        & > .year-genre-details {
          display: flex;
          gap: 5px;
          color: ${colors.color1};
          font-weight: 400;
          font-size: 15.5px;
        }

        & > .rating-imdb-details {
          display: flex;
          flex-direction: column;
          color: ${colors.color1};

          &:last-child {
            & > :first-child {
              display: flex;
              gap: 3px;
              align-items: center;

              & > :last-child {
                margin-left: 10px;
                font-size: 15px;
              }
            }
          }
        }
      }

      & > .d2 {
        display: flex;
        flex-direction: column;
        gap: 2rem;

        & > .about-details {
          & > h4 {
            margin-bottom: 1.2rem;
          }

          & > .about {
            display: flex;
            gap: 2rem;

            & > div {
              & > :nth-child(1),
              & > :nth-child(2) {
                margin-bottom: 1rem;
              }

              & > div {
                display: flex;
                gap: 10px;

                & > ul {
                  display: flex;
                  flex-direction: column;
                  gap: 3px;

                  & > li {
                    color: #57566c;
                    font-weight: 400;
                    font-size: 12.5px;
                  }
                }
              }
            }
          }
        }

        & > .similar {
          position: relative;
          width: 100%;
          height: 260px;

          & > h4 {
            margin-bottom: 1.2rem;
          }

          & > .not-similar {
            width: 100%;
            height: 222px;

            & > img {
              width: 100%;
              height: 100%;
              object-fit: cover;
              border-radius: 1rem;
            }
          }
        }
      }
    }
  }

  & > .description {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;

    & > :last-child {
      color: #57566c;
      font-weight: 400;
      font-size: 12.5px;
      width: 100%;
      overflow: hidden;

      &:hover,
      &:focus {
        overflow-y: scroll;
        overflow-x: hidden;

        &::-webkit-scrollbar {
          width: 3px;
        }

        &::-webkit-scrollbar-thumb {
          border-radius: 1rem;
          background-color: ${colors.color2};
        }

        &::-webkit-scrollbar-track {
          background-color: transparent;
        }
      }
    }
  }

  & > .trailer-details-page {
    height: 500px;
    border-radius: 1rem;
    overflow: hidden;
    background-color: #111;
    position: relative;

    & > .msg-video-trailer-error {
      color: ${colors.color1};
      font-size: 10px;
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      opacity: 0.9;
      bottom: 2rem;
    }

    & > video {
      object-fit: contain;
      height: 100%;
      width: 100%;
    }
  }
`;

export const NewSimilar = styled.div`
  width: 100%;
  position: absolute;

  .popular-movie-slider {
    display: flex;
    gap: 1rem;
    background-color: ${colors.color7};
    height: 220px;
    border-radius: 5px;
    padding: 10px;

    & > .movie-popular-img {
      width: 125px;
      flex: none;
      position: relative;

      & > img {
        border-radius: 10px;
        width: 100%;
        height: 100%;
      }
    }

    & > .movie-popular-details {
      padding: 10px 10px 1rem 0;
      display: flex;
      max-width: 140px;
      flex-direction: column;
      gap: 9px;

      & > a > h3 {
        max-width: 8rem;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        flex: none;
        font-size: 15px;
        font-weight: 600;
        color: ${colors.color1};
        transition: color 0.2s ease-in-out;
      }

      & > .popular-year-genre {
        font-size: 13px;
        font-weight: 400;
        color: #57566c;
        display: flex;
        gap: 5px;
        align-items: center;

        & > :last-child {
          max-width: 5rem;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      }

      & > .vertical-overview {
        font-size: 13px;
        flex: none;
        color: #57566c;
        max-width: 10rem;
        height: 48px;
        overflow-y: hidden;
        overflow-x: hidden;

        &:hover,
        &:focus {
          overflow-y: scroll;

          &::-webkit-scrollbar {
            width: 3px;
          }

          &::-webkit-scrollbar-thumb {
            border-radius: 1rem;
            background-color: ${colors.color2};
          }

          &::-webkit-scrollbar-track {
            background-color: transparent;
          }
        }
      }

      & > .popular-imdb-rating-voteAverage {
        color: #57566c;
        font-size: 13px;
        font-weight: 500;

        & > .popular-rating-voteAverage {
          display: flex;
          align-items: center;

          & > .popular-voteAverage {
            margin-left: 10px;
          }
        }
      }

      & > a > .popular-watch-now {
        background-color: ${colors.color6};
        font-weight: 400;
        color: ${colors.color1};
        border-radius: 1.5rem;
        font-size: 12px;
        width: fit-content;
        padding: 8px 1.2rem;
        transition: all 0.2s ease-in-out;

        &:hover {
          background-color: ${colors.color2};
        }
      }
    }
  }
`;

export const ImagesPosters = styled.div`
  width: 100%;

  & > .buttoms-image-posters-logos {
    display: flex;
    gap: 5px;
    margin-bottom: 1.2rem;

    & > button {
      border-radius: 1rem;
      padding: 7px 0;
      width: 100%;
      color: ${colors.color1};
      font-size: 12px;
      font-weight: 500;
      transition: background 0.2s ease-in-out;

      &:hover {
        background-color: ${colors.color2};
      }
    }

    & > .images {
      background-color: ${(props) =>
        props.imageButtonActived ? colors.color2 : colors.color7};
    }

    & > .posters {
      background-color: ${(props) =>
        props.posterButtonActived ? colors.color2 : colors.color7};
    }

    & > .logos {
      background-color: ${(props) =>
        props.logoButtonActived ? colors.color2 : colors.color7};
    }
  }

  & > .pqp-eduardo-lavoura {
    width: 100%;
    overflow-x: hidden;
    overflow-y: scroll;

    &::-webkit-scrollbar {
      width: 3px;
    }

    &::-webkit-scrollbar-thumb {
      border-radius: 1rem;
      background-color: ${colors.color2};
    }

    &::-webkit-scrollbar-track {
      background-color: transparent;
    }

    & > div {
      cursor: default;
      padding-right: 8px;
      margin-bottom: 8px;
      position: relative;
      display: inline-block;
      width: calc(100% / 1);

      & > img {
        width: 100%;
        height: 100%;
        border-radius: 10px;
      }
    }

    & > .no-fotos-posters-logos {
      width: 100%;
      height: fit-content;

      & > img {
        width: 100%;
        height: 100%;
      }
    }
  }
`;

export const Collections = styled.div`
  height: 500px;
  overflow-x: hidden;
  overflow-y: scroll;

  &::-webkit-scrollbar {
    width: 3px;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 1rem;
    background-color: ${colors.color2};
  }

  &::-webkit-scrollbar-track {
    background-color: transparent;
  }

  & > .vertical-popular-img-details {
    margin-bottom: 50px;
    width: calc(100% / 2);
    padding-right: 10px;
    height: 200px;
    display: inline-block;

    & > :first-child {
      width: 100%;
      height: 100%;
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;

      & > img {
        width: 100%;
        height: 100%;
        border-radius: 1rem;
      }

      & > :last-child {
        position: absolute;
        visibility: hidden;
        border-radius: 1rem;
      }

      &:hover,
      &:focus {
        & > :last-child {
          visibility: visible;
          width: 100%;
          height: 100%;
          background-color: #1111118c;
          position: absolute;
          display: flex;
          justify-content: center;
          align-items: center;
          transition: all 0.3s ease-in-out;

          & > a > button {
            background-color: ${colors.color6};
            font-weight: 500;
            color: ${colors.color1};
            border-radius: 1.5rem;
            font-size: 12.5px;
            width: fit-content;
            padding: 8px 1.2rem;
            transition: background 0.2s ease-in-out;

            &:hover {
              background-color: ${colors.color2};
            }
          }
        }
      }
    }

    & > .popular-conatiner-details {
      margin: 5px 5px 0;

      & > a > h5 {
        max-width: 11rem;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        font-size: 14px;
        color: ${colors.color1};
        font-weight: 600;
        padding: 0 2px;
        margin-bottom: 2px;
      }

      & > .popular-details {
        display: flex;
        gap: 2px;
        color: #57566c;

        & > div {
          padding: 0 2px;
          font-size: 13px;
          font-weight: 500;
        }

        & > :last-child {
          max-width: 5.5rem;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      }
    }
  }
`;

export const NewMovies = styled.div`
  width: 100%;
  position: absolute;

  .popular-movie-slider {
    display: flex;
    gap: 1rem;
    background-color: ${colors.color7};
    height: 220px;
    border-radius: 5px;
    padding: 10px;

    & > .movie-popular-img {
      width: 125px;
      flex: none;
      position: relative;

      & > img {
        border-radius: 10px;
        width: 100%;
        height: 100%;
      }
    }

    & > .movie-popular-details {
      padding: 10px 10px 1rem 0;
      display: flex;
      max-width: 140px;
      flex-direction: column;
      gap: 9px;

      & > a > h3 {
        max-width: 8rem;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        flex: none;
        font-size: 15px;
        font-weight: 600;
        color: ${colors.color1};
        transition: color 0.2s ease-in-out;
      }

      & > .popular-year-genre {
        font-size: 13px;
        font-weight: 400;
        color: #57566c;
        display: flex;
        gap: 5px;
        align-items: center;

        & > :last-child {
          max-width: 5rem;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      }

      & > .vertical-overview {
        font-size: 13px;
        flex: none;
        color: #57566c;
        max-width: 10rem;
        height: 48px;
        overflow-y: hidden;
        overflow-x: hidden;

        &:hover,
        &:focus {
          overflow-y: scroll;

          &::-webkit-scrollbar {
            width: 3px;
          }

          &::-webkit-scrollbar-thumb {
            border-radius: 1rem;
            background-color: ${colors.color2};
          }

          &::-webkit-scrollbar-track {
            background-color: transparent;
          }
        }
      }

      & > .popular-imdb-rating-voteAverage {
        color: #57566c;
        font-size: 13px;
        font-weight: 500;

        & > .popular-rating-voteAverage {
          display: flex;
          align-items: center;

          & > .popular-voteAverage {
            margin-left: 10px;
          }
        }
      }

      & > a > .popular-watch-now {
        background-color: ${colors.color6};
        font-weight: 400;
        color: ${colors.color1};
        border-radius: 1.5rem;
        font-size: 12px;
        width: fit-content;
        padding: 8px 1.2rem;
        transition: all 0.2s ease-in-out;

        &:hover {
          background-color: ${colors.color2};
        }
      }
    }
  }
`;
