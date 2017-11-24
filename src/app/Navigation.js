import React from "react";
import { Link } from "react-router";

export class Navigation extends React.Component {
  render() {
    return (
      <nav className="navbar navbar-expand pt-0 pb-0 navbar-dark fixed-top bg-dark">
        <div className="container">
          <div className="navbar">
            <ul className="navbar-nav nav mr-auto">
              <li className="nav-item"><Link to={`/home`} className="nav-link" activeClassName="active">Home</Link></li>
              <li className="nav-item"><Link to={`/about`} className="nav-link" activeClassName="active">About</Link></li>
              <li className="nav-item"><Link to={`/blog`} className="nav-link" activeClassName="active">Blog</Link></li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}
