import React, { Component } from 'react'
// import {Icon  } from 'semantic-ui-react';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import PersonIcon from '@material-ui/icons/Person';
import {Link} from 'react-router-dom'
import { Navbar,Nav} from 'react-bootstrap'
// import '/Users/sarakhaled/Desktop/SEI/projects/P4/frontend/src/homePage/homepage.css'
import '../homepage.css'
import store from '../../store';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import SettingsIcon from '@material-ui/icons/Settings';
// import Login from '../../components/auth/Login'
// import SignUP from '../../components/auth/Signup'
 class nav extends Component {
  state = {
  }
  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };
  handleItemClick = (e, { name }) => this.setState({ activeItem: name })
  render() {
    // const { user } = this.props.auth;
    const { activeItem } = this.state
    const currentuser = store.getState() 
    return (
        <div>
 {console.log(currentuser)}
        <Navbar className="nav">
  <Navbar.Brand href="/">   <img
        src="https://i.ibb.co/bg7wqS9/Screen-Shot-1441-04-18-at-1-09-22-AM.png"
        width="150px"
        height="50"
        className="d-inline-block align-top"
        alt="React Bootstrap logo"
      /></Navbar.Brand>
  {/* <Navbar.Toggle aria-controls="basic-navbar-nav" /> */}
 {currentuser.auth.isAuthenticated == true ? (
    <Nav className="ml-auto">
      {/* {console.log(store.getState())} */}
      <a  style={{marginRight:'100px'}} className ='navhref' href='/post'> Discussion </a>
      <Link style ={{padding:'10px'}}to={`/dashboard/${currentuser.auth.user.id}`} >  <PersonIcon style={{ color: 'black' }} fontSize='large'></PersonIcon> </Link>
      <Link style ={{padding:'10px'}} to={"/changepass"}> <SettingsIcon style ={{color:"black"}}fontSize ='large' /></Link>
      <button
              style={{
                background: "none",
                color: "inherit",
                border: "none",
                padding: "0",
                font: "inherit",
                cursor: "pointer",
                outline: "inherit",
                marginLeft:'20px',
                marginRight:'30px'
              }}
              onClick={this.onLogoutClick}
            >
             <ExitToAppIcon fontSize='large'></ExitToAppIcon>
            </button>
    </Nav>)
    :
(
  <Nav className="ml-auto">
      {/* {console.log(store.getState())} */}
      <a  style={{marginRight:'100px'}} className ='navhref' href='/post'> Discussion </a>
      <a className ='navhref' href='/login' >  Login </a>
      <a as ='a' className ='navhref' href  ='/register' >Register</a>
    </Nav>
)}
{/* {if(this.props.match.params.url)} */}
</Navbar>
      </div>
    )
  }
}
nav.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(
  mapStateToProps,
  { logoutUser }
)(nav);