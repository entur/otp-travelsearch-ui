import React, { Component } from 'react';
import ReportList from './ReportList';
import { IntlProvider } from 'react-intl';
import nb from 'react-intl/locale-data/nb';



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
