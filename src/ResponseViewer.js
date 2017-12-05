import React from 'react';

class ResponseViewer extends React.Component {

  constructor() {
    super();
    this.state = {
      opened: false
    };
  }

  close() {
    this.setState({ opened: false });
  }

  open() {
    this.setState({ opened: true });
  }

  render() {
    if(this.state.opened) {

      return (<div className="modal-background" onClick={() => this.close()}>
        <div className="modal-front">
          {this.props.failedSearch.response}
        </div>
      </div>)
    }
    return null;
  }
}

export default ResponseViewer;
