import React from "react";
import { BlogPost } from './blog-post/BlogPost';
import PropTypes from 'prop-types';

/**
 * Rendering blog feed
 */
export class Blog extends React.Component {

  /**
   * Render list of posts as a BlogPost nodes
   * @return {Array} - array of react components
   */
  renderPosts() {
    if (!this.props.posts) { return null };
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
