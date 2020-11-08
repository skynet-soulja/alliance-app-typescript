import React from 'react'

import Spinner from 'react-bootstrap/Spinner'

const LoaderComponent: React.FC<{}> = () => {
  return (
    <div className="loader">
      <div className="fade modal-backdrop show"></div>
      <div className="loader-wrapper">
        <Spinner animation="border" variant="primary" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      </div>
    </div>
  )
}

export default LoaderComponent
