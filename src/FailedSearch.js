import React from 'react';

const { SHAMASH_OTP } = process.TSQA;
class FailedSearch extends React.Component {

  render() {
    const failedSearch = this.props.failedSearch
    const shamashHref = SHAMASH_OTP + encodeURIComponent(failedSearch.otpQuery)
     return (
        <tr className="borderless">
          <td className="borderless" style={{"width": "20%"}}>
            <a href={shamashHref} target="_blank" style={{color: "#5AC39A"}}>
              {failedSearch.search.fromPlace} to {failedSearch.search.toPlace}
            </a>
          </td>
          <td className="borderless" style={{"width": "20%"}}>
            {failedSearch.search.origin}&nbsp;to&nbsp;{failedSearch.search.destination}
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
