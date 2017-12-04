import React from 'react';
import FailedSearch from './FailedSearch';

class FailedSearchGroup extends React.Component {

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
    const failedSearches = this.props.failedSearchGroup.map(
      (failedSearch, index) =>
        <FailedSearch key={index} failedSearch={failedSearch} />
    );
    const count = failedSearches.length;
    let details;
    if(this.state.expanded) {
      details = <table className="borderless" style={{ width: '100%' }}>
        <tbody>
          {failedSearches}
        </tbody>
      </table>
    }

    return (
      <div>
        <div className="test-group"
            onClick = {() => {
                this.expand();
              }
            }
          >
          <mark className="mark">{this.props.groupName} ({count})</mark>
        </div>
        {details}
      </div>
    );
  }
}

export default FailedSearchGroup;
