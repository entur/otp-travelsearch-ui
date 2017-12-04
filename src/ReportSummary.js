import React from 'react';

class ReportSummary extends React.Component {
  render() {
    const report = this.props.report;
    const reportColumns = [];
    reportColumns.push(<td key={report.date + "fp"}>{report.failedPercentage.toFixed(2)}%</td>);
    reportColumns.push(<td key={report.date + "nos"}>{report.numberOfSearches}</td>);
    reportColumns.push(<td key={report.date + "st"}>{report.secondsTotal.toFixed(2)}</td>);
    reportColumns.push(<td key={report.date + "sa"}>{report.secondsAverage.toFixed(2)}</td>);
    return reportColumns;
  }
}

export default ReportSummary;
