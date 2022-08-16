/* eslint-disable */

import { Component } from 'react';
import { Helmet } from 'react-helmet-async';

import WatchList from './watchList/index';
import Main from './styled';

export default class MinhaLista extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <>
        <Helmet>
          <title>MFLIX - Minha lista</title>
        </Helmet>
        <Main>
          <div className="amo-vadias">
            <WatchList />
          </div>
        </Main>
      </>
    );
  }
}
