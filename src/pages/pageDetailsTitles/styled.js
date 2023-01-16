import styled from 'styled-components';

import * as colors from '../../colors/index';

/* eslint-disable */

export const Main = styled.main`
  width: 100%;
  position: relative;
  z-index: 1;
  overflow: hidden;
`;

export const BgImgPageDetails = styled.div`
  width: 100%;
  height: 250px;
  position: absolute;
  border-radius: 0 1rem 0 0;
  overflow: hidden;
  z-index: -4;

  @media (min-width: 1700px) {
    height: 280px;
  }
  @media (max-width: 720px) {
    height: 200px;
  }

  & > img {
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: -3;
    object-fit: cover;
  }

  &::before {
    content: '';
    position: absolute;
    z-index: -2;
    background-color: ${colors.color3};
    width: 100%;
    height: 100%;
    opacity: 0.8;
  }
`;

export const ContainerDatails = styled.div`
  padding: 1rem;
  display: flex;
  flex-direction: column;
  width: 100%;

  h5 {
    font-size: 0.78rem;
    font-weight: 600;
    color: #57566c;
    width: min-content;
  }

  & > .d0 {
    display: flex;
    overflow: hidden;
    height: ${({ newCollectionId }) => (newCollectionId ? '1250px' : 'auto')};

    @media (min-width: 1700px) {
      height: ${({ newCollectionId }) => (newCollectionId ? '1450px' : 'auto')};
    }
    @media (max-width: 1330px) {
      height: ${({ newCollectionId }) => (newCollectionId ? '1400px' : 'auto')};
    }
    @media (max-width: 1049px) {
      height: ${({ newCollectionId }) => (newCollectionId ? '1150px' : 'auto')};
    }
    @media (max-width: 1000px) {
      height: auto;
    }
  }

  & > .trailer-and-images {
    display: flex;
    height: 500px;
    overflow: hidden;

    & > :first-child {
      margin-right: 1rem;
    }
  }
`;

export const PosterDetailsSimilarTrailer = styled.div`
  display: flex;
  flex-direction: ${({ newCollectionId }) =>
    newCollectionId ? 'column' : 'row'};
  width: ${({ width100 }) => {
    if (width100) return '100%';
    return 'calc(100% - 25%)';
  }};

  @media (min-width: 2001px) {
    width: ${({ width100 }) => {
      if (width100) return '100%';
      return 'calc(100% - 25%)';
    }};
  }
  @media (min-width: 1700px) and (max-width: 2000px) {
    width: ${({ width100 }) => {
      if (width100) return '100%';
      return 'calc(100% - 23%)';
    }};
  }
  @media (max-width: 1000px) {
    width: 100%;
  }

  & > .poster-details-similar {
    display: flex;
    width: 100%;

    & > .poster-description {
      width: 260px;
      height: 390px;
      margin-top: 0.5rem;
      flex-shrink: 0;
      margin-right: 1rem;

      @media (max-width: 600px) {
        margin-bottom: 1rem;
      }

      @media (min-width: 1700px) {
        width: 280px;
        height: 420px;
      }
      @media (max-width: 1250px) {
        width: 240px;
        height: 370px;
        margin-top: 1rem;
      }
      @media (max-width: 720px) {
        width: 220px;
        height: 330px;
        margin-top: 0;
      }
      @media (max-width: 400px) {
        position: relative;
        left: 50%;
        transform: translate(-50%);
      }

      & > img {
        width: 100%;
        height: 100%;
        border-radius: 1rem;
        object-fit: cover;
      }
    }
  }
`;

