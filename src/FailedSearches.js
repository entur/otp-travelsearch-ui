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
import SearchGroup from './SearchGroup';

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
                    return <SearchGroup
                      key={group.name}
                      groupName={group.name}
                      type={report.type}
                      members={group.members}
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
              collapse {report.type} tests
            </button>
            {groupedFailedSearchesComponents}
          </td>
        </tr>
      );
    }
  }
}

export default FailedSearches;
