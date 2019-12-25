import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
 FormGroup,
 FormControl,
 Form,
 FormLabel,
 Button
} from "react-bootstrap";
import { loginUser } from "../../actions/authActions";
import classnames from "classnames";
import store from "../../store";
import axios from "axios";
const user = store.getState();
export default class ChangePass extends Component {
 constructor() {
  super();
  this.state = {
   old: "",
   new1: "",
   new2: "",
   errors: {}
  };
 }
 componentDidMount() {}
 componentWillReceiveProps(nextProps) {}
 onChange = e => {
  this.setState({ [e.target.id]: e.target.value });
 };
 onSubmit = e => {
  e.preventDefault();
  console.log("on submit state", this.state);
  var obj = {
   password: this.state.new1
  };
  let token = localStorage.jwtToken;
  token = token.slice(7)
  console.log(token)
//    token =JSON.parse(token)
const st = store.getState()
  axios
   .put(`http://localhost:5001/users/changepass/${this.state.new1}/${st.auth.user.id}`, obj)
   .then(res => {
    console.log(res.data);
    localStorage.removeItem("usertoken");
   });
  this.props.history.push("/");
 };
 render() {
  const { errors } = this.state;
  return (
   <div className="container">
    <div style={{ marginTop: "4rem" }} className="row">
     <div className="col s8 offset-s2">
      <Link to="/" className="btn-flat waves-effect">
       <i className="material-icons left">keyboard_backspace</i> Back to home
      </Link>
      <div className="col s12" style={{ paddingLeft: "11.250px" }}>
       <h4>
        <b>Change Password</b> below
       </h4>
      </div>
      <Form noValidate onSubmit={this.onSubmit}>
       <FormGroup name="password">
        <FormLabel>Old Password</FormLabel>
        <span className="red-text"></span>
        <FormControl
         onChange={this.onChange}
         value={this.state.old}
         error={errors.old}
         id="old"
         type="password"
         className={classnames("", {
          invalid: errors.password
         })}
        />
       </FormGroup>
       <FormGroup name="confirmPassword">
        <FormLabel>New Password</FormLabel>
        <span className="red-text"></span>
        <FormControl
         onChange={this.onChange}
         value={this.state.new1}
         id="new1"
         type="password"
         className={classnames("", {
          invalid: errors.new1
         })}
        />
       </FormGroup>
       <FormGroup>
        <FormLabel>Confirm Password</FormLabel>
        <FormControl
         onChange={this.onChange}
         value={this.state.password}
         id="new2"
         type="password"
        />
       </FormGroup>
       <div className="col s12" style={{ paddingLeft: "11.250px" }}>
        <Button
         style={{
          width: "150px",
          borderRadius: "3px",
          letterSpacing: "1.5px",
          marginTop: "1rem"
         }}
         type="submit"
         className="btn btn-large waves-effect waves-light hoverable blue accent-3"
        >
         Submit
        </Button>
       </div>
      </Form>
     </div>
    </div>
   </div>
  );
 }
}



