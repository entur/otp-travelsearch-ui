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
import Search from './Search';

class SearchGroup extends React.Component {

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
    const searches = this.props.members.map(
      (search, index) =>
        <Search key={index} search={search} type={this.props.type} />
    );
    const count = searches.length;
    let details;
    if(this.state.expanded) {
      details = <table className="borderless" style={{ width: '100%' }}>
        <tbody>
          {searches}
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

export default SearchGroup;
