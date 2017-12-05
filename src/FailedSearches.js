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
    const {report} = this.props;
    return report.failedSearches.reduce((groups, failedSearch) => {
      let groupName = failedSearch.search.description;
      let existingGroup = groups.find(group => {
        return group.name === groupName;
      });
      if (existingGroup) {
        existingGroup.members.push(failedSearch);
      } else {
        groups.push({
          name: groupName,
          members: [failedSearch]
        });
      }
      return groups;
    }, [])
    .sort((a, b) =>  {
      return a.members && b.members ? b.members.length - a.members.length : 0;
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
      const groupedFailedSearchesComponents = this.groupFailedSearches(report.failedSearches)
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
