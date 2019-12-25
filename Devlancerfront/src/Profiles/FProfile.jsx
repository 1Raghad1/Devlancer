import React, { Component } from "react";
// import FTable from "../freelancer/FTable";
import { Card } from "react-bootstrap";
import axios from "axios";
import { Link } from "react-router-dom";
import store from "../../src/store";
import ChatBubbleOutlineIcon from "@material-ui/icons/ChatBubbleOutline";
const user = store.getState();
export default class CHome extends Component {
 state = {
  data: null,
  loading: false
 };
 componentDidMount() {
  axios
   .get("/projects/all")
   .then(res => {
    // console.log(res.data)
    this.setState({ data: res.data, loading: true });
   })
   .catch(err => {
    console.log(err);
   });
 }
 render() {
  let list;
  let i = 0;
  if (this.state.loading) {
   list = this.state.data.map(item => {
    //  console.log(item)
    i++;
    if (item.freelancer_ids.includes(this.props.match.params.id)) {
     console.log(item);
     return (
      <Card>
       <Card.Header>{item.title}</Card.Header>
       <Card.Body>
        <blockquote className="blockquote mb-0">
         <p>{item.description}</p>
         <footer className="blockquote-footer">
          {`${item.client_name},  ${item.staus}`}
         </footer>
        </blockquote>
       </Card.Body>
      </Card>
     );
    }
   });
  }
  return (
   <div>
    <div className="row py-5 px-4">
     {console.log(user)}
     <div className="bg-white shadow rounded overflow-hidden">
      <br />
      <div className="px-4 pt-0 pb-4 bg-dark">
       <div className="media align-items-end profile-header">
        <div className="profile mr-3">
         <br />
         <img
          src="https://elysator.com/wp-content/uploads/blank-profile-picture-973460_1280-e1523978675847.png"
          alt="..."
          width="130"
          class="rounded mb-2 img-thumbnail"
         />
         <a href="#" className="btn btn-dark btn-sm btn-block">
          Edit profile
         </a>
        </div>
        <div className="media-body mb-5 text-white">
         <h4 className="mt-0 mb-0">Israa Shuri</h4>
         <p className="small mb-4">
          {" "}
          <i class="fa fa-map-marker mr-2"></i>Makkah
         </p>
        </div>
       </div>
       <br />
       <div className="bg-light p-4 d-flex justify-content-end text-center">
        <div className="mr-auto">
         <Link to={`/chat?name=${store.getState().auth.user.name}&room=${this.props.match.params.id}`}>
          <ChatBubbleOutlineIcon fontSize="large" />
         </Link>
        </div>
        <ul className="list-inline mb-0">
         <li className="list-inline-item">
          <h5>241</h5> <i class="fa fa-file mr-1" />
          Project
         </li>
         <li className="list-inline-item">
          <h5>Rating</h5> <i class="fa fa-star mr-1" />
          <i className="fa fa-star mr-1" />
          <i className="fa fa-star-half-o mr-1" />
          <i className="fa fa-star-o mr-1" />
          <i className="fa fa-star-o mr-1" />
         </li>
        </ul>
       </div>
      </div>
      <div className="py-4 px-4">
       <div className="d-flex align-items-center justify-content-between mb-3">
        <h5 className="mb-0"> Recent Projects </h5>
        <a href="#" class="btn btn-link text-muted">
         Show all
        </a>
       </div>
       <div
        style={{
         display: "grid",
         gridTemplateColumns: "repeat(3, 1fr)",
         gridGap: 20,
         margin: "auto"
        }}
       ></div>
       {list}
      </div>
     </div>
    </div>
   </div>
  );
 }
}