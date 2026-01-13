import React, { Component } from "react";
import PropTypes from "prop-types";

import NewsItem from "./NewsItem";
import "../App.css";
import Spinner from "./Spinner";
import NewsGrid from "./NewsGrid";
import Pagination from "./Pagination";
import HeroNews from "./HeroNews";
import CategoriesPreview from "./CategoriesPreview";
export default class News extends Component {
  // default props, if no props provided then these will be use
  static defaultProps = {
    country: "us",
    pageSize: 5,
    category: "general",
  };
  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  };
  constructor(props) {
    super(props);

    this.state = {
      articles: [],
      loading: false,
      page: 1,
      totalResults: "",
    };
  }
  capitalizer = (string) => {
    return string ? string[0].toUpperCase() + string.slice(1) : "";
  };

  updateTitle = () => {
    document.title = `${this.capitalizer(this.props.category)} - NewsMonkey`;
  };
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
  fetchNews = async (country, category, page, pageSize) => {
    this.setState({ loading: true });
    let response = await fetch(
      `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=075a6be8faa4477c9550927c2e8d4c5a&page=${page}&pageSize=${pageSize} `
    );
    let news = await response.json();

    this.setState({
      articles: news.articles,
      totalResults: news.totalResults,
      page,
      loading: false,
    });
    localStorage.setItem("newpage", page);
  };

  async componentDidMount() {
    this.updateTitle();
    const savedPage = Number(localStorage.getItem("newpage") || 1);
    this.fetchNews(
      this.props.country,
      this.props.category,
      savedPage,
      this.props.pageSize
    );
  }

  async componentDidUpdate(prevProps) {
    this.updateTitle();

    if (
      prevProps.category !== this.props.category ||
      prevProps.country !== this.props.country
    ) {
      localStorage.removeItem("newpage");
      this.fetchNews(
        this.props.country,
        this.props.category,
        1,
        this.props.pageSize
      );
    }
  }
  handlePreviousClick = async () => {
    let prevPage = this.state.page - 1;
    if (prevPage < 1) {
      return;
    } else {
      this.fetchNews(
        this.props.country,
        this.props.category,
        prevPage,
        this.props.pageSize
      );
    }
  };

  handleNextClick = async () => {
    const nextPage = this.state.page + 1;
    if (
      this.state.page >=
      Math.ceil(this.state.totalResults / this.props.pageSize)
    ) {
      return;
    } else {
      this.fetchNews(
        this.props.country,
        this.props.category,
        nextPage,
        this.props.pageSize
      );
    }
  };
  render() {
    const heroArticle =
      this.props.category == "general" && this.state.articles.length > 0
        ? this.state.articles[0]
        : null;

    const gridArticle =
      this.props.category == "general"
        ? this.state.articles.slice(1)
        : this.state.articles;
    return (
      // remove container class from newsContainer
      <div id="newsContainer" className="my-3">
       
        {this.props.category == "general" ? <CategoriesPreview /> : ""}
        {heroArticle && (
          <HeroNews
            title={heroArticle.title}
            description={heroArticle.description}
            imgURL={heroArticle.urlToImage}
            readMore={heroArticle.url}
            author={heroArticle.author}
            publishedDate={this.formatDate(heroArticle.publishedAt)}
            source={heroArticle.source.name}
          />
        )}
        <h2 className="text-center">
          NewsMonkey - Top {this.capitalizer(this.props.category)} Headlines
        </h2>
        {this.state.loading && <Spinner />}
        {!this.state.loading && (
          <NewsGrid articles={gridArticle} formatDate={this.formatDate} />
        )}
        <Pagination
          page={this.state.page}
          totalResults={this.state.totalResults}
          pageSize={this.props.pageSize}
          handlePreviousClick={this.handlePreviousClick}
          handleNextClick={this.handleNextClick}
        />
      </div>
    );
  }
}
