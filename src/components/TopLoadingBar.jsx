import React, { Component } from 'react'
import LoadingBar from "react-top-loading-bar";

export default class TopLoadingBar extends Component {
  render() {
    let {progress} = this.props
    return (
      <div>
        <LoadingBar
        color="#f11946"
        loaderSpeed={200}
        
        progress={progress}
      />
      </div>
    )
  }
}
