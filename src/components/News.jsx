import React, { Component } from "react";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";
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
      totalResults: 0,
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
  fetchNews = async (country, category, page, pageSize , showTopLoader) => {
            if(showTopLoader) this.props.setProgress(30);

    if (this.state.loading) return;
        this.setState({ loading: true });
        if(showTopLoader) this.props.setProgress(40);

    let response = await fetch(
 `/api/news?category=${category}&page=${page}&pageSize=${pageSize}`    );
 console.log("Remaining:", response.headers.get("X-RateLimit-Remaining"));
console.log("Limit:", response.headers.get("X-RateLimit-Limit"));
    let news = await response.json();
    const newArticles= Array.isArray(news.articles) ? news.articles : [] ;
        if(showTopLoader) this.props.setProgress(80);

    this.setState({
      // for button paggination 
      // articles: news.articles
      articles: 
      page === 1 ? newArticles : this.state.articles.concat(newArticles),
      totalResults: news.totalResults || 0,
      page,
      loading: false,
    },
    
    ()=>{
      if (
            !this.hasScrollbar() &&
            this.state.page <
              Math.ceil(this.state.totalResults / this.props.pageSize)
          ) {
            this.fetchMoreData();
          }

    }
    );
        if(showTopLoader) this.props.setProgress(100);

    // for button paggination
    // localStorage.setItem("newpage", page);
  };

  async componentDidMount() {
    this.updateTitle();
    // const savedPage = Number(localStorage.getItem("newpage") || 1);
    this.fetchNews(
      this.props.country,
      this.props.category,
      1,
      // savedPage,
      this.props.pageSize,
      false
    );
  }

    async componentDidUpdate(prevProps) {
    this.updateTitle();

    if (
      prevProps.category !== this.props.category ||
      prevProps.country !== this.props.country
    ) {
      // localStorage.removeItem("newpage");
      this.setState(
        { articles: [], page: 1, totalResults: 0 },
      ()=>{this.fetchNews(
        this.props.country,
        this.props.category,
        1,
        this.props.pageSize,
        true
      );
    }
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
        this.props.pageSize,
        false
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
        this.props.pageSize,
        false
      );
    }
  };


  
  fetchMoreData = async () => {
    if(this.state.loading) return;
    this.fetchNews(
      this.props.country,
    this.props.category,
    this.state.page + 1,
    this.props.pageSize,
    false
    );
  };

hasScrollbar = () => {
  return document.documentElement.scrollHeight > window.innerHeight;
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
        <InfiniteScroll
          dataLength={this.state.articles?.length || 0}
          next={this.fetchMoreData}
          hasMore={this.state.page < Math.ceil(this.state.totalResults/this.props.pageSize) }
          loader={<Spinner/>}
        >
          <div className="container">
            {
          <NewsGrid articles={gridArticle} formatDate={this.formatDate} />
        }
        </div>
        </InfiniteScroll>
      
        {/* <Pagination
          page={this.state.page}
          totalResults={this.state.totalResults}
          pageSize={this.props.pageSize}
          handlePreviousClick={this.handlePreviousClick}
          handleNextClick={this.handleNextClick}
        /> */}
      </div>
    );
  }
}
