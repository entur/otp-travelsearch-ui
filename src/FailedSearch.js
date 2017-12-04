import React from 'react';

const { SHAMASH_OTP } = process.TSQA;
class FailedSearch extends React.Component {

  render() {
    const reportType = this.props.type;
    const failedSearch = this.props.failedSearch
    // Typo in qa project for prop otpQuery
    const otpQuery = this.props.failedSearch.otpQuery ? this.props.failedSearch.otpQuery : this.props.failedSearch.otpquery;
    let shamashHref = SHAMASH_OTP + "/?query?" +  encodeURIComponent(otpQuery);
    if(this.props.failedSearch.otpVariables) {
      shamashHref += "&variables=" + encodeURIComponent(this.props.failedSearch.otpVariables);
    }

    let linkText;
    if(reportType == "travelSearch") {
      linkText = <span>{failedSearch.search.fromPlace} (failedSearch.search.origin) to {failedSearch.search.toPlace} (failedSearch.search.destination)</span>;
    } else if(reportType == "stopTimes") {
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
        <td className="text-warning borderless" onClick={() => console.log(failedSearch.response)} style={{"cursor": "pointer"}}>
          {failedSearch.response.substring(0,100)}
        </td>
      </tr>
    )
  }
}

export default FailedSearch;
