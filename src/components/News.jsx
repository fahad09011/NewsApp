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
  previousSearchQuery = "";
  previousCategory = "";

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
      apiStatus: "ok",
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
  getSearchQueryFromURL = () => {
    const params = new URLSearchParams(window.location.search);
    return params.get("q") || "";
  };

  fetchNews = async (country, category, page, pageSize, showTopLoader) => {
    const searchQuery = this.getSearchQueryFromURL();

    if (this.state.loading) return;
    if (showTopLoader) this.props.setProgress(30);

    this.setState({ loading: true });
    if (showTopLoader) this.props.setProgress(40);

    let url = `/api/news?&page=${page}&pageSize=${pageSize}`;
    if (searchQuery.trim() !== "") {
      url += `&q=${encodeURIComponent(searchQuery)}`;
    } else {
      url += `&category=${category}`;
    }

    let response = await fetch(url);

    let news = await response.json();

    const newArticles = Array.isArray(news.articles) ? news.articles : [];
    if (showTopLoader) this.props.setProgress(80);

    this.setState(
      {
        articles:
          page === 1 ? newArticles : this.state.articles.concat(newArticles),
        totalResults: news.totalResults || 0,
        page,
        loading: false,
        apiStatus: news.status,
      },

      () => {
        if (
          !this.hasScrollbar() &&
          this.state.page <
            Math.ceil(this.state.totalResults / this.props.pageSize)
        ) {
          this.fetchMoreData();
        }
      },
    );
    if (showTopLoader) this.props.setProgress(100);
  };

  async componentDidMount() {
    this.updateTitle();
    this.previousSearchQuery = this.getSearchQueryFromURL();
    this.previousCategory = this.props.category;
    this.fetchNews(
      this.props.country,
      this.props.category,
      1,
      this.props.pageSize,
      false,
    );
  }

  async componentDidUpdate() {
    this.updateTitle();

    const currentSearchQuery = this.getSearchQueryFromURL();
    const currentCategory = this.props.category;
    const searchChanged = currentSearchQuery !== this.previousSearchQuery;
    const categoryChanged = currentCategory !== this.previousCategory;

    if (searchChanged || categoryChanged) {
      this.previousCategory = currentCategory;
      this.previousSearchQuery = currentSearchQuery;
      this.setState({ articles: [], page: 1, totalResults: 0 }, () => {
        this.fetchNews(
          this.props.country,
          this.props.category,
          1,
          this.props.pageSize,
          true,
        );
      });
    }
  }

  fetchMoreData = async () => {
    if (this.state.loading) return;
    this.fetchNews(
      this.props.country,
      this.props.category,
      this.state.page + 1,
      this.props.pageSize,
      false,
    );
  };

  hasScrollbar = () => {
    return document.documentElement.scrollHeight > window.innerHeight;
  };

  render() {
    const searchText = this.getSearchQueryFromURL();
    const isSearching = searchText.trim() !== "";
    const hasArticles = this.state.articles.length > 0;
    const isApiError = this.state.apiStatus === "error";
    const heroArticle =
      this.props.category == "general" && this.state.articles.length > 0
        ? this.state.articles[0]
        : null;

    const gridArticle =
      this.props.category == "general"
        ? this.state.articles.slice(1)
        : this.state.articles;

    return (
      <div id="newsContainer">
        {this.props.category === "general" && !searchText && (
          <section className="categoryIntro">
            <h2 className="categoryTitle">📰 Explore News by Category</h2>
            <p className="categorySubtitle">
              Pick a topic to get the latest headlines instantly
            </p>
          </section>
        )}

        {this.props.category == "general" && !searchText && (
          <CategoriesPreview />
        )}

        <div className="sectionDivider" />
        {isSearching && (
          <div className="heroIntro">
            <h2 className=" heroHeading heroBadhe">Search results for: </h2>
            <h5 className="heroBadhe">{this.capitalizer(searchText)}</h5>
          </div>
        )}

        {heroArticle && this.props.category == "general" && !isSearching && (
          <div className="heroIntro">
            <span className="heroBadhe">Top Story</span>
            <h2 className="heroHeading">Today's Highlight</h2>
          </div>
        )}

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

        {isSearching && !hasArticles && !isApiError && !this.state.loading && (
          <h2 className="text-center">
            No result found for: {this.capitalizer(searchText)}
          </h2>
        )}

        {!isSearching && hasArticles && !isApiError && (
          <h2 className="text-center">
            NewsMonkey - Top {this.capitalizer(this.props.category)} Headlines
          </h2>
        )}
        {isApiError && (
          <h3 className="text-center text-danger">
            Too many requests or API erro. Please try again later.
          </h3>
        )}

        {hasArticles && (
          <InfiniteScroll
            className="inf"
            dataLength={this.state.articles?.length || 0}
            next={this.fetchMoreData}
            hasMore={
              this.state.page <
              Math.ceil(this.state.totalResults / this.props.pageSize)
            }
            loader={<Spinner />}
          >
            <NewsGrid articles={gridArticle} formatDate={this.formatDate} />
          </InfiniteScroll>
        )}
      </div>
    );
  }
}
