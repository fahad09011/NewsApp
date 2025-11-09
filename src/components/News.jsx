import React, { Component } from "react";
import NewsItem from "./NewsItem";
import "../App.css";
import Spinner from "./Spinner";
export default class News extends Component {
  static defaultProps = {
    country: 'us',
    pageSize: 5,
    category: 'general',
  };
  static Props
  constructor() {
    super();
    console.log("Hey, im constructor.");
    this.state = {
      articles: [],
      loading: false,
      page: 1,
      totalResults: "",
    };
  }

  async componentDidMount() {
    this.setState({ loading: true });
    let response = await fetch(
      `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=3665460313894fefbfec4093fa9f81c5&page=${this.state.page}&pageSize=${this.props.pageSize}`
    );
    let news = await response.json();
    console.log(news);
    this.setState({
      articles: news.articles,
      totalResults: news.totalResults,
      loading: false,
    });
  }
  handlePreviousClick = async () => {
    this.setState({ loading: true });
    let response = await fetch(
      `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=3665460313894fefbfec4093fa9f81c5&page=${
        this.state.page - 1
      }&pageSize=${this.props.pageSize}`
    );
    let news = await response.json();
    console.log(news);
    this.setState({
      articles: news.articles,
      loading: false,
    });
    this.setState({ page: this.state.page - 1 });
  };

  handleNextClick = async () => {
    if (
      this.state.page >=
      Math.ceil(this.state.totalResults / this.props.pageSize)
    ) {
      return;
    } else {
      this.setState({ page: this.state.page + 1 });
      this.setState({ loading: true });
      let response = await fetch(
        `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=3665460313894fefbfec4093fa9f81c5&page=${
          this.state.page + 1
        }&pageSize=${this.props.pageSize}`
      );
      let news = await response.json();
      console.log(news);
      this.setState({
        articles: news.articles,
        loading: false,
      });
    }
  };
  render() {
    let { pageSize , country , category} = this.props;
    return (
      <div id="newsContainer" className="container my-3">
        <h2 className="text-center">NewsMonkeys - Headlines</h2>
        {this.state.loading && <Spinner />}
        <div className="row">
          {!this.state.loading && this.state.articles.map((article) => {
            return (
              <div className="col-md-4" key={article.url}>
                <NewsItem
                  title={article.title}
                  description={article.description}
                  imgURL={article.urlToImage}
                  readMore={article.url}
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
