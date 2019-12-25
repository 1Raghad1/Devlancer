import React, { Component } from 'react'
// import {FormGroup,FormControl, FormLabel , Button} from "react-bootstrap";
import { FormGroup, FormControl ,Form, FormLabel, Button} from "react-bootstrap";
import { Link, withRouter } from 'react-router-dom';
// import LoaderButton from "../Profile/LoaderButton";
import "../../App.css";
import 'bootstrap/dist/css/bootstrap.min.css';

import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registerUser } from "../../actions/authActions";
import classnames from "classnames";

class Signup extends Component {
  constructor() {
    super();
    this.state = {
      firstname: "",
      lastname: "",
      type: "",
      email: "",
      password: "",
      password2: "",
      errors: {}
    };
  }

  componentDidMount() {
    // If logged in and user navigates to Register page, should redirect them to dashboard
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }

  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    const newUser = {
      firstname: this.state.firstname,
      lastname: this.state.lastname,
      email: this.state.email,
      type: this.state.type,
      password: this.state.password,
      password2: this.state.password2
    };
    console.log(newUser);
    this.props.registerUser(newUser, this.props.history); 
  };

  render() {
    const { errors } = this.state;
    return (
      <div className="container">
      <div className="row">
        <div className="col s8 offset-s2">
          <Link to="/" className="btn-flat waves-effect">
            <i className="material-icons left">keyboard_backspace</i> Back to
            home
          </Link>
          <div className="col s12" style={{ paddingLeft: "11.250px" }}>
            <h4>
              <b>Register</b> below
            </h4>
            <p className="grey-text text-darken-1">
              Already have an account? <Link to="/login">Log in</Link>
            </p>
          </div>
      <Form noValidate onSubmit={this.onSubmit}>
        <FormGroup name="firstname" >
          <FormLabel htmlFor="firstname">First Name</FormLabel>
          <span className="red-text">{errors.firstname}</span>
          <FormControl
            onChange={this.onChange}
            value={this.state.firstname}
            error={errors.firstname}
            id="firstname"
            type="text"
            autoFocus
            className={classnames("", {
              invalid: errors.firstname
            })}
          />
        </FormGroup>
        <FormGroup name="lastname" >
          <FormLabel htmlFor="lastname">Last Name</FormLabel>
          <span className="red-text">{errors.lastname}</span>
          <FormControl
            onChange={this.onChange}
            value={this.state.lastname}
            error={errors.lastname}
            id="lastname"
            type="text"
            className={classnames("", {
              invalid: errors.lastname
            })}
          />
        </FormGroup>
        <FormGroup  >
          <FormLabel htmlFor="type">State</FormLabel>
          <span className="red-text">{errors.type}</span>
      <FormControl as="select"
      onChange={this.onChange}
      value={this.state.type}
      error={errors.type}
      id="type"
      type="type"
      className={classnames("", {
        invalid: errors.type
      })}>
        <option>Choose .. </option>
        <option>freelancer</option>
        <option>client</option>
      </FormControl>
        </FormGroup>
        <FormGroup name="email">
          <FormLabel htmlFor="email">Email</FormLabel>
          <span className="red-text">{errors.email}</span>
          <FormControl
           onChange={this.onChange}
           value={this.state.email}
           error={errors.email}
           id="email"
           type="email"
           className={classnames("", {
            invalid: errors.email
          })}
          />
        </FormGroup>
        <FormGroup name="password" >
          <FormLabel htmlFor="password">Password</FormLabel>
          <span className="red-text">{errors.password}</span>
          <FormControl
            onChange={this.onChange}
            value={this.state.password}
            error={errors.password}
            id="password"
            type="password"
            className={classnames("", {
              invalid: errors.password
            })}
          />
        </FormGroup>
        <FormGroup name="confirmPassword" >
          <FormLabel htmlFor="password2">Confirm Password</FormLabel>
          <span className="red-text">{errors.password2}</span>
          <FormControl
            onChange={this.onChange}
            value={this.state.password2}
            error={errors.password2}
            id="password2"
            type="password"
            className={classnames("", {
              invalid: errors.password2
            })}
          />
        </FormGroup>
        
      
        <Button
          block
          type="submit"
        
        >
          Signup
        </Button>
      </Form>
      </div>
        </div>
      </div>
    
    )}
}

Signup.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { registerUser }
)(withRouter(Signup));