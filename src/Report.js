import React from 'react';
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
        <td className="report-date">{date}</td>
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
