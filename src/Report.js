import React from 'react';
import ReportSummary from './ReportSummary';
import FailedSearches from './FailedSearches';

class Report extends React.Component {
  render() {
    // Fallback to old model
    const travelSearchReport = this.props.report.travelSearch ? this.props.report.travelSearch : this.props.report;
    const stopTimesReport = this.props.report.stopTimes;
    const date = this.props.date;
    const stopTimesReportComponent = stopTimesReport ? <ReportSummary report={stopTimesReport} /> : null;

    const rows = [];
    rows.push(
      <tr key={date}>
        <td>{date}</td>
        {<ReportSummary report={travelSearchReport}/>}
        {stopTimesReportComponent}
      </tr>);

    travelSearchReport.type = "travelSearch";
    rows.push(
      <FailedSearches
        key={date + '-failed-travel-searches'}
        failedSearches={travelSearchReport.failedSearches}
        failedCount={travelSearchReport.failedCount}
      />
    )

    if(stopTimesReport) {
      stopTimesReport.type="stopTimes";
      rows.push(
        <FailedSearches
          key={date + '-failed-stop-times'}
          failedSearches={stopTimesReport.failedSearches}
          failedCount={stopTimesReport.failedCount}
        />
      )
    }

    return (
        rows
     )
  }
}

export default Report;
