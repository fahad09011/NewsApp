import React, { Component } from 'react'

export default class Pagination extends Component {
  render() {
    let {page, totalResults, pageSize, handlePreviousClick, handleNextClick, } = this.props;
    return (
      
        <div className="d-flex justify-content-around">
          <button
            type="button"
            className="btn btn-primary"
            onClick={handlePreviousClick}
            disabled={page <= 1}
          >
            &#8592;Previous
          </button>

          <button
            type="button"
            className="btn btn-primary"
            onClick={handleNextClick}
            disabled={
              page >=
              Math.ceil(totalResults / pageSize)
            }
          >
            Next&#8594;
          </button>
        </div>
    )
  }
}
