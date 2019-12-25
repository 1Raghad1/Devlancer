import React, { Component } from 'react'
import {Modal,Button,Form} from 'react-bootstrap'
import ChipInput from "material-ui-chip-input";
 import store from '../store'
 import PropTypes from "prop-types";
import { connect } from "react-redux";
import axios from 'axios'
 class addq extends Component {
    constructor (props) {
    super(props)
    this.state = {
       show:false,
        setShow:false,
         Title: "",
      desc: "",
         chips: [],
  }
    }
onSubmit=(e)=>{
        e.preventDefault();
        const post = {
             title: this.state.Title,
      description: this.state.desc,
         tags: this.state.chips,
          User_id:this.props.auth.user.id,
       User_name:this.props.auth.user.name
        }
        axios.post('/posts/add',post)
        .then(res => console.log(res.data)
        ) 
        console.log(post)
this.redirect()
    }
    redirect=()=>{
      window.location = '/post'
    }

someFunc=()=>{
  this.redirect();
  this.onSubmit();
}
    setShow=(e)=>{
        this.setState({
show:e

        })
    }
handleDelete = (chip, index) => {
    if (this.state.chips.indexOf(chip) !== -1) {
      let tag = this.state.chips;
      tag.splice(index, 1);
      this.setState({ chips: tag });
    }
  };

  handleAddition = chip => {
    if (this.state.chips.indexOf(chip) == -1) {
      let tag = this.state.chips;
      tag.push(chip);
      this.setState({ chips: tag });
    }
  };

  ChangeTitle = event => {
    this.setState({ Title: event.target.value });
  };
  Changedes = event => {
    this.setState({ desc: event.target.value });
  };

    render() {
console.log(this.props);

      store.getState()
       const { chips } = this.state;
       let tag = this.state.chips.map(x => x + " ");
        return (
            < >
      <Button style= {{float:"right",marginTop:"30px"}} variant="light" onClick={() => this.setShow(true)}>
       
Ask Question
      </Button>

      <Modal
       show={ this.state.show}
        onHide={() => this.setShow(false) }
        dialogClassName="modal-90w"
        aria-labelledby="example-custom-modal-styling-title"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-custom-modal-styling-title">
            Ask a public question
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form.Label>Title</Form.Label>
            Be specific and imagine you’re asking a question to another person
          <Form.Control
            required
             value={this.state.Title}
                            onChange={this.ChangeTitle}
            type="text"
            placeholder="title"
          />
          <br/>
     <Form.Label>Body</Form.Label>
     <p>Include all the information someone would need to answer your question</p>
    <Form.Control value={this.state.desc}
                            onChange={this.Changedes} as="textarea" rows="10" />
    <h5>add tags to your question </h5>
    <ChipInput
                   
                    value={this.state.chips}
                    onAdd={this.handleAddition}
                    onDelete={(tag, index) => this.handleDelete(tag, index)}
                  />
                  <br/>
          <Button variant="dark" type="submit"  onClick={this.onSubmit} >
       
Submit your question
      </Button>
        </Modal.Body>
      </Modal>
    </>
        )
    }
}

addq.propTypes = {
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(
  mapStateToProps,
)(addq);
