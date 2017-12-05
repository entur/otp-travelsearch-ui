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

import ResponseViewer from './ResponseViewer';

const { SHAMASH_OTP } = process.TSQA;
class FailedSearch extends React.Component {

  generateShamashHref() {
    // Typo in qa project for prop otpQuery
    const otpQuery = this.props.failedSearch.otpQuery ? this.props.failedSearch.otpQuery : this.props.failedSearch.otpquery;
    let shamashHref = SHAMASH_OTP + "/?query=" +  encodeURIComponent(otpQuery) + "&variables=";
    if(this.props.failedSearch.otpVariables) {
      const otpVariables = this.props.failedSearch.otpVariables;
      // Use json stringify for variables. Could have been stringified in otp-travelsearch-qa
      shamashHref += encodeURIComponent(JSON.stringify(otpVariables));
    }
    return shamashHref;
  }

  render() {
    const reportType = this.props.type;
    const failedSearch = this.props.failedSearch
    const shamashHref = this.generateShamashHref();

    let linkText;
    if(reportType === "travelSearch") {
      linkText = <span>{failedSearch.search.fromPlace} {failedSearch.search.origin} to {failedSearch.search.toPlace} {failedSearch.search.destination}</span>;
    } else if(reportType === "stopTimes") {
      linkText = <span>{failedSearch.search.stopPlaceId} ({failedSearch.search.stopPlaceName})</span>;
    }

    return (
      <tr className="borderless">
        <td className="borderless">
          <a href={shamashHref} target="_blank" style={{color: "#5AC39A"}}>
            {linkText}
         </a>
        </td>
        <td className="text-danger borderless" style={{"width": "20%"}}>
          {failedSearch.failMessage}
        </td>

        <td className="text-warning borderless">
          <ResponseViewer failedSearch={failedSearch} ref={instance => { this.child = instance; }}/>
          <span onClick={() => this.child.open()} style={{"cursor": "pointer"}}>
            {failedSearch.response.substring(0,100)}
          </span>
        </td>
      </tr>
    )
  }
}

export default FailedSearch;
