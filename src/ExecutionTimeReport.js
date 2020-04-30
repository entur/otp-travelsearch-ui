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

class ExecutionTimeReport extends React.Component {
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

  groupSearchesOnExecutionTime() {
    const {travelSearchReport} = this.props;

    const searches = travelSearchReport.successfulSearches || [];

    return searches
      .filter(search => search.executionTime)
      .reduce((groups, search) => {
        const executionTime = search.executionTime;

        const secondsFloor = Math.floor(executionTime);

        let groupName;
        let sortValue;
        if (secondsFloor === 0) {
          groupName = "0 to 1";
          sortValue = 1;
        } else if(secondsFloor >= 1 && secondsFloor < 4) {
          groupName = "1 to 4";
          sortValue = 2;
        } else if (secondsFloor >= 4 && secondsFloor < 9) {
          groupName = "4 to 9";
          sortValue = 3;
        } else {
          groupName = "9 to ∞";
          sortValue = 4;
        }
        groupName += " seconds";

        const existingGroup = groups.find(group => {
          return group.name === groupName;
        });

        if (existingGroup) {
          existingGroup.members.push(search);
        } else {
          groups.push({
            name: groupName,
            sortValue: sortValue,
            members: [search]
          });
        }
        return groups;
    }, [])
    .sort((a, b) =>  {
      return b.sortValue - a.sortValue;
    })
  }

  render() {
    const groupedSearches = this.groupSearchesOnExecutionTime();
    const groupedSearchesComponents = groupedSearches
                .map(group => {
                  return <SearchGroup
                    key={group.name}
                    groupName={group.name}
                    type={this.props.travelSearchReport.type}
                    members={group.members}
                  />
                });

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
              Execution time report
            </button>
          </td>
        </tr>
      );
    } else {
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
            Collapse execution time report
            </button>
            {groupedSearchesComponents}
          </td>
        </tr>
      );
    }
  }
}

export default ExecutionTimeReport;
