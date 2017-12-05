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

    let groups = [];
    for (let i = 0; i < report.failedSearches.length; i++) {
      if(report.failedSearches[i]) {
        let groupName = report.failedSearches[i].search.description;

        let existingGroup = groups.find(group => {
          return group.name === groupName;
        })

        if(existingGroup) {
          existingGroup.members.push(report.failedSearches[i]);
        } else {
          groups.push({name: groupName, members: [report.failedSearches[i]]});
        }
      }
    }
    return this.sortGroupsDescending(groups);
  }

  sortGroupsDescending(groups) {
    return groups.sort((a, b) =>  {
      return b.members.length - a.members.length;
    })
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

      const groupedFailedSearches = this.groupFailedSearches(report.failedSearches);
      const groupedFailedSearchesComponents = groupedFailedSearches
                  .map(group => {
                    return <FailedSearchGroup
                      key={group.name}
                      groupName={group.name}
                      type={report.type}
                      failedSearchGroup={group.members}
                    />
                  });

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
