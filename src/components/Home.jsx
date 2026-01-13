import React, { Component } from 'react'
import "../App.css";
import HeroNews from './HeroNews';
import CategoriesPreview from './CategoriesPreview';
import News from './News';

export default class Home extends Component {
  render() {
    return (
      <div>
        <HeroNews/>

        <CategoriesPreview/>
        <h4>Home headlines</h4>
        <News category="general" pageSize={5}/>
      </div>
    )
  }
}
