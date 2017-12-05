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

class ReportSummary extends React.Component {
  render() {
    const report = this.props.report;
    const reportColumns = [];
    reportColumns.push(<td key={report.date + "fp"}>{report.failedPercentage.toFixed(2)}%</td>);
    reportColumns.push(<td key={report.date + "nos"} className="report-search-count">{report.numberOfSearches}</td>);
    reportColumns.push(<td key={report.date + "st"}>{report.secondsTotal.toFixed(2)}</td>);
    reportColumns.push(<td key={report.date + "sa"}>{report.secondsAverage.toFixed(2)}</td>);
    return reportColumns;
  }
}

export default ReportSummary;
