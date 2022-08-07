import { Component } from 'react';
import { Helmet } from 'react-helmet-async';

import Footer from '../../components/footer/index';
import SlideHeaderNewMovies from './slideHeaderNewMovies/index';
import MoviesAllCatalog from './moviesAllCatalog/index';
import PopularMovies from './popularMovies/index';
import FutureMovies from './futureMovies/index';
import Main from './styled';

export default class Movies extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <>
        <Helmet>
          <title>MFLIX - Filmes</title>
        </Helmet>
        <Main>
          <div className="amo-vadias">
            <SlideHeaderNewMovies />
            <MoviesAllCatalog />
            <PopularMovies />
          </div>
          <FutureMovies />
        </Main>
        <Footer />
      </>
    );
  }
}
