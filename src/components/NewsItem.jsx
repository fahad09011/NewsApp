import React, { Component } from "react";
import defaultImage from "../assets/newsImg.webp";

import "../App.css";
export default class NewsItem extends Component {
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
      <div className="newsItemContainer ">
        <div className="card newsCard">
          <div className="imgcontainer">
            <img
              src={imgURL ? imgURL : defaultImage}
              className="card-img-top"
              alt="image"
            />
          </div>
          <div className="card-body news-card-body">
            <h5 className="card-title newsTitle">{title}</h5>
            <p className="card-text newstext">{description}</p>
            <p className="card-text newstext">
              <small className="text-muted">
                By {author ? author : "Unknown"} on {publishedDate} <br />
                Source: {source ? source : "Unknown"}
              </small>
            </p>

            <a
              href={readMore}
              target="_blank"
              className="btn btn-sm btn-primary newsReadMoreButton"
            >
              Read More
            </a>
          </div>
        </div>
      </div>
    );
  }
}
