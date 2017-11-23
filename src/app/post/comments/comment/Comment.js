import React from 'react';
import moment from 'moment';

const Comment = (props) => {

  console.log(props)

  // Format date into more readable format
  const formatDate = moment(props.comment.date).format("MMMM D, YYYY");

  return (
    <div className="post-comment">
      <p className="author"><strong>{props.comment.user}</strong></p>
      <p className="date text-muted">{formatDate}</p>
      <p className="content">{props.comment.content}</p>
      {props.children}
    </div>
  );
}

export { Comment };