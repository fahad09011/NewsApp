import React, { Component } from "react";
import { NavLink, Link } from "react-router-dom";
import "../App.css";

export default class Navbar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchBarText: "",
    };
  }

  handleSearchBarText = (event) => {
    this.setState({ searchBarText: event.target.value });
    console.log(this.state.searchBarText);
  };

  handleSubmit = (form) => {
    form.preventDefault();
    this.props.navigate(
      `/search?q=${encodeURIComponent(this.state.searchBarText)}`,
    );
  };

  render() {
    return (
      <>
        <nav className="navbar sticky-top navbar-expand-lg ">
          <div className="container-fluid">
            <Link className="navbar-brand" to="/general">
              NewsMonkey
            </Link>

            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>

            <div
              className="collapse navbar-collapse "
              id="navbarSupportedContent">
              <ul className="navbar-nav me-auto  mb-2 mb-lg-0 gap-1 ">
                <li className="nav-item">
                  <NavLink className="nav-link " aria-current="page" to="/">
                    Home
                  </NavLink>
                </li>

                <li className="nav-item">
                  <NavLink className="nav-link" to="/about">
                    About
                  </NavLink>
                </li>

                <li className="nav-item">
                  <NavLink className="nav-link" to="/sports">
                    Sports
                  </NavLink>
                </li>

                <li className="nav-item">
                  <NavLink className="nav-link" to="/entertainment">
                    Entertainment
                  </NavLink>
                </li>

                <li className="nav-item">
                  <NavLink className="nav-link" to="/health">
                    Health
                  </NavLink>
                </li>

                <li className="nav-item">
                  <NavLink className="nav-link" to="/science">
                    Science
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/politics">
                    Politics
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/business">
                    Business
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/technology">
                    Technology
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/general">
                    General
                  </NavLink>
                </li>
                
              </ul>
              <div className="search">
                <form
                  className="form-inline my-2 my-lg-0"
                  onSubmit={this.handleSubmit}
                >
                  <input
                    className="form-control mr-sm-2 flex"
                    type="search"
                    placeholder="Search news by title"
                    aria-label="Search news by title"
                    value={this.state.searchBarText}
                    onChange={this.handleSearchBarText}
                  />
              

                </form>
              </div>
            </div>
          </div>
        </nav>
      </>
    );
  }
}
