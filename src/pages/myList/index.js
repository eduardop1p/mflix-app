/* eslint-disable */

import { Component } from 'react';
import { Helmet } from 'react-helmet-async';

import Footer from '../../components/footer/index';
import WatchList from './watchList/index';
import Main from './styled';

export default class MyList extends Component {
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
          <WatchList />
        </Main>
        <Footer />
      </>
    );
  }
}
