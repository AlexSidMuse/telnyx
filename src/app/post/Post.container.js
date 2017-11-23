import React from "react";
import { getPostBySlug } from '../gateway/posts';
import { getCommentsByPostId, postComment } from '../gateway/comments';
import { Post } from './Post';
import { Comments } from './comments/Comments';
import { PostNotFound } from './post-not-found/PostNotFound';
import moment from 'moment';

export class PostContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      post: null,
      comments: null
    };
  }

  componentWillMount() {
    this.getPost().then((post) => {
      this.setState({post}, () => this.fetchAndStructureComments());
    }).catch(() => this.setState({post: 404}));
  }

  fetchAndStructureComments() {
    getCommentsByPostId(this.state.post.id).then((comments) => {
      this.setState({comments: this.generateCommentsTree(comments)});
    });
  }

  /**
   * Get post using either object from router state if exists
   *   or fetching it from the server by slug
   * This check is in place to reduce number of network request
   *   for the majority of cases when we already have
   *   the post data lodaed in post feed
   * @return {Promise} - Promise with a post
   */
  getPost() {
    const RouteState = this.props.location.state;
    return new Promise((resolve, reject) => {
      if (RouteState && RouteState.post) {
        resolve(RouteState.post);
      } else {
        getPostBySlug(this.props.params.slug).then(resolve).catch(reject);
      }
    })
  }

  generateCommentsTree(comments) {
    const map = {};
    const commentsTree = [];

    // Sorting flat array before building tree
    comments = comments.sort(this.sortCommentsRule);

    // Creating comments map to reference easily by id
    comments.forEach((comment) => {
      map[comment.id] = comment;
      map[comment.id].children = [];
    });

    // Creating comments tree with children
    comments.forEach((comment) => {
      if (comment.parent_id) {
        map[comment.parent_id].children.push(comment);
      } else {
        commentsTree.push(comment);
      }
    });

    this.commentsMap = map;

    return commentsTree;
  }

  /**
   * Descending rule for sorting comments by date
   * @param  {Object} commentA - first comment in the sort pair
   * @param  {Object} commentB - second comment in the sort pair
   * @return {Number}          - number for soring
   */
  sortCommentsRule(commentA, commentB) {
    const commentATS = new Date(commentA.date).getTime();
    const commentBTS = new Date(commentB.date).getTime();
    return commentBTS - commentATS;
  }

  handleCommentPost(value) {
    const comment = {
      postId:this.state.post.id,
      parentId: null,
      user: 'You', // For a lack of an authentication
      date: moment().format("YYYY-MM-DD--HH-MM-SS"),
      content: value
    }

    return postComment(comment).then(() => this.fetchAndStructureComments());
  }

  render() {

    if (this.state.post === 404) {
      return <PostNotFound />
    }
    
    return (
      <div>
        <Post post={this.state.post} />
        <Comments comments={this.state.comments} handleCommentPost={this.handleCommentPost.bind(this)} />
      </div>
    )
  }
}
