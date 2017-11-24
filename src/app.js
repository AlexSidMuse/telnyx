/**
 * Application entry point.
 */

// Initial config
import "./config";

// Global application styles
import "src/app.scss";

// React
import React from "react";
import {render} from "react-dom";
import {Router, Route, IndexRoute, Redirect, browserHistory} from "react-router";

// Our app
import App       from "./app/App";
import { About } from "./app/about/About";
import { Home }  from "./app/home/Home";
import { BlogContainer as Blog }  from "./app/blog/Blog.container";
import { PostContainer as Post }  from "./app/post/Post.container";

render((
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Home}/>
      <Route path="about" component={About}/>
      <Route path="home" component={Home}/>
      <Route path="blog" component={Blog}/>
      <Route path="blog/:slug" component={Post}/>
      <Redirect from="*" to="/home"/>
    </Route>
  </Router>
), document.getElementById("root"), () => {

  /**
   * Using this trick to prevent unstyled footer from flickering on the page
   *   while app is rendering initially.
   * Also providing opacity animation for every initial app entrance.
   */
  document.body.classList.add('app-rendered');
});
