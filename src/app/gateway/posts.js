import { API_URL, handleErrors, jsonify } from './config';

/**
 * Get all posts from the API
 * @return {Promise} - fetch promise
 */
const getAllPosts = () => {
  return fetch(`${API_URL}/posts/`)
    .then(handleErrors).then(jsonify)
    .catch((e) => console.error(e));
}

/**
 * Get a specific post by its slug
 * @param  {String} slug  - slug of the post
 * @return {Promise}      - fetch promise
 */
const getPostBySlug = (slug) => {
  return fetch(`${API_URL}/posts?slug=${slug}`)
    .then(handleErrors).then(jsonify)

    // Return single post instead of array
    .then(posts => posts[0])

    .catch((e) => console.error(e));
}

export { getAllPosts, getPostBySlug }