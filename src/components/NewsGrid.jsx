import React, { Component } from 'react'
import NewsItem from './NewsItem';

export default class NewsGrid extends Component {
    
  render() {
     let {
      articles,
      formatDate
    } = this.props;
    return (
      <div className="row gx-3 mx-0  g-3 categoryContainer">

          {articles.filter(article => article).map((article) => {
              return (
                <div className="col-md-6 col-xl-4" key={article.url}>
                  <NewsItem
                    title={article.title}
                    description={article.description}
                    imgURL={article.urlToImage}
                    readMore={article.url}
                    author={article.author}
                    publishedDate={formatDate(article.publishedAt)}
                    source={article.source.name}
                  />
                </div>
              );
            })}
        </div>
    )
  }
}
