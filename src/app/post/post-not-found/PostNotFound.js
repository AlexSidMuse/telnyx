import React from 'react';
import { Link } from "react-router";

/**
 * 404 page for a single post of blog
 */
const PostNotFound = () => {
  return (
    <div className="post-not-found">
      <h2 className="message">Ooops, there is no such post</h2>
      <p>Try to search for the post you need on the <Link to="blog">blog</Link></p>
    </div>
  );
}

export { PostNotFound }