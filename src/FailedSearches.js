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
    let groups = {};
    for (let i = 0; i < this.props.failedSearches.length; i++) {
      let  groupName = this.props.failedSearches[i].search.description;
      if (!groups[groupName]) {
        groups[groupName] = [];
      }
      groups[groupName].push(this.props.failedSearches[i]);
    }
    return groups;
  }

  render() {

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
              {this.props.failedCount}
            </button>
            {' '}failed
          </td>
        </tr>
      );
    } else {
      const groupedFailedSearches = this.groupFailedSearches(
        this.props.failedSearches
      );

      const groupedFailedSearchesComponents = [];

      for (let groupName in groupedFailedSearches) {
        groupedFailedSearchesComponents.push(
          <FailedSearchGroup
            key={groupName}
            groupName={groupName}
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
