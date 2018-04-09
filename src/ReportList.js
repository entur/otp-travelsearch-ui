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
import axios from 'axios';
import Report from './Report';
import Logo from './Logo';

const MAX_REPORTS = 25;
const { REPORT_BASE_URI, REPORT_DATA_FOLDER, ENVIRONMENT } = process.TSQA;
const REPORT_PATH = REPORT_BASE_URI + "/" + REPORT_DATA_FOLDER;
const INDEX_URI = REPORT_PATH + "/index";

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
        .slice(0, MAX_REPORTS)
        .filter(reportLocation => {
          return this.state.reportLocations.indexOf(reportLocation) === -1;
        });

      this.setState({
        reportLocations: [...this.state.reportLocations, ...reportLines]
      });

      let promiseArray = reportLines.map(reportLocation =>
        axios.get(REPORT_PATH + '/' + reportLocation)
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
    const intervalId = setInterval(this.fetchReports.bind(this), 40000);
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
        <Report key={report.date} report={report} date={report.date} className="report-date"/>
      );
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
          <small className="px-2">{ENVIRONMENT}</small>
        </div>

        <table className="table table-condensed my-4 mx-4">
          <tbody>
            <tr>
              <th>Date</th>
              <th>Travel searches failed</th>
              <th>Travel searches count</th>
              <th>Travel searches seconds total</th>
              <th>Travel searches seconds average</th>
              <th>Stop times failed</th>
              <th>Stop times count</th>
              <th>Stop times seconds total</th>
              <th>Stop times seconds average</th>
            </tr>
            {reportComponents}
          </tbody>
        </table>
      </div>
    );
  }
}
export default ReportList;
