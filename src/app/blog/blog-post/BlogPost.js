import React from "react";
import PropTypes from 'prop-types';
import { Link } from "react-router";
import moment from 'moment';

/**
 * Rendering single blog post in the feed
 */
const BlogPost = (props) => {

  // Format date into more readable format
  const formatDate = moment(props.post.publish_date).format("MMMM D, YYYY");

  return (
    <div className="blog-post">
      <h2 className="blog-post-title">
        <Link to={{pathname: `/blog/${props.post.slug}`, state: {post: props.post}}}>
          {props.post.title}
        </Link>
      </h2>
      <p className="blog-post-meta text-muted">
        {formatDate} by {props.post.author}
      </p>
      <p>{props.post.description}</p>
    </div>
  );
}

// Type checking
BlogPost.propTypes = {
  post: PropTypes.object.isRequired
};

export { BlogPost }