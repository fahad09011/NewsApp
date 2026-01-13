import React, { Component } from "react";
import "../App.css";
import image from "../assets/newsImg.webp";
export default class HeroNews extends Component {
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
      <div>
        <div className="heroNewsContainer my-3">
          <div className="heroCard cardCoontainer">
            <div className="heroImageContainer">
            <img src={imgURL ? imgURL : image} className="heroImage" alt="image" />
              <a
                href={readMore}
                target="_blank"
                className="btn btn-sm btn-primary readMoreButton HeroreadMoreButton"
              >
                Read More
              </a></div>
            <div className="card-body HeroCardBbody">
              <h5 className="card-title">
                {title}
              </h5>
              <p className="card-text">
                {description}
              </p>
              <p className="card-text">
                <small className="text-muted">
                 By {author ? author : "Unknown"} on {publishedDate} <br/>Source: {source ? source : "Unknown"}
                </small>
              </p>

            
            </div>
          </div>
        </div>
      </div>
    );
  }
}
