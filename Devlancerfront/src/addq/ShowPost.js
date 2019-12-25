import React, { Component } from "react";
import axios from "axios";

 import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Card, Form ,Button} from "react-bootstrap";
class ShowPost extends Component {
  state = {
    data: "",
    loading: true,
    id: this.props.match.params.id,
    comment: "",
      comments:""
  };
  loadData = () => {
    return axios
      .get(`/posts/` + this.props.match.params.id)
      .then(res => {
        console.log(res);
        this.setState({
          data: res.data,
          loading: true
        });
      })
      .catch(error => {
        console.error("error: ", error);
      });
  };


  ChangeComment = event => {
    this.setState({ comment: event.target.value})
  };

onSubmit=(e)=>{
        e.preventDefault();
        const comment = {
             answer: this.state.comment,
      User_id: this.state.id,
         Post_id: this.props.match.params.id
        }
        axios.post('/comment/add',comment)
        .then(res => console.log(res.data)
        ).catch(err=>console.log(err)) 
        console.log(comment)
this.redirect()
    }
    redirect=()=>{
      window.location = `/post/${this.state.id}`
    }

  loadComment = () => {
   axios
      .get(`/comment/all`)
      .then(result => {
        console.log(result);
        this.setState({
          comments: result.data,
      loading: false,
        });
         console.log(this.state.comments);
      }).catch(error => {
        console.error("error: ", error);
      });
  };

   componentDidMount(){
this.loadData()
// this.loadComment()
   }
    render() {
      let Ans
if (this.state.loading === false) {  Ans = this.state.comments.map(item => 
 <div  key={item._id} className="ans">
   <div  style={{width:"700px",marginTop:"100px",marginBottom:"60px"}} className="ui card">
  <div  className="content">

    <div className="meta">
     
      <br/>
      
    </div>
    <div style={{float:"left"}} className="description">
      <p >
       {item.answer}
      </p> 
    
    </div> 
  </div>
  <div className="extra content">
  
    <div className="right floated author">
      <img className="ui avatar image" src="https://capenetworks.com/static/images/testimonials/user-icon.svg"/> mohammed
    </div>
       <i className="right floated like icon"></i>
    <i className="right floated star icon"></i>
  </div>

</div>

</div>

  ) 
}
    return (
      <div>

        <Card
          border="light"
          style={{
            marginLeft: "15%",
            width: "70rem",
            marginTop: "100px",
            height: "30rem",
            borderBottom: "none"
          }}
        >
          <Card.Header>
            <img
              className="ui avatar image"
              src="https://capenetworks.com/static/images/testimonials/user-icon.svg"
            />{" "}
            {this.state.data.User_name + " "} question :{" "}
          </Card.Header>
          <Card.Body>
            <Card.Title>
              <h3>{this.state.data.title}</h3>
            </Card.Title>
            <small className="text-muted">
              <p
                style={{
                  backgroundColor: "#e2e2e2",
                  color: "black",
                  width: "80px"
                }}
              >
                {this.state.data.tags + " "}
              </p>
            </small>
            <Card.Text as='div'>
              <br />
              <h5>{this.state.data.description}</h5>
            </Card.Text>
          </Card.Body>
          <Form style={{marginTop:"200px"}}>
            <Form.Group controlId="exampleForm.ControlTextarea1">
              <Form.Label>
                <h2>Your Answer</h2>
              </Form.Label>
              <Form.Control
                value={this.state.comment}
                onChange={this.ChangeComment}
                as="textarea"
                rows="6"
              />
              <Button onClick={this.onSubmit }> submit</Button>
            </Form.Group>
          </Form>
        </Card>
        {Ans}
  </div>
    );
  }
}
ShowPost.propTypes = {
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(
  mapStateToProps,
)(ShowPost);
