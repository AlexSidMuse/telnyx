import React from 'react';

export class PostCommentForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(event) {
    this.setState({value: event.target.value});
  }
  handleSubmit(event) {
    event.preventDefault();
    this.props.handlePost(this.state.value).then(() => this.resetForm());
  }
  resetForm() {
    this.setState({value: ''});
  }
  render() {
    const btnClass = this.state.value ? 'btn-info' : 'btn-secondary'
    return (
      <form className="post-comment-form" onSubmit={this.handleSubmit}>
        <div className="form-item textarea">
          <textarea
            value={this.state.value}
            onChange={this.handleChange}
            className="form-control"
            placeholder="Type your comment here">
          </textarea>
        </div>
        <div className="form-item submit-button">
          <button type="submit" disabled={!this.state.value} className={`btn ${btnClass}`}>Post your comment</button>
        </div>
      </form>
    );
  }
}