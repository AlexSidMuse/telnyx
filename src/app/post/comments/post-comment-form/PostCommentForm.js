import React from 'react';
import PropTypes from 'prop-types';

/**
 * Create new comment form
 */
export class PostCommentForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};

    // Binding listeners to the context of the component
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {

    // Autofocusing on input if required
    this.props.autoFocus && this.input.focus();
  }

  /**
   * Handling input change to bind input value
   *   to a state of the component
   * Required to decide on the disability state
   *   of the post button
   * @param  {Object} event - event object
   */
  handleChange(event) {
    this.setState({value: event.target.value});
  }

  /**
   * Handle form submit by preventing default behavior
   *   and delegating method to the container component with data
   *   from the input
   * @param  {Object} event - event object
   */
  handleSubmit(event) {
    event.preventDefault();
    this.props.handlePost({content: this.state.value}).then(() => this.resetForm());
  }

  /**
   * Reseting form state
   */
  resetForm() {
    this.setState({value: ''});
  }

  render() {
    const btnClass = this.state.value ? 'btn-info' : 'btn-secondary'
    return (
      <form className="post-comment-form" onSubmit={this.handleSubmit}>
        <div className="form-item textarea">
          <input
            ref={(input) => this.input = input}
            value={this.state.value}
            onChange={this.handleChange}
            className="form-control"
            placeholder="Type your comment here">
          </input>
        </div>
        <div className="form-item submit-button">
          <button type="submit" disabled={!this.state.value} className={`btn ${btnClass}`}>Post your comment</button>
        </div>
      </form>
    );
  }
}

// Type checking
PostCommentForm.propTypes = {
  autoFocus: PropTypes.bool,
  handlePost: PropTypes.func.isRequired
};