export const NewSimilar = styled.div`
  width: 100%;

  @media (max-width: 630px) {
    margin-top: 1rem;
  }

  & > .similar {
    width: 100%;

    & > h4 {
      font-size: 1.06rem;
      margin-bottom: 12px;
      font-weight: 600;
      color: ${colors.color1};
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

    .popular-slider {
      display: flex;
      background-color: ${colors.color7};
      height: auto;
      border-radius: 5px;
      padding: 10px;
      justify-content: space-between;

      @media (max-width: 1330px) {
        flex-direction: column;
      }
      @media (max-width: 1049px) {
        flex-direction: row;
      }
      @media (max-width: 925px) {
        flex-direction: column;
      }
      @media (max-width: 800px) {
        flex-direction: row;
      }
      @media (max-width: 630px) {
        flex-direction: column;
      }
      @media (max-width: 500px) {
        flex-direction: row;
      }
      @media (max-width: 350px) {
        align-items: center;
        flex-direction: column;
      }

      & > .popular-img {
        width: 125px;
        height: 180px;
        flex: none;
        position: relative;
        margin-right: 1rem;

        @media (max-width: 1330px) {
          margin-right: 0;
          margin-bottom: 1rem;
          width: 100%;
          height: 19.5vw;
        }
        @media (max-width: 1200px) {
          width: 100%;
          height: 18vw;
        }
        @media (max-width: 1100px) {
          width: 100%;
          height: 17vw;
        }
        @media (max-width: 1049px) {
          width: 115px;
          height: 160px;
          margin-bottom: 0;
          margin-right: 1rem;
        }
        @media (max-width: 1000px) {
          width: 110px;
          height: 150px;
        }
        @media (max-width: 925px) {
          width: 100%;
          height: 24vw;
          margin-right: 0;
          margin-bottom: 1rem;
        }
        @media (max-width: 890px) {
          width: 100%;
          height: 23vw;
        }
        @media (max-width: 850px) {
          width: 100%;
          height: 22vw;
        }
        @media (max-width: 800px) {
          width: 110px;
          height: 150px;
          margin-bottom: 0;
          margin-right: 1rem;
        }
        @media (max-width: 630px) {
          width: 100%;
          height: 34vw;
          margin-right: 0;
          margin-bottom: 1rem;
        }
        @media (max-width: 610px) {
          height: 33vw;
        }
        @media (max-width: 580px) {
          height: 32vw;
        }
        @media (max-width: 550px) {
          height: 31vw;
        }
        @media (max-width: 520px) {
          height: 29.5vw;
        }
        @media (max-width: 500px) {
          width: 110px;
          height: 150px;
          margin-right: 1rem;
          margin-bottom: 0;
        }
        @media (max-width: 350px) {
          width: 120px;
          height: 180px;
          margin-right: 0;
          margin-bottom: 1rem;
        }

        & > img {
          border-radius: 10px;
          object-fit: cover;
          width: 100%;
          height: 100%;
        }
      }

      & > .popular-details {
        display: flex;
        flex-direction: column;
        justify-content: center;

        & > :not(:last-child) {
          margin-bottom: 5px;
        }

        & > a > h3 {
          width: 100%;
          display: -webkit-box;
          -webkit-line-clamp: 1;
          overflow: hidden;
          text-overflow: ellipsis;
          -webkit-box-orient: vertical;
          font-size: 0.93rem;
          font-weight: 600;
          color: ${colors.color1};
        }

        & > .popular-year-genre {
          font-size: 0.81rem;
          font-weight: 400;
          color: #57566c;
          display: flex;
          align-items: center;

          & > :not(:last-child) {
            margin-right: 3px;
          }

          & > :last-child {
            width: 100%;
            word-break: break-all;
            display: -webkit-box;
            -webkit-line-clamp: 1;
            overflow: hidden;
            text-overflow: ellipsis;
            -webkit-box-orient: vertical;
          }
        }

        & > .vertical-overview {
          font-size: 0.81rem;
          flex: none;
          color: #57566c;
          max-width: 10rem;
          height: 34px;
          overflow: hidden;

          &:hover,
          &:focus {
            overflow: hidden scroll;

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
          font-size: 0.81rem;
          font-weight: 500;

          & > .popular-rating-voteAverage {
            display: flex;
            align-items: center;

            & > .popular-voteAverage {
              margin-left: 5px;
            }

            @media (max-width: 350px) {
              flex-direction: column;
              align-items: flex-start;

              & > .popular-voteAverage {
                margin-left: 2px;
              }
            }
          }
        }

        & > .popular-watch-now {
          background-color: ${colors.color6};
          font-weight: 400;
          color: ${colors.color1};
          border-radius: 1.5rem;
          font-size: 0.75rem;
          width: fit-content;
          padding: 8px 1.2rem;
          transition: all 0.2s ease-in-out;
          white-space: nowrap;
          text-align: center;

          @media (max-width: 1330px) and (min-width: 1050px),
            (max-width: 930px) and (min-width: 801px) {
            padding: 8px 0;
            width: 100%;
          }
          @media (max-width: 1049px) and (min-width: 956px),
            (max-width: 800px) {
            width: fit-content;
            padding: 8px 1.2re;
          }
          @media (max-width: 630px) {
            padding: 8px 0;
            width: 100%;
          }
          @media (max-width: 500px) {
            width: fit-content;
            padding: 8px 1.2rem;
          }
          @media (max-width: 360px) {
            padding: 8px 0;
            width: 100%;
          }
          @media (max-width: 350px) {
            width: fit-content;
            padding: 8px 1.2rem;
            margin: 0 auto;
          }

          &:hover {
            background-color: ${colors.color2};
          }
        }
      }
    }
  }
`;

