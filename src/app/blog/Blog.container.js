import React from "react";
import { getAllPosts } from '../gateway/posts';
import { Blog } from './Blog';

export class BlogContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: null
    };
  }

  /**
   * Sort posts descendingly
   * @param  {Array} posts - array of posts
   * @return {Array}       - array of sorted posts
   */
  sortDesc(posts) {
    return posts.sort((postA, postB) => {
      const postATS = new Date(postA.publish_date).getTime();
      const postBTS = new Date(postB.publish_date).getTime();
      return postBTS - postATS;
    });
  }

  componentWillMount() {
    getAllPosts().then((posts) => this.setState({posts: this.sortDesc(posts)}));
  }
  render() {
    return <div><Blog posts={this.state.posts} /></div>;
  }
}
