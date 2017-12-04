import React, { Component } from 'react';
import ReportList from './ReportList';
import { IntlProvider } from 'react-intl';

class TravelSearchUI extends Component {
  render() {
    return (
      <IntlProvider>
        <div className="TravelSearchUI">
          <ReportList />
        </div>
      </IntlProvider>
    );
  }
}

export default TravelSearchUI;
