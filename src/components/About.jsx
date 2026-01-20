import React, { Component } from "react";
import "../App.css";

export default class About extends Component {
  render() {
    return (
      <div className="container my-5">
        <h1 className="mb-3">About NewsMonkey</h1>

        <p>
          <strong>NewsMonkey</strong> is a modern news application that brings
          you the latest headlines across multiple categories including
          Business, Technology, Sports, Health, Science, and more.
        </p>

        <p>
          The app is built using <strong>React</strong> and focuses on a clean
          UI, fast performance, and smooth infinite scrolling for a better
          reading experience.
        </p>

        <hr />

        <h4>Data Source & Credits</h4>

        <p>
          This application uses news data provided by{" "}
          <a href="https://newsapi.org/" target="_blank" rel="noreferrer">
            NewsAPI.org
          </a>
          .
        </p>

        <p>
          All news articles, headlines, images, and related metadata are owned
          by their respective publishers. NewsMonkey does not claim ownership of
          this content.
        </p>

        <hr />

        <h4>Disclaimer</h4>
        <p>
          NewsMonkey is a personal/educational project created for learning and
          demonstration purposes only.
        </p>
      </div>
    );
  }
}
