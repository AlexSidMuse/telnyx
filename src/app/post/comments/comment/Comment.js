import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { PostCommentForm } from '../post-comment-form/PostCommentForm';

/**
 * Single comment component
 */
export class Comment extends React.Component {

  /**
   * Handle post comment by mutating data
   *   with parent_id from the comment
   *   and delegating it to the container component
   * @param  {Object} data - data from the post comment format
   * @return {Promise}     - returning result of the delegated container method
   *                           which is fetch Promise eventually
   */
  handleCommentPost(data) {
    data = Object.assign(data, {
      parent_id: this.props.comment.id
    });
    return this.props.handleCommentPost(data);
  }

  /**
   * Open post form by delegating method to the container
   */
  openPostForm() {
    this.props.openCommentReply(this.props.comment.id);
  }

  render() {

    // Format date into more readable format
    const formatDate = moment(this.props.comment.date).format("MMMM D, YYYY");

    return (
      <div className="post-comment">
        <div className="post-body">
          <p className="author"><strong>{this.props.comment.user}</strong></p>
          <p className="date text-muted">{formatDate}</p>
          <p className="content">{this.props.comment.content}</p>
          {!this.props.comment.replyOpened &&
            <p className="reply" >
              <span onClick={() => this.openPostForm()}>Reply</span>
            </p>
          }
        </div>
        {this.props.comment.replyOpened && <PostCommentForm autoFocus={true} handlePost={(data) => this.handleCommentPost(data)} />}
        {this.props.children}
      </div>
    );
  }
}

// Type checking
Comment.propTypes = {
  comment: PropTypes.object.isRequired,
  children: PropTypes.array,
  handleCommentPost: PropTypes.func.isRequired
};