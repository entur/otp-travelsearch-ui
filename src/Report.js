// Licensed under the EUPL, Version 1.2 or – as soon they will be approved by
// the European Commission - subsequent versions of the EUPL (the "Licence");
// You may not use this work except in compliance with the Licence.
// You may obtain a copy of the Licence at:
//
//   https://joinup.ec.europa.eu/software/page/eupl
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the Licence is distributed on an "AS IS" basis,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the Licence for the specific language governing permissions and
// limitations under the Licence.

import React from 'react';
import {FormattedRelative} from 'react-intl';

import ReportSummary from './ReportSummary';
import FailedSearches from './FailedSearches';

class Report extends React.Component {

  constructor() {
    super();
    this.state = {
      expanded: false
    };
  }

  expand() {
    this.setState({ expanded: !this.state.expanded });
  }

  render() {
    // Fallback to old model
    const travelSearchReport = this.props.report.travelSearch ? this.props.report.travelSearch : this.props.report;
    const stopTimesReport = this.props.report.stopTimes;
    const date = this.props.date;
    const stopTimesReportComponent = stopTimesReport ? <ReportSummary report={stopTimesReport} /> : null;

    const rows = [];
    rows.push(
      <tr key={date} onClick={() => {this.expand();}} className="report-row">
        <td className="report-date">
          <FormattedRelative value={date} />
        </td>
        {<ReportSummary report={travelSearchReport}/>}
        {stopTimesReportComponent}
      </tr>);

    if(this.state.expanded) {
      travelSearchReport.type = "travelSearch";
      rows.push(
        <FailedSearches
          key={date + '-failed-travel-searches'}
          report={travelSearchReport}
        />
      )

      if(stopTimesReport) {
        stopTimesReport.type="stopTimes";
        rows.push(
          <FailedSearches
            key={date + '-failed-stop-times'}
            report={stopTimesReport}
          />
        )
      }
    }

    return (
        rows
     )
  }
}

export default Report;
