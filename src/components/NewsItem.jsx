import React, { Component } from "react";
import defaultImage from "../assets/newsImg.webp";

import "../App.css";
import { redirectDocument } from "react-router-dom";
export default class NewsItem extends Component {
  formatDate = (publishedDate) => {
    const date = new Date(publishedDate);
    const now = new Date();
    const minutesDifference = now - date;
    const minutes = minutesDifference / (1000 * 60 * 60);
    const hoursdifference = minutesDifference / (1000 * 60);
    if (hoursdifference < 1) {
      return `${Math.floor(minutes)} minutes ago`;
    } else if (hoursdifference < 24) {
      return `${Math.floor(hoursdifference)} hours ago`;
    } else {
      return date.toLocaleDateString(undefined, {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
    }
  };
  render() {
    let {
      title,
      description,
      imgURL,
      readMore,
      author,
      publishedDate,
      source,
    } = this.props;
    return (
      <div className="newsItemContainer my-3">
        <div className="card">
          <img
            src={imgURL ? imgURL : defaultImage}
            className="card-img-top"
            alt="image"
          />
          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">{description}</p>
            <p className="card-text">
              <small className="text-muted">
                By {author} on {this.formatDate(publishedDate)} <br/>Source: {source}
              </small>
            </p>

            <a
              href={readMore}
              target="_blank"
              className="btn btn-sm btn-primary readMoreButton"
            >
              Read More
            </a>
          </div>
        </div>
      </div>
    );
  }
}
