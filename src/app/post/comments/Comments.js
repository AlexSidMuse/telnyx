import React from 'react';
import { Comment } from './comment/Comment';
import { PostCommentForm } from './post-comment-form/PostCommentForm';

export class Comments extends React.Component {

  renderComments(comments) {
    return comments.map((comment) => {
      return (
        <Comment comment={comment} key={comment.id}>
          {comment.children.length ? this.renderComments(comment.children) : null}
        </Comment>
      )
    });
  }

  render() {

    if (!this.props.comments) { return null; }

    return  (
      <div className="post-comments">
        <h3>Comments</h3>
        <hr />
        <PostCommentForm handlePost={(val) => this.props.handleCommentPost(val)} />
        <div className="comments-list">{this.renderComments(this.props.comments)}</div>
      </div>
    )
  }

}