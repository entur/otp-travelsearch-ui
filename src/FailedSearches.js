import React from 'react';
import FailedSearchGroup from './FailedSearchGroup'

class FailedSearches extends React.Component {
  constructor() {
    super()
    this.state = {
      expanded: false
    }
  }

  collapse() {
    this.setState({expanded: false})
  }

  expand() {
    this.setState({expanded: true})
  }

  groupFailedSearches() {
    var groups = {}
    for (var i = 0; i < this.props.failedSearches.length; i++) {
      var groupName = this.props.failedSearches[i].search.description
      if (!groups[groupName]) {
        groups[groupName] = []
      }
      groups[groupName].push(this.props.failedSearches[i])
    }

    return groups
  }

  render() {
    const collapseCallback = () => this.collapse()
    const expandCallback = () => this.expand()

    if(!this.state.expanded) {
       return (
         <tr>
           <td colSpan="5">
            <button style={{cursor: "pointer"}} className="btn btn-danger" onClick={expandCallback}>{this.props.failedCount}</button> failed
          </td>
        </tr>
       )
    } else {
        const groupedFailedSearches = this.groupFailedSearches(this.props.failedSearches);
        const groupedFailedSearchesComponents = []
        for (var groupName in groupedFailedSearches) {
          groupedFailedSearchesComponents.push(<FailedSearchGroup key={groupName} groupName={groupName} failedSearchGroup={groupedFailedSearches[groupName]} />)
        }

        return (
          <tr>
            <td colSpan="5">
              <button style={{cursor: "pointer"}} className="btn btn-success" onClick={collapseCallback}>
                collapse
              </button>
              {groupedFailedSearchesComponents}
            </td>
          </tr>
        )
    }
  }
}

export default FailedSearches;
