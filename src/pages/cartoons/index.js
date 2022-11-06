/* eslint-disable */

import { Component } from 'react';
import { Helmet } from 'react-helmet-async';

import Footer from '../../components/footer/index';
import New from './new/index';
import AllCatalog from './allCatalog';
import Popular from './popular';
import Future from './future';
import Main from '../styled';

export default class Cartoons extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <>
        <Helmet>
          <title>MFLIX - Animações</title>
        </Helmet>
        <Main>
          <div className="amo-vadias">
            <New />
            <AllCatalog />
            <Popular />
          </div>
          <Future />
        </Main>
        <Footer />
      </>
    );
  }
}
