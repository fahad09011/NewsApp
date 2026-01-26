# NewsMonkey – Modern News Application (React)

## Overview

**NewsMonkey** is a modern, responsive news application built using **React**. It delivers the latest headlines across multiple categories such as Business, Technology, Sports, Health, Science, and more.

The application emphasizes:

* Clean and intuitive user interface
* Efficient data loading
* Infinite scrolling for seamless content consumption
* Search functionality
* Category-based navigation
* Secure API handling using serverless functions

This project was developed as a learning-oriented yet production-structured React application, following real-world best practices.



## Live Demo

* **Live Application:** [https://news-app-kappa-ten-39.vercel.app/](https://news-app-kappa-ten-39.vercel.app/)
* **API:** Secured using Vercel Serverless Functions



## Tech Stack

### Frontend

* React (Class Components)
* React Router DOM
* Bootstrap 5
* Custom CSS
* Infinite Scroll
* Top Loading Bar

### Backend / API

* NewsAPI.org
* Vercel Serverless Functions
* Environment Variables

### Deployment & Analytics

* Vercel
* Vercel Analytics
* Vercel Speed Insights



## Project Structure

```
src/
│
├── components/
│   ├── Navbar.jsx
│   ├── News.jsx
│   ├── NewsGrid.jsx
│   ├── NewsItem.jsx
│   ├── HeroNews.jsx
│   ├── CategoriesPreview.jsx
│   ├── Spinner.jsx
│   ├── TopLoadingBar.jsx
│   ├── Footer.jsx
│   └── About.jsx
│
├── assets/
│   └── images
│
├── App.jsx
├── App.css
└── main.jsx
```

```
api/
└── news.js   (Vercel Serverless Function)
```



## Core Features and Implementation Details

### 1. Category-Based News Rendering

Each news category route (e.g., `/sports`, `/technology`) renders the same `News` component while passing a different `category` prop.

```jsx
<News category="sports" />
```

This approach avoids component duplication, keeps routing clean, and ensures scalability.



### 2. Infinite Scrolling and Pagination

Articles are loaded incrementally using pagination rather than fetching all data at once:

* API requests are made page by page
* Additional articles load as the user scrolls
* Reduces API usage
* Improves performance and user experience

Each scroll event triggers a new API request for the next page of results.



### 3. Search Functionality

Search functionality is implemented using the same `News` component.

* Search queries are stored in the URL (e.g., `/search?q=bitcoin`)
* The component reads the query directly from the URL
* API endpoint switches automatically based on search state

```js
if (searchQuery) {
  // Use 'everything' endpoint
} else {
  // Use 'top-headlines' endpoint
}
```

This design ensures search persistence across page refreshes without introducing unnecessary state.



### 4. Hero Section Logic

* The hero article appears only on the General category
* It is hidden during search operations
* The first article is displayed as the hero, while the rest populate the grid

```js
const heroArticle = category === "general" ? articles[0] : null;
```



### 5. Responsive News Grid Layout

The layout uses Bootstrap’s grid system:

```jsx
<div className="col-12 col-md-6 col-xl-4">
```

Responsive behavior:

* Below 768px: one article per row
* 768px and above: two articles per row
* 1200px and above: three articles per row

This ensures responsiveness without requiring JavaScript-based layout logic.



### 6. Error and Empty State Handling

Error and empty states are managed using `apiStatus` and `articles.length`.

Handled scenarios include:

* Invalid or empty search results
* API rate limit exceeded
* Network or request failures

Clear and user-friendly messages are displayed accordingly.



### 7. Top Loading Bar Integration

The top loading bar is managed globally from `App.jsx`:

```jsx
<TopLoadingBar progress={this.state.progress} />
```

The loader:

* Starts when data fetching begins
* Ends after data has successfully loaded

State updates are handled within lifecycle methods such as `componentDidMount` and `componentDidUpdate` to avoid render-side side effects.



### 8. Footer Placement

The footer:

* Remains fixed at the bottom of the layout
* Does not shift during loading states
* Is rendered outside the routing structure

```jsx
<Routes />
<Footer />
```



## API Security

### Incorrect Approach (Client-Side Key Exposure)

```js
https://newsapi.org/...&apiKey=YOUR_KEY
```

### Correct Approach (Server-Side Handling)

* API keys are stored using Vercel Environment Variables
* Requests are proxied through `/api/news`

```js
process.env.NEWS_API_KEY
```

This approach prevents key exposure and ensures production-level security.



## Vercel Serverless API

The `/api/news.js` function supports:

* Category-based news fetching
* Search queries
* Pagination

The API dynamically switches between:

* `top-headlines`
* `everything`



## Key Learning Outcomes

This project provided practical experience with:

* React class components and lifecycle methods
* Conditional rendering patterns
* URL-based state management
* Infinite scrolling implementation
* API rate limit handling
* Responsive UI design
* Serverless backend architecture
* Production-style project structuring



## Future Enhancements

* Migration to functional components and hooks
* Debounced search functionality
* Bookmarking articles
* Skeleton loaders
* Dark mode support
* Progressive Web App (PWA) features

## Credits
* **News Data:** NewsAPI.org
* **UI Framework:** Bootstrap
* **Deployment Platform:** Vercel

All news content belongs to their respective publishers.

## Author
**Muhammad Fahad**
Front-End Developer (React)
GitHub: *[https://github.com/fahad09011](https://github.com/fahad09011)*