export const ImagesContainer = styled.div`
  width: 100%;

  @media (max-width: 700px) {
    margin-top: ${({ noNewCollectionId }) => (noNewCollectionId ? '8px' : 0)};
  }

  & > .btn-img-posters-logos {
    display: flex;
    margin-bottom: 10px;
    justify-content: center;

    & > :not(:last-child) {
      margin-right: 5px;
    }

    @media (min-width: 1700px) {
      & > :not(:last-child) {
        margin-right: 8px;
      }
    }
    @media (max-width: 1000px) {
      & > :not(:last-child) {
        margin-right: 8px;
      }
    }
    @media (max-width: 650px) {
      & > :not(:last-child) {
        margin-right: 5px;
      }
    }

    & > button {
      border-radius: 1rem;
      padding: 7px 0;
      width: 100%;
      max-width: 120px;
      color: ${colors.color1};
      font-size: 0.75rem;
      font-weight: 500;
      transition: background 0.2s ease-in-out;

      &:hover {
        background-color: ${colors.color2};
      }
    }

    & > .images {
      background-color: ${({ imageButtonActived }) =>
        imageButtonActived ? colors.color2 : colors.color7};
    }

    & > .posters {
      background-color: ${({ posterButtonActived }) =>
        posterButtonActived ? colors.color2 : colors.color7};
    }

    & > .logos {
      background-color: ${({ logoButtonActived }) =>
        logoButtonActived ? colors.color2 : colors.color7};
    }
  }

  & > .pqp-eduardo-lavoura {
    width: 100%;
    overflow: hidden scroll;

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
      width: calc(100% / 2);
      height: auto;

      @media (min-width: 1001px) and (max-width: 1699px) {
        width: ${({ imageButtonActived, logoButtonActived }) =>
          imageButtonActived || logoButtonActived ? '100%' : 'calc(100% / 2)'};
      }
      @media (max-width: 1000px) {
        width: calc(100% / 2);
      }
      @media (max-width: 850px) {
        width: ${({ imageButtonActived, logoButtonActived }) =>
          imageButtonActived || logoButtonActived ? '100%' : 'calc(100% / 2)'};
      }
      @media (max-width: 700px) {
        width: calc(100% / 2);
      }
      @media (max-width: 650px) {
        width: ${({
          imageButtonActived,
          logoButtonActived,
          noNewCollectionId,
        }) =>
          noNewCollectionId
            ? 'calc(100% / 2)'
            : imageButtonActived || logoButtonActived
            ? '100%'
            : 'calc(100% / 2)'};
      }
      @media (max-width: 550px) {
        width: 100%;
      }
      @media (max-width: 410px) {
        width: ${({ imageButtonActived, logoButtonActived }) =>
          imageButtonActived || logoButtonActived ? '100%' : 'calc(100% / 2)'};
      }

      & > img {
        object-fit: cover;
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
  margin-top: 8px;

  @media (max-width: 1000px) {
    margin-top: 0;
  }
  @media (max-width: 410px) {
    margin-top: 8px;
  }

  & > h4 {
    font-size: 1.06rem;
    margin-bottom: 10px;
    font-weight: 600;
    color: ${colors.color1};
  }

  & > .collection {
    overflow: hidden scroll;

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
      margin-bottom: 8px;
      width: calc(100% / 2);
      padding-right: 8px;
      height: auto;
      display: inline-block;

      @media (min-width: 2001px) {
        width: calc(100% / 3);
        height: 10vw;
        max-height: 250px;
      }
      @media (max-width: 1150px) {
        width: 100%;
      }
      @media (max-width: 1000px) {
        width: calc(100% / 3);
      }
      @media (max-width: 850px) {
        width: calc(100% / 2);
      }
      @media (max-width: 550px) {
        width: 100%;
      }
      @media (max-width: 410px) {
        width: calc(100% / 2);
      }

      & > :first-child {
        width: 100%;
        height: 100%;
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;

        & > img {
          object-fit: cover;
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
              font-size: 0.78rem;
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
          width: 100%;
          display: -webkit-box;
          -webkit-line-clamp: 1;
          overflow: hidden;
          text-overflow: ellipsis;
          -webkit-box-orient: vertical;
          font-size: 0.87rem;
          color: ${colors.color1};
          font-weight: 600;
          padding: 0 2px;
          margin-bottom: 2px;
        }

        & > .popular-details {
          display: flex;
          color: #57566c;

          & > div {
            margin-left: 3px;
            font-size: 0.81rem;
            font-weight: 500;
            white-space: nowrap;
          }

          & > :last-child {
            width: 100%;
            display: -webkit-box;
            -webkit-line-clamp: 1;
            overflow: hidden;
            text-overflow: ellipsis;
            -webkit-box-orient: vertical;
          }
        }
      }
    }
  }
`;

