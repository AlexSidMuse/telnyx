import React from "react";
import { getAllPosts } from '../gateway/posts';
import { Blog } from './Blog';
import moment from 'moment';

/**
 * Container element for Blog Feed
 */
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
      const postATS = moment(postA.publish_date).unix();
      const postBTS = moment(postB.publish_date).unix();
      return postBTS - postATS;
    });
  }

  componentWillMount() {

    // Get all posts, sort them and set into state
    this.postsLoader = getAllPosts().then((posts) => this.setState({posts: this.sortDesc(posts)}));
    
  }
  render() {
    return <div><Blog posts={this.state.posts} /></div>;
  }
}
