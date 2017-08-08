import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { socket } from 'utils/socket';

export default class RepoForm extends Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
    error: PropTypes.object,
    loading: PropTypes.bool
  };

  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
      description: '',
      language: ''
    };
  }

  getHelpTooltip() {
    return (
      <Tooltip id="sshTooltip">
        This is the tutor account on ieng6 where the assignments are stored.
        (i.e cs11u5)
      </Tooltip>
    );
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleSubmit = event => {
    event.preventDefault();

    this.props.onSubmit({
      ...this.state,
      socketId: socket.id
    });
  };

  render() {
    const { error, loading } = this.props;
    const { username, password, description, language } = this.state;
    const hasInvalidFields = !(username && password && description && language);

    return (
      <form className="buffer-top" onSubmit={this.handleSubmit}>
        {error &&
          <div className="form-group">
            {error.message}
          </div>}
        <div className="form-group input-group">
          <input
            type="text"
            name="username"
            placeholder="SSH Username"
            className="form-control"
            onChange={this.handleChange}
          />

          <OverlayTrigger placement="bottom" overlay={this.getHelpTooltip()}>
            <span className="input-group-addon">
              <i className="fa fa-question-circle" rel="help" />
            </span>
          </OverlayTrigger>
        </div>
        <div className="form-group">
          <input
            type="password"
            name="password"
            placeholder="SSH Password"
            className="form-control"
            onChange={this.handleChange}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            name="description"
            placeholder="Repository Name/Description"
            className="form-control"
            onChange={this.handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="language-c" className="radio-inline">
            <input
              type="radio"
              id="language-c"
              name="language"
              value="c"
              onChange={this.handleChange}
            />
            C (CSE5)
          </label>
          <label htmlFor="language-java" className="radio-inline">
            <input
              type="radio"
              id="language-java"
              name="language"
              value="java"
              onChange={this.handleChange}
            />
            Java (CSE11)
          </label>
        </div>

        <button
          disabled={hasInvalidFields || loading}
          className="btn btn-block btn-primary"
        >
          + New Repository
        </button>
      </form>
    );
  }
}
