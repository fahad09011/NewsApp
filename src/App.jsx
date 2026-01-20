import "./App.css";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import React, { Component } from "react";
import Navbar from "./components/Navbar";
import News from "./components/News";
import TopLoadingBar from "./components/TopLoadingBar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import About from "./components/About";
import Footer from "./components/Footer";

function NavbarWrapper(props) {
  const navigate = useNavigate();
  return <Navbar {...props} navigate={navigate} />;
}
export default class App extends Component {
  apikey;
  constructor(props) {
    super(props);
    this.state = {
      progress: 0,
      searchQuery: "",
    };
  }

  handleSearch = (query) => {
    this.setState({ searchQuery: query });
  };

  setProgress = (value) => {
    this.setState({ progress: value });
  };

  render() {
    return (
      <>
        <Router>
          <NavbarWrapper />
          <TopLoadingBar progress={this.state.progress} />
          <Routes>
            <Route path="/about" element={<About />} />
            <Route
              path="/search"
              element={
                <News
                  setProgress={this.setProgress}
                  pageSize={8}
                  country={"us"}
                  category={"general"}
                />
              }
            />
            <Route
              path="/"
              element={
                <News
                  setProgress={this.setProgress}
                  pageSize={8}
                  country={"us"}
                  category={"general"}
                />
              }
            />
            <Route
              path="/general"
              element={
                <News
                  setProgress={this.setProgress}
                  pageSize={8}
                  country={"us"}
                  category={"general"}
                />
              }
            />
            <Route
              path="/sports"
              element={
                <News
                  setProgress={this.setProgress}
                  pageSize={8}
                  country={"us"}
                  category={"sports"}
                />
              }
            />
            <Route
              path="/health"
              element={
                <News
                  setProgress={this.setProgress}
                  pageSize={8}
                  country={"us"}
                  category={"health"}
                />
              }
            />
            <Route
              path="/science"
              element={
                <News
                  setProgress={this.setProgress}
                  pageSize={8}
                  country={"us"}
                  category={"science"}
                />
              }
            />
            <Route
              path="/entertainment"
              element={
                <News
                  setProgress={this.setProgress}
                  pageSize={8}
                  country={"us"}
                  category={"entertainment"}
                />
              }
            />
            <Route
              path="/politics"
              element={
                <News
                  setProgress={this.setProgress}
                  pageSize={8}
                  country={"us"}
                  category={"politics"}
                />
              }
            />
            <Route
              path="/business"
              element={
                <News
                  setProgress={this.setProgress}
                  pageSize={8}
                  country={"us"}
                  category={"business"}
                />
              }
            />
            <Route
              path="/technology"
              element={
                <News
                  setProgress={this.setProgress}
                  pageSize={8}
                  country={"us"}
                  category={"technology"}
                />
              }
            />
          </Routes>
          <Footer />
        </Router>
        <SpeedInsights />
        <Analytics />
      </>
    );
  }
}
