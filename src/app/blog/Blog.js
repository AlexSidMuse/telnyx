import React from "react";
import { BlogPost } from './blog-post/BlogPost';

export class Blog extends React.Component {
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