export const News = styled.div`
  width: 100%;
  margin-top: ${({ noMarginTop }) => (noMarginTop ? '0' : '1rem')};

  & > h4 {
    font-size: 1.06rem;
    margin-bottom: 12px;
    font-weight: 600;
    color: ${colors.color1};
  }

  .popular-slider {
    display: flex;
    background-color: ${colors.color7};
    height: auto;
    border-radius: 5px;
    padding: 10px;
    justify-content: space-between;

    @media (max-width: 630px) {
      flex-direction: column;
    }
    @media (max-width: 500px) {
      flex-direction: row;
    }
    @media (max-width: 350px) {
      align-items: center;
      flex-direction: column;
    }

    & > .popular-img {
      width: 125px;
      height: 180px;
      flex: none;
      position: relative;
      margin-right: 1rem;

      @media (max-width: 1250px) {
        width: 115px;
        height: 160px;
      }
      @media (max-width: 1025px) {
        width: 110px;
        height: 150px;
      }
      @media (max-width: 630px) {
        width: 100%;
        height: 34vw;
        margin-right: 0;
        margin-bottom: 1rem;
      }
      @media (max-width: 610px) {
        height: 33vw;
      }
      @media (max-width: 580px) {
        height: 32vw;
      }
      @media (max-width: 550px) {
        height: 31vw;
      }
      @media (max-width: 520px) {
        height: 29.5vw;
      }
      @media (max-width: 500px) {
        width: 110px;
        height: 150px;
        margin-right: 1rem;
        margin-bottom: 0;
      }
      @media (max-width: 350px) {
        width: 120px;
        height: 180px;
        margin-right: 0;
        margin-bottom: 1rem;
      }

      & > img {
        object-fit: cover;
        border-radius: 10px;
        width: 100%;
        height: 100%;
      }
    }

    & > .popular-details {
      display: flex;
      flex-direction: column;
      justify-content: center;

      & > :not(:last-child) {
        margin-bottom: 5px;
      }

      & > a > h3 {
        width: 100%;
        display: -webkit-box;
        -webkit-line-clamp: 1;
        overflow: hidden;
        text-overflow: ellipsis;
        -webkit-box-orient: vertical;
        font-size: 0.93rem;
        font-weight: 600;
        color: ${colors.color1};
        transition: color 0.2s ease-in-out;
      }

      & > .popular-year-genre {
        font-size: 0.81rem;
        font-weight: 400;
        color: #57566c;
        display: flex;
        align-items: center;

        & > :not(:last-child) {
          margin-right: 3px;
        }

        & > :last-child {
          width: 100%;
          display: -webkit-box;
          -webkit-line-clamp: 1;
          overflow: hidden;
          text-overflow: ellipsis;
          -webkit-box-orient: vertical;
          word-break: break-all;
        }
      }

      & > .vertical-overview {
        font-size: 0.81rem;
        flex: none;
        font-weight: 400;
        color: #57566c;
        max-width: 10rem;
        height: 34px;
        overflow: hidden;

        &:hover,
        &:focus {
          overflow: hidden scroll;

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
        font-size: 0.81rem;
        font-weight: 500;

        & > .popular-rating-voteAverage {
          display: flex;
          align-items: center;

          & > .popular-voteAverage {
            margin-left: 5px;
          }

          @media (max-width: 350px) {
            flex-direction: column;
            align-items: flex-start;

            & > .popular-voteAverage {
              margin-left: 2px;
            }
          }
        }
      }

      & > .popular-watch-now {
        background-color: ${colors.color6};
        font-weight: 400;
        color: ${colors.color1};
        border-radius: 1.5rem;
        font-size: 0.75rem;
        width: fit-content;
        padding: 8px 1.2rem;
        transition: all 0.2s ease-in-out;
        white-space: nowrap;
        text-align: center;

        @media (max-width: 950px) and (min-width: 901px), (max-width: 650px) {
          padding: 8px 0;
          width: 100%;
        }
        @media (max-width: 900px) and (min-width: 651px) {
          padding: 8px 1.2rem;
          width: fit-content;
        }
        @media (max-width: 630px) {
          padding: 8px 0;
          width: 100%;
        }
        @media (max-width: 500px) {
          width: fit-content;
          padding: 8px 1.2rem;
        }
        @media (max-width: 360px) {
          padding: 8px 0;
          width: 100%;
        }
        @media (max-width: 350px) {
          width: fit-content;
          padding: 8px 1.2rem;
          margin: 0 auto;
        }

        &:hover {
          background-color: ${colors.color2};
        }
      }
    }
  }
`;

