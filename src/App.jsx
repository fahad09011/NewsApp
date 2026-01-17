import { useState } from "react";
import "./App.css";
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Analytics } from '@vercel/analytics/react';
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
    };
  }

  

setProgress = (value) =>{
  this.setState({progress: value});
}

  render() {
    return (
      <>
        <Router>
          <Navbar />
          {/* <Routes>
               <Route path="/" element={<Home />} />
            
            <Route
              path="/general"
              element={
                <Category  category={"general"} />
              }
            />
            <Route
              path="/sports"
              element={<Category  category={"sports"} />}
            />
            <Route
              path="/health"
              element={<Category  category={"health"} />}
            />
            <Route
              path="/science"
              element={
                <Category  category={"science"} />
              }
            />
            <Route
              path="/entertainment"
              element={
                <Category  category={"entertainment"} />
              }
            />
            <Route
              path="/politics"
              element={
                <Category  category={"politics"} />
              }
            />
            <Route
              path="/business"
              element={
                <Category  category={"business"} />
              }
            />
            <Route
              path="/technology"
              element={
                <Category  category={"technology"} />
              }
            />
          </Routes> */}
<TopLoadingBar progress={this.state.progress}/>
          <Routes>
            <Route
              path="/"
              element={
                <News setProgress={this.setProgress} pageSize={5} country={"us"} category={"general"} />
              }
            />
            <Route
              path="/general"
              element={
                <News setProgress={this.setProgress} pageSize={5} country={"us"} category={"general"} />
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
                <News setProgress={this.setProgress} pageSize={5} country={"us"} category={"science"} />
              }
            />
            <Route
              path="/entertainment"
              element={
                <News setProgress={this.setProgress} pageSize={5} country={"us"} category={"entertainment"} />
              }
            />
            <Route
              path="/politics"
              element={
                <News setProgress={this.setProgress} pageSize={5} country={"us"} category={"politics"} />
              }
            />
            <Route
              path="/business"
              element={
                <News setProgress={this.setProgress} pageSize={5} country={"us"} category={"business"} />
              }
            />
            <Route
              path="/technology"
              element={
                <News setProgress={this.setProgress} pageSize={5} country={"us"} category={"technology"} />
              }
            />
          </Routes>
        </Router>
                      <SpeedInsights />

      </>
    );
  }
}
