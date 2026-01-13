import { useState } from "react";
import "./App.css";
import React, { Component } from "react";
import Navbar from "./components/Navbar";
import News from "./components/News";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HeroNews from "./components/HeroNews";
import Category from "./components/Category";
import Home from "./components/Home";

export default class App extends Component {
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


          <Routes>
            <Route
              path="/"
              element={
                <News pageSize={5} country={"us"} category={"general"} />
              }
            />
            <Route
              path="/general"
              element={
                <News pageSize={5} country={"us"} category={"general"} />
              }
            />
            <Route
              path="/sports"
              element={<News pageSize={5} country={"us"} category={"sports"} />}
            />
            <Route
              path="/health"
              element={<News pageSize={5} country={"us"} category={"health"} />}
            />
            <Route
              path="/science"
              element={
                <News pageSize={5} country={"us"} category={"science"} />
              }
            />
            <Route
              path="/entertainment"
              element={
                <News pageSize={5} country={"us"} category={"entertainment"} />
              }
            />
            <Route
              path="/politics"
              element={
                <News pageSize={5} country={"us"} category={"politics"} />
              }
            />
            <Route
              path="/business"
              element={
                <News pageSize={5} country={"us"} category={"business"} />
              }
            />
            <Route
              path="/technology"
              element={
                <News pageSize={5} country={"us"} category={"technology"} />
              }
            />
          </Routes>
        </Router>

        {/* <Home/> */}
      </>
    );
  }
}
