import React, { Component } from 'react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ hasError: true, error: errorInfo });
    console.error(error);
  }

  render() {
    if (this.state.hasError) {
      return <>
        <div className="page-404">
          <div className="outer">
              <div className="middle">
                  <div className="inner">
                      <div className="inner-circle"><i className="fa fa-cogs"></i><span>500</span></div>
                      <span className="inner-status">Opps! Internal Server Error!</span>
                      <span className="inner-detail">Unfortunately we're having trouble loading the page you are looking for. Please come back in a while.</span>
                  </div>
              </div>
          </div>
        </div>
      </>
    }

    return this.props.children;
  }
}

export default ErrorBoundary;