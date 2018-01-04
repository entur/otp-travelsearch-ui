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
import FailedSearchGroup from './FailedSearchGroup';

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

    // Execution times present on both failed and successful searches
    const searches = travelSearchReport.successfulSearches ? [...travelSearchReport.successfulSearches, ...travelSearchReport.failedSearches] : travelSearchReport.failedSearches;
    return searches
      .filter(search => search.executionTime)
      .reduce((groups, search) => {
        const executionTime = search.executionTime;

        const secondsFloor = Math.floor(executionTime);
        const secondsCeil = Math.ceil(executionTime);

        const groupName = secondsFloor + " to " + secondsCeil + " seconds";
        const existingGroup = groups.find(group => {
          return group.name === groupName;
        });

        if (existingGroup) {
          existingGroup.members.push(search);
        } else {
          groups.push({
            name: groupName,
            secondsFloor: secondsFloor,
            members: [search]
          });
        }
        return groups;
    }, [])
    .sort((a, b) =>  {
      return b.secondsFloor - a.secondsFloor;
    })
  }

  render() {
    const groupedSearches = this.groupSearchesOnExecutionTime();
    const groupedSearchesComponents = groupedSearches
                .map(group => {
                  return <FailedSearchGroup
                    key={group.name}
                    groupName={group.name}
                    type={this.props.travelSearchReport.type}
                    members={group.members}
                  />
                });

    let details;
    if(this.state.expanded) {
      details = <table className="borderless" style={{ width: '100%' }}>
        <tbody>
          {groupedSearchesComponents}
        </tbody>
      </table>
    }

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

            {details}

          </td>
        </tr>
      );
    }
  }
}

export default ExecutionTimeReport;
