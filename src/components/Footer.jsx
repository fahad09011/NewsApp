import React, { Component } from "react";
import "../App.css";

export default class Footer extends Component {
  render() {
    return (
      <footer className="appFooter">
        <div className="footerContainer">
          <div className="footerLeft">
            <h5>NewsMonkey 📰</h5>
            <p>
              A modern news app built with React to deliver the latest headlines
              across categories.
            </p>
          </div>

          <div className="footerRight">
            <p>
              Powered by{" "}
              <a href="https://newsapi.org/" target="_blank" rel="noreferrer">
                NewsAPI.org
              </a>
            </p>
            <p className="footerCopy">
              © {new Date().getFullYear()} NewsMonkey. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    );
  }
}
