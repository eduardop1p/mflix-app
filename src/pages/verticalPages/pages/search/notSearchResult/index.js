import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useDispatch } from 'react-redux';

/* eslint-disable */
import * as actions from '../../../../../storeReactRedux/modules/loading/actions';
import notSearch from '../../../../../assets/images/search.png';
import SearchHelp from '../../../../../components/searchHelp';
import Main from '../styled';

export default function NotSearchResult(porps) {
  const { value } = porps;

  const dispatch = useDispatch();

  useEffect(() => {
    setTimeout(() => {
      dispatch(actions.loadingFailure());
    }, 500);
  }, []);

  return (
    <Main>
      <div>
        <Helmet>
          <title>MFLIX - Nenhum resultado encontrado para: {value}</title>
        </Helmet>
        <SearchHelp namePlaceholder="Nova pesquisa..." marginBottom />
        <div className="not-search-result">
          <div className="search-img-details">
            <img src={notSearch} alt="not search" />
            <div className="not-search-details">
              <h2>Não há titulos que correspondem a busca: {value}</h2>
              <ul>
                <li>Revise a ortografia.</li>
                <li>Utilize palavras chaves de titulos.</li>
                <li>Navegue pelo site para encontrar um resultado similar.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Main>
  );
}
