import React from 'react';

import ReportSummary from './ReportSummary';

class Report extends React.Component {
  render() {
    // Fallback to old model
    const travelSearchReport = this.props.report.travelSearch ? this.props.report.travelSearch : this.props.report;
    const stopTimesReport = this.props.report.stopTimes;
    const date = this.props.date;
    const stopTimesReportComponent = stopTimesReport ? <ReportSummary report={stopTimesReport} /> : null;

    return (
        <tr>
          <td>{date}</td>
          {<ReportSummary report={travelSearchReport}/>}
          {stopTimesReportComponent}
        </tr>
     )
  }
}

export default Report;
