import React from 'react';
import axios from 'axios';
import Report from './Report';
import FailedSearches from './FailedSearches';
import Logo from './Logo';
const { INDEX_URI, MAX_REPORTS, BASE_URI } = process.TSQA;

const sortReportLines = (a, b) => {
  const aTimestamp = parseInt(
    a.substring(a.lastIndexOf('-') + 1, a.lastIndexOf('.json')),
    10
  );
  const bTimestamp = parseInt(
    b.substring(b.lastIndexOf('-') + 1, b.lastIndexOf('.json')),
    10
  );

  if (aTimestamp < bTimestamp) return 1;
  if (aTimestamp > bTimestamp) return -1;
  return 0;
};

const sortByDate = (a, b) => {
  let aDate = new Date(a.date).getTime();
  let bDate = new Date(b.date).getTime();
  if (aDate < bDate) return 1;
  if (aDate > bDate) return -1;
  return 0;
};

class ReportList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { reportLocations: [], reports: [], intervalId: null };
  }

  fetchReports() {
    axios.get(INDEX_URI).then(response => {
      let reportLines = response.data.split('\n');

      // Only fetch the newest ones
      reportLines = reportLines
        .sort(sortReportLines)
        .filter(reportLocation => {
          return this.state.reportLocations.indexOf(reportLocation) === -1;
        })
        .slice(0, MAX_REPORTS);

      this.setState({
        reportLocations: [...this.state.reportLocations, ...reportLines]
      });

      let promiseArray = reportLines.map(reportLocation =>
        axios.get(BASE_URI + '/' + reportLocation)
      );

      axios.all(promiseArray).then(results => {
        const newReports = [];
        results.forEach(result => {
          let found = false;
          this.state.reports.forEach(existingReport => {
            if (existingReport.date === result.data.date) {
              found = true;
            }
          });
          if (!found) {
            newReports.push(result.data);
          }
        });
        // If adding reports, sort all and keep the newest ones
        let newReportsState = [...this.state.reports, ...newReports]
          .sort(sortByDate)
          .slice(0, MAX_REPORTS);

        this.setState({ reports: newReportsState });
      });
    });
  }

  componentDidMount() {
    const intervalId = setInterval(this.fetchReports.bind(this), 10000);
    this.setState({ intervalId });
    this.fetchReports();
  }

  componentWillUnmount() {
    clearInterval(this.state.intervalId);
  }

  render() {
    let reportComponents = [];


    for (let i = 0; i < this.state.reports.length; i++) {
      const report = this.state.reports[i];

      reportComponents.push(
        <Report key={report.date} report={report}/>
      );

      if (report.failedCount) {
        reportComponents.push(
          <FailedSearches
            key={report.date + '-failed-searches'}
            failedSearches={report.failedSearches}
            failedCount={report.failedCount}
          />
        )
      }
    }

    if (reportComponents.length === 0) {
      reportComponents = null;
    }

    return (
      <div>
        <div
          className="pt-3 pb-2 pl-3"
          style={{
            background: 'rgb(24, 28, 86)',
            color: '#fff',
            height: 65
          }}
        >
          <Logo />
          <h2 style={{ float: 'left', position: 'relative', marginLeft: 10 }}>
            OTP Travel Search Reports
          </h2>
        </div>

        <table className="table table-hover table-condensed my-4 mx-4">
          <tbody>
            <tr>
              <th>Date</th>
              <th>Failed percentage</th>
              <th>Number of searches</th>
              <th>Seconds total</th>
              <th>Seconds average</th>
            </tr>
            {reportComponents}
          </tbody>
        </table>
      </div>
    );
  }
}
export default ReportList;
