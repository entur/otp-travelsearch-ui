import React from 'react';
import FailedSearch from './FailedSearch';

class FailedSearchGroup extends React.Component {
  render() {
    const failedSearches = this.props.failedSearchGroup.map(
      (failedSearch, index) =>
        <FailedSearch key={index} failedSearch={failedSearch} />
    );

    return (
      <div>
        <div style={{padding: '10px 0'}}>
          <mark>{this.props.groupName}</mark>
        </div>
        <table className="borderless" style={{ width: '100%' }}>
          <tbody>
            {failedSearches}
          </tbody>
        </table>
      </div>
    );
  }
}

export default FailedSearchGroup;