export const TrailerContainer = styled.div`
  border-radius: 1rem;
  overflow: hidden;
  background-color: #111;
  position: relative;
  width: 100%;
  height: ${({ setHeight }) => (setHeight ? '500px' : '100%')};
  margin-top: ${({ marginTop }) => (marginTop ? '1rem' : '0')};

  @media (min-width: 2001px) {
    height: ${({ setHeight }) => (setHeight ? '700px' : '100%')};
  }
  @media (min-width: 1700px) and (max-width: 2000px) {
    height: ${({ setHeight }) => (setHeight ? '600px' : '100%')};
  }
  @media (max-width: 1000px) {
    height: ${({ setHeight }) => (setHeight ? '400px' : '100%')};
  }
  @media (max-width: 410px) {
    height: ${({ setHeight }) => (setHeight ? '350px' : '100%')};
  }

  & > .msg-video-trailer-error {
    color: ${colors.color1};
    font-size: 0.62rem;
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
`;

export const Description = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 1rem;

  @media (max-width: 600px) {
    margin-top: ${({ noMarginTop }) => (noMarginTop ? '0' : '12rem')};
  }
  @media (max-width: 500px) {
    margin-top: 1rem;
  }

  & > h4 {
    font-size: 1rem;
    font-weight: 500;
    color: ${colors.color1};
    margin-bottom: 0.5rem;
  }

  & > :last-child {
    color: #57566c;
    font-weight: 400;
    font-size: 0.78rem;
    width: 100%;
    height: ${({ overview }) => (overview ? '170px' : 'fit-content')};
    flex: none;
    overflow: hidden;
    padding-right: 8px;

    @media (max-width: 1330px) and (min-width: 1050px) {
      height: ${({ overview }) => (overview ? '340px' : 'fit-content')};
    }
    @media (max-width: 630px) {
      height: ${({ overview }) => (overview ? '65px' : 'fit-content')};
    }
    @media (max-width: 600px) {
      height: ${({ overview }) => (overview ? '105px' : 'fit-content')};
    }
    @media (max-width: 500px) {
      max-height: ${({ overview }) => (overview ? '200px' : 'fit-content')};
      height: auto;
    }

    &:hover,
    &:focus {
      overflow: hidden scroll;

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
`;

export const MidiaFilesCollectionContainer = styled.div`
  margin-top: ${({ no15Rem }) => (no15Rem ? '0' : '15rem')};
  margin-left: 1rem;
  display: flex;
  flex-direction: column;

  width: ${({ width50 }) => (width50 ? '50%' : '100%')};
  height: ${({ setHeight, noNewCollectionId }) =>
    noNewCollectionId ? '400px' : setHeight ? '500px' : 'auto'};

  @media (min-width: 1700px) {
    margin-top: 17rem;
  }
  @media (max-width: 1000px) {
    flex-direction: row;
    margin: 1rem 0;

    & > :not(:last-child) {
      margin-right: 10px;
    }
  }
  @media (max-width: 700px) {
    flex-direction: ${({ noNewCollectionId }) =>
      noNewCollectionId ? 'column' : 'row'};
    height: ${({ noNewCollectionId, setHeight }) =>
      noNewCollectionId ? '700px' : setHeight ? '500px' : 'auto'};
  }
  @media (max-width: 410px) {
    flex-direction: column;
    height: ${({ setHeight }) => (setHeight ? '600px' : 'auto')};

    & > :not(:last-child) {
      margin-right: 0;
    }
  }
  @media (max-width: 350px) {
    flex-direction: column;
    height: ${({ setHeight }) => (setHeight ? '700px' : 'auto')};
  }

  & > div {
    height: ${({ height100 }) => (height100 ? '100%' : '50%')};
    overflow: hidden;

    @media (max-width: 1000px) {
      width: ${({ width50NextDivChildren }) =>
        width50NextDivChildren ? '50%' : '100%'};
    }
    @media (max-width: 480px) and (min-width: 411px) {
      &:first-child {
        width: ${({ width50NextDivChildren }) =>
          width50NextDivChildren ? '70%' : '100%'};
      }
    }
    @media (max-width: 410px) {
      width: 100%;
    }
  }
`;

export const FavoriteContainer = styled.div`
  width: 50px;
  height: 50px;
  align-self: flex-end;
  position: absolute;
  top: 12rem;
  right: 10px;

  @media (min-width: 1700px) {
    top: 14rem;
  }
  @media (max-width: 720px) {
    top: 9rem;
  }
  @media (max-width: 400px) {
    position: static;
    align-self: normal;
    top: 0;
    right: 0;
  }

  @keyframes likeAnimaton {
    0%,
    to {
      transform: scale(1);
    }
    15% {
      transform: scale(1.2);
    }
    30% {
      transform: scale(0.95);
    }
    45%,
    80% {
      transform: scale(1);
    }
  }

  [data-like-animaton='true'] {
    animation-name: 'likeAnimaton';
    animation-duration: 1s;
    animation-timing-function: linear;
  }

  & > svg {
    width: 100%;
    height: 100%;

    & > path {
      cursor: pointer;
    }
  }
`;

export const DetailsAndSimilarContainer = styled.div`
  margin-top: 6.5rem;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  width: ${({ width50AndFlexNone }) => (width50AndFlexNone ? '50%' : 'auto')};
  flex: ${({ width50AndFlexNone }) => (width50AndFlexNone ? 'none' : 'auto')};
  margin-bottom: ${({ noMarginBottom }) => (noMarginBottom ? '0' : '1rem')};

  @media (min-width: 1700px) {
    margin-top: 8.4rem;
  }
  @media (min-width: 1400px) {
    width: ${({ width50AndFlexNone }) => (width50AndFlexNone ? '55%' : 'auto')};
  }
  @media (max-width: 1150px) {
    width: ${({ width50AndFlexNone }) => (width50AndFlexNone ? '47%' : 'auto')};
  }
  @media (max-width: 1049px) {
    width: ${({ width50AndFlexNone }) => (width50AndFlexNone ? '44%' : 'auto')};
  }
  @media (max-width: 1000px) {
    margin-bottom: 0;
  }
  @media (max-width: 720px) {
    margin-top: 3.5rem;
  }
  @media (max-width: 600px) {
    margin-top: 0;
  }

  & > .d1 {
    display: flex;
    flex-direction: column;
    margin-bottom: 1.2rem;

    & > :not(:last-child) {
      margin-bottom: 12px;
    }

    @media (max-width: 400px) {
      & > :not(:last-child) {
        margin-bottom: 0;
      }
    }

    & > h1 {
      width: 100%;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;
      font-size: 2rem;
      font-weight: 700;
      color: ${colors.color1};
      cursor: default;

      @media (max-width: 600px) {
        -webkit-line-clamp: 2;
      }
    }

    & > .y-g-f {
      width: 100%;

      @media (max-width: 400px) {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;

        & > :last-child {
          margin-left: 10px;
        }
      }

      & > .year-genre-details {
        display: flex;
        color: ${colors.color1};
        font-weight: 400;
        font-size: 0.96rem;

        & > :not(:last-child) {
          margin-right: 5px;
        }

        & > :first-child {
          white-space: nowrap;
        }

        & > :last-child {
          max-width: 100%;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;

          @media (max-width: 400px) {
            max-width: 133px;
          }
        }
      }
    }

    & > .rating-imdb-details {
      display: flex;
      flex-direction: column;
      color: ${colors.color1};

      @media (max-width: 600px) {
        flex-direction: row;
      }

      &:last-child {
        & > :first-child {
          display: flex;
          align-items: center;

          @media (max-width: 600px) {
            margin-left: 8px;
          }

          & > :last-child {
            margin-left: 5px;
          }
        }
      }
    }
  }

  & > .d2 {
    display: flex;
    flex-direction: column;

    & > .about-details {
      margin-bottom: ${({ noMarginBottom }) => (noMarginBottom ? '0' : '1rem')};

      @media (max-width: 630px) {
        margin-bottom: 0;
      }

      & > h4 {
        font-size: 1.06rem;
        margin-bottom: 12px;
        font-weight: 600;
        color: ${colors.color1};
      }

      & > .about {
        display: flex;
        max-width: 800px;
        justify-content: space-between;

        @media (max-width: 720px) {
          flex-direction: column;
        }
        @media (max-width: 600px) {
          flex-direction: row;
        }
        @media (max-width: 410px) {
          flex-direction: column;
        }

        & > :first-child {
          margin-right: 1rem;
        }

        & > div {
          & > :nth-child(1),
          & > :nth-child(2) {
            margin-bottom: 1rem;
          }

          & > div {
            display: flex;

            & > :first-child {
              margin-right: 8px;
            }

            & > ul {
              display: flex;
              flex-direction: column;

              & > :not(:last-child) {
                margin-bottom: 3px;
              }

              & > li {
                color: #57566c;
                font-weight: 400;
                font-size: 0.78rem;
              }
            }
          }
        }
      }
    }
  }
`;

export const YearGenreDetailsRatingContainer = styled.div``;
