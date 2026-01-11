import React, { Component } from "react";
import PropTypes from "prop-types";

import NewsItem from "./NewsItem";
import "../App.css";
import Spinner from "./Spinner";
export default class News extends Component {
  // default props, if no props provided then these will be use
  static defaultProps = {
    country: "us",
    pageSize: 5,
    category: "general",
  };
  static propTypes ={
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
  }
  constructor() {
    super();
    //console.log("Hey, im constructor.");
    this.state = {
      articles: [],
      loading: false,
      page: 1,
      totalResults: "",
    };
  }

  fetchNews = async (country, category, page, pageSize) => {
    this.setState({ loading: true });
    let response = await fetch(
      `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=3665460313894fefbfec4093fa9f81c5&page=${page}&pageSize=${pageSize} `
    );
    let news = await response.json();
    console.log(news);
    this.setState({
      articles: news.articles,
      totalResults: news.totalResults,
      page,
      loading: false,
    });
  };

  async componentDidMount() {
    this.fetchNews(this.props.country , this.props.category, this.state.page, this.props.pageSize);
  }
  async componentDidUpdate(prevProps){
    if (
    prevProps.category !== this.props.category ||
    prevProps.country !== this.props.country
  ) {
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
      this.fetchNews(this.props.country, this.props.category, prevPage, this.props.pageSize);
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
      this.fetchNews(this.props.country, this.props.category, nextPage, this.props.pageSize);
    }
  };
  render() {
    // let { pageSize, country, category } = this.props;
    return (
      <div id="newsContainer" className="container my-3">
        <h2 className="text-center">NewsMonkeys - Headlines</h2>
        {this.state.loading && <Spinner />}
        <div className="row">
          {!this.state.loading &&
            this.state.articles.map((article) => {
              return (
                <div className="col-md-4" key={article.url}>
                  <NewsItem
                    title={article.title}
                    description={article.description}
                    imgURL={article.urlToImage}
                    readMore={article.url}
                    author={article.author}
                    publishedDate={article.publishedAt}
                    source={article.source.name}
                  />
                </div>
              );
            })}
        </div>

        <div className="d-flex justify-content-around">
          <button
            type="button"
            className="btn btn-primary"
            onClick={this.handlePreviousClick}
            disabled={this.state.page <= 1}
          >
            &#8592;Previous
          </button>

          <button
            type="button"
            className="btn btn-primary"
            onClick={this.handleNextClick}
            disabled={
              this.state.page >=
              Math.ceil(this.state.totalResults / this.props.pageSize)
            }
          >
            Next&#8594;
          </button>
        </div>
      </div>
    );
  }
}
