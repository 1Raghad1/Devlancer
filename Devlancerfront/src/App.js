import React, { Component } from "react";
import Nav from "./homePage/componts/nav";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Provider } from "react-redux";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";
import store from "./store";
// import Qpage from './addq/addq'
import ShowPost from './addq/ShowPost'
// import Up from "../src/addPost/UploadForm";
import HomePage from "./homePage/componts/homepage";
import addProject from "./addPost/addPost";
// import addProjectF from "./addPost/FAddprojet";
import FHome from "./freelancer/FHome";
// import addProject from './addPost/addPost'
// import Checkout from "./checkout/Checkout";
import FProfile from './Profiles/FProfile'
import CProfile from './Profiles/Cprofile'
// import axios from "axios";
import Qpage from "./addq/qPage";
import Chat from "./chat/Chat/Chat";
import Register from "./components/auth/Signup";
import Login from "./components/auth/Login";
import ChangePass from './components/auth/ChangePass'
import PrivateRoute from "./components/private-route/PrivateRoute";
// import Dashboard from "./components/dashboard/Dashboard";
import CHome from "./Client/CHome";
import Displayprojects from './project_list/ProjectList'
// Check for token to keep user logged in
if (localStorage.jwtToken) {
 // Set auth token header auth
 const token = localStorage.jwtToken;
 setAuthToken(token);
 // Decode token and get user info and exp
 const decoded = jwt_decode(token);
 // Set user and isAuthenticated
 store.dispatch(setCurrentUser(decoded));
 // Check for expired token
 const currentTime = Date.now() / 1000; // to get in milliseconds
 if (decoded.exp < currentTime) {
  // Logout user
  store.dispatch(logoutUser());
  // Redirect to login
  window.location.href = "./login";
 }
}
const currentuser = store.getState();
const type = currentuser.auth.user.type
export default class App extends Component {
 render() {
  return (
   <div>
    <Provider store={store}>
     {console.log(type)}
     <BrowserRouter>
      <div className="App">
       <Nav />
       <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/post" component={Qpage} />
        <Route exact path = '/post/:id' component ={ShowPost} />
        {/* <Route exact path="/" component={Landing} /> */}
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
         <Route path="/freelancer/:id" component={FProfile} />
         <Route path="/client/:id" component={CProfile} />
        {/* <PrivateRoute exact path="/checkout" component={Checkout} /> */}
        <PrivateRoute exact path="/post" component={Qpage} />
        <PrivateRoute exact path="/chat" component={Chat} />
         <PrivateRoute exact path="/changepass" component={ChangePass} />
        <PrivateRoute exact path="/projectlist" component={Displayprojects} />
        {type === "client" ? (
         <PrivateRoute path="/addProject/" component={addProject} />
        ) : (
         <PrivateRoute path="/addProject/" component={HomePage} />
        )}
        {type === "freelancer" ? (
         <PrivateRoute path="/dashboard/:id" component={FHome} />
        ) : (
         <PrivateRoute path="/dashboard/:id" component={CHome} />
        )}
        {/* <PrivateRoute exact path="/dashboard" component={Dashboard} /> */}
       </Switch>
      </div>
     </BrowserRouter>
    </Provider>
    {/* <Nav/> */}
   </div>
  );
 }
}