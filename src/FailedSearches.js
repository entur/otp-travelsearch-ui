import React from 'react';
import FailedSearchGroup from './FailedSearchGroup';

class FailedSearches extends React.Component {
  constructor() {
    super();
    this.state = {
      expanded: false
    };
  }

  collapse() {
    this.setState({ expanded: false });
  }

  expand() {
    this.setState({ expanded: true });
  }

  groupFailedSearches() {
    const report = this.props.report;

    let groups = {};
    for (let i = 0; i < report.failedSearches.length; i++) {
      let  groupName = report.failedSearches[i].search.description;
      if (!groups[groupName]) {
        groups[groupName] = [];
      }
      groups[groupName].push(report.failedSearches[i]);
    }
    return groups;
  }

  render() {
    const report = this.props.report;

    if (!this.state.expanded) {
      return (
        <tr className="borderless">
          <td colSpan="5">
            <button
              style={{ cursor: 'pointer' }}
              className="btn btn-danger"
              onClick={() => {
                this.expand();
              }}
            >
              {report.failedCount} failed {report.type} tests
            </button>
          </td>
        </tr>
      );
    } else {
      const groupedFailedSearches = this.groupFailedSearches(
        report.failedSearches
      );

      const groupedFailedSearchesComponents = [];

      for (let groupName in groupedFailedSearches) {
        groupedFailedSearchesComponents.push(
          <FailedSearchGroup
            key={groupName}
            groupName={groupName}
            type={report.type}
            failedSearchGroup={groupedFailedSearches[groupName]}
          />
        );
      }

      return (
        <tr className="borderless">
          <td colSpan="9">
            <button
              style={{ cursor: 'pointer' }}
              className="btn btn-success"
              onClick={() => {
                this.collapse()
              }}
            >
              collapse
            </button>
            {groupedFailedSearchesComponents}
          </td>
        </tr>
      );
    }
  }
}

export default FailedSearches;
