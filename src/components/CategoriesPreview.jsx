import React, { Component } from "react";
import "../App.css";
import business from "../assets/business.webp";
import politics from "../assets/politics.jpg";
import technology from "../assets/technology.png";
import sports from "../assets/sports.jpg";
import health from "../assets/health.jpg";
import { Link } from "react-router-dom";

export default class CategoriesPreview extends Component {
  render() {
    return (
      <>
        <section className="categoryPreviewSection">
          <div className="categoryPreviewContainer">
            <div className="categ1 ">
             <Link to="/sports" className="previewButton">
                Sports
              </Link>
              <img
                src={sports}
                className="previewImg sports"
                alt="categories"
              />
            </div>
            <div className="categ2 ">
             <Link to="/politics" className="previewButton">
                Politics
              </Link>
              <img
                src={politics}
                className="previewImg politics"
                alt="categories"
              />
            </div>
            <div className="categ3 ">
             <Link to="/health" className="previewButton">
                Health
              </Link>
              <img
                src={health}
                className="previewImg health"
                alt="categories"
              />
            </div>

            <div className="categ4 ">
             <Link to="/technology" className="previewButton">
                Technology
              </Link>
              <img
                src={technology}
                className="previewImg technology"
                alt="categories"
              />
            </div>
            <div className="categ5 ">
             <Link to="/business" className="previewButton">
                Business
              </Link>
              <img
                src={business}
                className="previewImg business"
                alt="categories"
              />
            </div>
          </div>
        </section>
      </>
    );
  }
}
