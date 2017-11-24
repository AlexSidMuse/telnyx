import React from "react";
import { BlogPost } from './blog-post/BlogPost';
import PropTypes from 'prop-types';
import { LoadingSpinner } from '../loading-spinner/LoadingSpinner';

/**
 * Rendering blog feed
 */
export class Blog extends React.Component {

  /**
   * Render list of posts as a BlogPost nodes
   * @return {Array} - array of react components
   */
  renderPosts() {
    if (!this.props.posts) { return <LoadingSpinner /> };
    return this.props.posts.map((post) => <BlogPost post={post} key={post.id} />);
  }

  render() {
    return (
      <div className="blog">
        {this.renderPosts()}
      </div>
    );
  }
}

// Type checking
Blog.propTypes = {
  posts: PropTypes.array
};
