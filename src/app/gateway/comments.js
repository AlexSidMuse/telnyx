import { API_URL, handleErrors, jsonify } from './config';

/**
 * Get list of comments for specific post
 * @param  {String} id  - id of the post
 * @return {Promise}    - fetch promise
 */
const getCommentsByPostId = (id) => {
  return fetch(`${API_URL}/comments?postId=${id}`)
    .then(handleErrors).then(jsonify)
    .catch((e) => console.error(e));
}

const postComment = (comment) => {
  return fetch(`${API_URL}/comments`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(comment)
  })
    .then(handleErrors).then(jsonify)
    .catch((e) => console.error(e));
}

export { getCommentsByPostId, postComment };