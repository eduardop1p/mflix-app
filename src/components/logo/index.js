import { Component } from 'react';

import { LogoMflix } from './styled';

export default class Logo extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <LogoMflix>
        <div className="oco">
          <div></div>
          <div></div>
          <div></div>
        </div>
      </LogoMflix>
    );
  }
}
