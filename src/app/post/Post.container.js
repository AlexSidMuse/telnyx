import React from "react";
import PropTypes from 'prop-types';
import { getPostBySlug } from '../gateway/posts';
import { getCommentsByPostId, postComment } from '../gateway/comments';
import { Post } from './Post';
import { Comments } from './comments/Comments';
import { PostNotFound } from './post-not-found/PostNotFound';
import moment from 'moment';

/**
 * Container component for the blog post page
 */
export class PostContainer extends React.Component {
  constructor(props) {
    super(props);

    // Initialize state for future data
    this.state = {
      post: null,
      comments: null,
      commentsMap: null
    };
  }

  componentWillMount() {

    // Fetching post and comments step by step
    this.getPost().then((post) => {
      this.setState({post}, () => this.fetchAndStructureComments());
    }).catch(() => this.setState({post: 404}));
  }

  /**
   * Fetch comments from the server, apply all
   *   necessary transformations to them
   *   and set into the state
   */
  fetchAndStructureComments() {
    getCommentsByPostId(this.state.post.id).then((comments) => {
      this.setState(this.generateCommentsTree(comments));
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

  /**
   * Generating recursive tree of comments
   *   with a map of comments by their ids
   * @param  {Array} comments - flat array of comments
   * @return {Object}         - Object with recursive comments and mapped comments
   */
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

    return {
      comments: commentsTree,
      commentsMap: map
    }
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

  handleCommentPost(data) {
    const comment = Object.assign({
      postId: this.state.post.id,
      parent_id: null,
      user: 'You', // Since we don't have any authentication
      date: moment().format("YYYY-MM-DD HH:mm:ss"),
    }, data) // For a lack of a spread operator support

    return postComment(comment).then(() => this.fetchAndStructureComments());
  }

  /**
   * Open reply form for the single component
   * It's also close all reply forms from all other comments
   * @param  {String} id - comment id
   */
  openCommentReply(id) {
    const commentsMap = Object.assign(this.state.commentsMap);

    // Close previously opened replies
    Object.keys(commentsMap).forEach((key) => delete commentsMap[key].replyOpened);
    commentsMap[id].replyOpened = true;
    this.setState({commentsMap: commentsMap});
  }

  render() {

    if (this.state.post === 404) {
      return <PostNotFound />
    }
    
    return (
      <div>
        <Post post={this.state.post} />
        <Comments
          comments={this.state.comments}
          commentsMap={this.state.commentsMap}
          openCommentReply={this.openCommentReply.bind(this)}
          handleCommentPost={this.handleCommentPost.bind(this)} />
      </div>
    )
  }
}

// Type checking
PostContainer.propTypes = {
  location: PropTypes.object.isRequired,
  params: PropTypes.object.isRequired,
};

