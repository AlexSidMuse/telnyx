import React from 'react';
import PropTypes from 'prop-types';
import { Comment } from './comment/Comment';
import { PostCommentForm } from './post-comment-form/PostCommentForm';
import { LoadingSpinner } from '../../loading-spinner/LoadingSpinner'

/**
 * Whole comments system
 */
export class Comments extends React.Component {

  /**
   * Render comments list recursively 
   * @param  {Array} comments - array with recursive tree of comments
   * @return {Array | Object}          - array with recursive tree of React components
   *                                      or react component with 'no comments' message
   */
  renderComments(comments) {
    if (!comments.length) {
      return <p className="text-muted">There are no comments yet</p>
    }
    return comments.map((comment) => {
      comment = this.props.commentsMap[comment.id];
      return (
        <Comment
          comment={comment}
          key={comment.id}
          openCommentReply={this.props.openCommentReply.bind(this)}
          handleCommentPost={this.props.handleCommentPost.bind(this)}>
          {comment.children.length ? this.renderComments(comment.children) : null}
        </Comment>
      )
    });
  }

  renderBody() {
    if (!this.props.comments) { return <LoadingSpinner />}
    return (
      <div>
        <PostCommentForm handlePost={(data) => this.props.handleCommentPost(data)} />
        <div className="comments-list">{this.renderComments(this.props.comments)}</div>
      </div>
    );
  }

  render() {

    return  (
      <div className="post-comments">
        <h3>Comments</h3>
        <hr />
        {this.renderBody()}
      </div>
    )
  }

}

// Type checking
Comments.propTypes = {
  commentsMap: PropTypes.object,
  comments: PropTypes.array,
  openCommentReply: PropTypes.func.isRequired,
  handleCommentPost: PropTypes.func.isRequired
};