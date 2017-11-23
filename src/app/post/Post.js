import React from 'react';
import moment from 'moment';

const Post = (props) => {

  if (!props.post) { return null; }

  // Format date into more readable format
  const formatDate = moment(props.post.publish_date).format("MMMM D, YYYY");

  return  (
    <div className="post">
      <h2 className="post-title">
          {props.post.title}
      </h2>
      <p className="post-meta text-muted">
        {formatDate} by {props.post.author}
      </p>
      <div dangerouslySetInnerHTML={{__html: props.post.content}} />
    </div>
  )
}

export { Post }