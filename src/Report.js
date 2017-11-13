import React from 'react';

class Report extends React.Component {
  render() {
    const report = this.props.report

    return (
        <tr className="active">
          <td>{report.date}</td>
          <td>{report.failedPercentage.toFixed(2)}%</td>
          <td>{report.numberOfSearches}</td>
          <td>{report.secondsTotal.toFixed(2)}</td>
          <td>{report.secondsAverage.toFixed(2)}</td>
        </tr>
     )
  }
}

export default Report;
