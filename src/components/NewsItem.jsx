import React, { Component } from "react";
import defaultImage from "../assets/newsImg.webp";

import "../App.css";
export default class NewsItem extends Component {
  render() {
    let { title, description, imgURL , readMore } = this.props;
    return (
      <div className="newsItemContainer my-3">
        <div className="card">
          <img src={imgURL ? imgURL : defaultImage} className="card-img-top" alt="image" />
          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">{description}</p>
            <a href={readMore} target="_blank" className="btn btn-sm btn-primary">
              Read More
            </a>
          </div>
        </div>
      </div>
    );
  }
}
