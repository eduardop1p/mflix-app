import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useDispatch } from 'react-redux';

/* eslint-disable */
import * as actions from '../../../../../storeReactRedux/modules/loading/actions';
import notSearch from '../../../../../assets/images/search.png';
import setVerticalSearch from '../../../../../config/searchConfig';
import { MainIndexSearch } from '../styled';

export default function NotSearchResult(porps) {
  const { value } = porps;

  const dispatch = useDispatch();

  useEffect(() => {
    setTimeout(() => {
      dispatch(actions.loadingFailure());
    }, 500);
  }, []);

  return (
    <MainIndexSearch>
      <div className="search">
        <Helmet>
          <title>MFLIX - Nenhum resultado encontrado para: {value}</title>
        </Helmet>
        <div className="vertical-search-popular">
          <form onSubmit={setVerticalSearch} action="/vertical/search">
            <button type="submit">
              <svg
                xmlns="http:www.w3.org/2000/svg"
                height="18px"
                width="18px"
                viewBox="0 0 24 24"
              >
                <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
              </svg>
            </button>
            <input
              type="text"
              placeholder="Nova pesquisa..."
              name="search_query"
            />
          </form>
        </div>
        <div className="not-search-result">
          <div className="search-img-details">
            <img src={notSearch} alt="not serch" />
            <div className="not-search-details">
              <h2>Não há titulos que correspondem à sua busca.</h2>
              <ul>
                <li>Revise a ortografia.</li>
                <li>Utilize palavras chaves de titulos.</li>
                <li>Navegue pelo site para encontrar um resultado similar.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </MainIndexSearch>
  );
}
