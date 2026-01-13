import React, { Component } from 'react'
import News from './News';

export default class Category extends Component {
  render() {
    let {category} = this.props;
    return (
      <div>
        <h2 className="text-center my-4">
          {category.charAt(0).toUpperCase() + category.slice(1)} News
        </h2>
        <News category={category} pageSize={10} />
      </div>
    )
  }
}
