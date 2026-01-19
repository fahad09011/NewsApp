import { useState } from "react";
import "./App.css";
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';

import React, { Component } from "react";
import Navbar from "./components/Navbar";
import News from "./components/News";
import TopLoadingBar from "./components/TopLoadingBar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


export default class App extends Component {
  apikey
    constructor(props) {
    super(props);

    this.state = {
      progress: 0,
      searchQuery: "",
    };
  }

  handleSearch = (query) => {
    this.setState({searchQuery: query})
  }

setProgress = (value) =>{
  this.setState({progress: value});
}

  render() {
    return (
      <>
        <Router>
          <Navbar onSearch={this.handleSearch}/>
        
<TopLoadingBar progress={this.state.progress}/>
          <Routes>
            <Route
              path="/"
              element={
              <News searchQuery={this.state.searchQuery}  setProgress={this.setProgress} pageSize={5} country={"us"} category={"general"} />
              }
            />
            <Route
              path="/general"
              element={
              <News searchQuery={this.state.searchQuery}  setProgress={this.setProgress} pageSize={5} country={"us"} category={"general"} />
              }
            />
            <Route
              path="/sports"
              element={<News setProgress={this.setProgress} pageSize={5} country={"us"} category={"sports"} />}
            />
            <Route
              path="/health"
              element={<News setProgress={this.setProgress} pageSize={5} country={"us"} category={"health"} />}
            />
            <Route
              path="/science"
              element={
              <News searchQuery={this.state.searchQuery}  setProgress={this.setProgress} pageSize={5} country={"us"} category={"science"} />
              }
            />
            <Route
              path="/entertainment"
              element={
              <News searchQuery={this.state.searchQuery}  setProgress={this.setProgress} pageSize={5} country={"us"} category={"entertainment"} />
              }
            />
            <Route
              path="/politics"
              element={
              <News searchQuery={this.state.searchQuery}  setProgress={this.setProgress} pageSize={5} country={"us"} category={"politics"} />
              }
            />
            <Route
              path="/business"
              element={
              <News searchQuery={this.state.searchQuery}  setProgress={this.setProgress} pageSize={5} country={"us"} category={"business"} />
              }
            />
            <Route
              path="/technology"
              element={
              <News searchQuery={this.state.searchQuery}  setProgress={this.setProgress} pageSize={5} country={"us"} category={"technology"} />
              }
            />
          </Routes>
        </Router>
              <SpeedInsights />
               <Analytics />


      </>
    );
  }
}
