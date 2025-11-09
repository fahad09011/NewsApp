import React, { Component } from "react";
import NewsItem from "./NewsItem";
import "../App.css";
export default class News extends Component {
  constructor() {
    super();
    console.log("Hey, im constructor.");
    this.state = {
      articles: [],
      loading: false,
      page: 1,
      pageSize:10,
      totalResults:"",
    };
  }

  async componentDidMount() {
    let response = await fetch(
      `https://newsapi.org/v2/top-headlines?country=us&apiKey=3665460313894fefbfec4093fa9f81c5&page=${this.state.page}&pageSize=${this.state.pageSize}`
    );
    let news = await response.json();
    console.log(news);
    console.log(this.state.totalResults)
    this.setState({
      articles: news.articles,
      totalResults: news.totalResults
    });
  }
  handlePreviousClick = async () => {
    let response = await fetch(
      `https://newsapi.org/v2/top-headlines?country=us&apiKey=3665460313894fefbfec4093fa9f81c5&page=${
        this.state.page - 1}&pageSize=${this.state.pageSize}`
    );
    let news = await response.json();
    console.log(news);
    this.setState({
      articles: news.articles,
    });
    this.setState({ page: this.state.page - 1 });
  };
  handleNextClick = async () => {
    if (this.state.page >= Math.ceil(this.state.totalResults/this.state.pageSize)) {
      
    } else {
      this.setState({ page: this.state.page + 1 });
    let response = await fetch(
      `https://newsapi.org/v2/top-headlines?country=us&apiKey=3665460313894fefbfec4093fa9f81c5&page=${
        this.state.page + 1
      }&pageSize=${this.state.pageSize}`
    );
    let news = await response.json();
    console.log(news);
    this.setState({
      articles: news.articles,
    });
    }
    
  };
  render() {
    return (
      <div id="newsContainer" className="container my-3">
        <h2>NewsMonkeys - Headlines</h2>
        <div className="row">
          {this.state.articles.map((article) => {
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
            onClick={this.handlePreviousClick} disabled={this.state.page<=1}
          >
            &#8592;Previous
          </button>
          <button
            type="button"
            className="btn btn-primary"
            onClick={this.handleNextClick} disabled={this.state.page >= Math.ceil(this.state.totalResults/this.state.pageSize)}
          >
            Next&#8594;
          </button>
        </div>
      </div>
    );
  }
}
