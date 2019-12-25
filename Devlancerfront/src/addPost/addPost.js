import React, { Component } from "react";
import {
  Container,
  Form,
  Row,
  Button,
  InputGroup,

} from "react-bootstrap";

import PropTypes from "prop-types";
import { connect , } from "react-redux";
import axios from 'axios'
import "./addProject.css";
import storage from "./Firebase/index";
import ChipInput from "material-ui-chip-input";
import Stepper from "react-js-stepper";

import ButterToast, { Cinnamon, POS_BOTTOM, POS_RIGHT ,POS_TOP,POS_CENTER  } from 'butter-toast';
const KeyCodes = {
  comma: 188,
  enter: 13
};
const delimiters = [KeyCodes.comma, KeyCodes.enter];
const content = "HI"
 
const steps = [
  { title: "Stage - 1" },
  { title: "Stage - 2" },
  { title: "Stage - 3" },
  { title: "Stage - 4" }
];
 class addPost extends Component {
  constructor(props) {
    super(props);

    this.state = {
      image: null,
      url: "",
      progress: 0,
      nxtSkils: false,
      activeStep: 1,
      Title: "",
      desc: "",
      paytype: 0,
      price: "",
      client_id:this.props.auth.user.id,
    
      chips: []
    };
    this.handleDelete = this.handleDelete.bind(this);
    this.handleAddition = this.handleAddition.bind(this);
     this.onSubmit = this.onSubmit.bind(this);
  }
  //axios 
onSubmit(e){
        e.preventDefault();
        const project = {
            title:this.state.Title,
            description:this.state.desc,
            price:this.state.price,
         type:this.state.paytype,
            pic:this.state.url,
            tags:this.state.chips,
            client_id:this.state.client_id,
            client_name:this.state.client_name,
        }
        axios.post('/projects/add',project)
        .then(res => console.log(res.data)
       
        
        ) 
        // console.log(project)

        // window.location = '/'
    }
    //for log user 

  //forStepper
  handleOnClickStepper = step => {
    this.setState({ activeStep: step });
  };

  handleOnClickNext = e => {
    let nextStep = this.state.activeStep + 1;
    this.setState({ activeStep: nextStep });
  };

  handleOnClickBack = () => {
    let prevStep = this.state.activeStep - 1;
    this.setState({ activeStep: prevStep });
  };
  //for notifcation 
  onClickMe=()=> {
    ButterToast.raise({
        content: <Cinnamon.Crisp scheme={Cinnamon.Crunch.SCHEME_GREEN }
            content={() => <div> YOUR PROJECT ADDED  </div>  }
            title="YOUR PROJECT ADDED" />
            
            
     } );
    
}

  //forTags
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
  //Forupload
  handleChange = e => {
    if (e.target.files[0]) {
      const image = e.target.files[0];
      this.setState(() => ({ image }));
    }
  };


      handleUpload = () => {
        const { image } = this.state;
    if(image!=null){
        const uploadTask = storage.ref(`images/${image.name}`).put(image);
        uploadTask.on(
          "state_changed",
          snapshot => {
            // console.log(snapshot.state);
          },
          error => {
            // Error function ...
            // console.log(error);
          },
          () => {
            // complete function ...
            storage
              .ref("images")
              .child(image.name)
              .getDownloadURL()
              .then(url => {
                this.setState({ url });
                console.log(url);
              });
          }
        );
      }else 
      {
        ButterToast.raise({
          content: <Cinnamon.Crisp scheme={Cinnamon.Crunch.SCHEME_RED }
              content={() => <div> Please chose a file </div>  }
              title="Error" />
              
              
       } );
      }
    }
  //onchange
readirct=()=>{
   window.location = '/'
}
  ChangeTitle = event => {
    this.setState({ Title: event.target.value });
  };
  Changedes = event => {
    this.setState({ desc: event.target.value });
  };
  ChangePrice = event => {
    this.setState({ price: event.target.value });
  };
  Changepaytype = e => {
    this.setState({
      paytype: e.target.value
    });
  };
  render() {
    const firstStep = "Next"
    const lastStep = "Finsh"
    const { chips } = this.state;
let tag = this.state.chips.map(x => x + " ");
// console.log(this.props.auth.user.id);
// console.log(this.state);

    return (
     
      <div>
          <React.Fragment >
            <Stepper
              steps={steps}
              activeStep={this.state.activeStep}
              onSelect={this.handleOnClickStepper}
              showNumber={false}
            />

            <div style={{ marginTop: "40px" }} >
              {this.state.activeStep === 1 ? (
                <div>
                  <div>
                    <Container>
                      <Form>
                        <Form.Group name="exampleForm.ControlInput1">
                          <Form.Label>
                            <h1 className="classh1">
                              Choose a name for your project
                            </h1>
                          </Form.Label>
                          <Form.Control
                            value={this.state.Title}
                            onChange={this.ChangeTitle}
                            type="text"
                          />
                        </Form.Group>

                        <Form.Group name="exampleForm.ControlTextarea1">
                          <Form.Label>
                            <h2>Tell us more about your project</h2>Start with a
                            bit about yourself or your business, and include an
                            overview of what you need done.{" "}
                          </Form.Label>
                          <Form.Control
                            value={this.state.desc}
                            onChange={this.Changedes}
                            as="textarea"
                            rows="6"
                          />
                        </Form.Group>
                      </Form>
                      <div className="center">
                        <div className="file-field input-field">
                          <div className="btn">
                            <span>File</span>
                            <input type="file" onChange={this.handleChange} />
                          </div>
                          {console.log(this.props.auth.user.id)}
                        </div>
                        <button
                          onClick={this.handleUpload}
                          className="waves-effect waves-light btn"
                        >
                          Upload
                        </button>
                        <img
                          src={this.state.url}
                          alt="Uploaded Images"
                          height="300"
                          width="400"
                        />
                      </div>
                    </Container>
                  </div>{" "}
                </div>
              ) : this.state.activeStep === 2 ? (
                <div>
                <center>
                  <h1 className="classh1">What skills are required?</h1>
                  Enter up to 3 skills that best describe your project.
                  Freelancers will use these skills to find projects they are
                  most interested and experienced in. What skills are required?
                  </center>
                  <center><ChipInput
                    style={{ marginTop: "20px" }}
                    value={this.state.chips}
                    onAdd={this.handleAddition}
                    onDelete={(tag, index) => this.handleDelete(tag, index)}
                  /></center>
                </div>
              ) : this.state.activeStep === 3 ? (
                <div>
                  <div className="container1">
                    <form className="form cf">
                      <section className="plan cf">
                        <h1 className="classh1">How do you want to pay?</h1>
                        <Row style={{ marginTop: "10%", marginLeft: "25%" }}>
                         <div>
                          <input
                            type="radio"
                            name="radio1"
                            id="free"
                            value="fixed"
                       onChange={this.Changepaytype}
                         checked={this.state.paytype === 'fixed'}
                          />
                          <label
                            style={{ width: "50%" }}
                            className="free-label four col"
                            htmlFor="free"
                          >
                           
                            <h2 >Pay fixed price</h2>{" "}
                            <p>
                              Agree on a price and release payment when the job
                              is done. Best for one-off tasks.
                            </p>{" "}
                          </label>
                          <input
                            type="radio"
                            name="radio2"
                            id="basic"
                            value="byHour"
                            checked={this.state.paytype === 'byHour'}
                            onChange={this.Changepaytype}
                         />
                          <label className="basic-label four col" htmlFor="basic">
                            <h2>Pay by the hour</h2>
                            <p>
                              Hire based on an hourly rate and pay for hours
                              billed. Best for ongoing work.
                            </p>
                          </label>
                          </div>
                        </Row>
                      </section>
                    </form>

                    <InputGroup className="mb-3"  style={{ marginLeft: "40%"}}>
                      <InputGroup.Append>
                        <InputGroup.Text
                       
                          value={this.state.price}
                          onChange={this.ChangePrice}
                          type="text"
                        >
                          $
                        </InputGroup.Text>
                      </InputGroup.Append>
                      <Form>
                        <Form.Control
                          value={this.state.price}
                          onChange={this.ChangePrice}
                          type="text"
                          // aria-label="Amount (to the nearest dollar)"
                        />
                      </Form>
                    </InputGroup>
                  </div>
                </div>
              ) : (
              <div>

          <div className="card mb-3" className="box" style={{Width: "30%"}}>
  <div className="row no-gutters">
    <div className="col-md-4">
  <img src={this.state.url} className="card-img" alt="..."/>
    </div>
    <div className="col-md-8">
      <div className="card-body">
        <h5 className="card-title"> {this.state.Title}</h5>
        <p className="card-text"> {this.state.desc}</p>
        <p>{this.state.price}</p>
        <p className="card-text"><small className="text-muted">{tag}</small></p>
      </div>
    </div>
  </div>
</div>
</div>  
              )}
            </div>
            <div style={{ marginTop: "40px", marginLeft: "25%" }}>
              <Button
                variant="success"
                style={{ marginLeft: "40px", width: "20%" }}
                value={
                  this.state.activeStep === steps.length ? "Finish" : "Next"
                }
                type={
                  this.state.activeStep === steps.length ? "submit" : "Next"
                }
                onClick= { this.state.activeStep === steps.length
                    ? this.onSubmit 
                    : this.handleOnClickNext 
              
                  }  >
                
             
                {" "}
              {  this.state.activeStep === steps.length
                ? `Finish`
                    : `Next`  }
              </Button>
              
              {this.state.activeStep === 1  ? (
                ""
              ) : this.state.activeStep === 2 || this.state.activeStep === 3 ?  (
                <Button
                  variant="outline-success"
                  style={{ marginLeft: "40px", width: "20%" }}
                  value="Back"
                  onClick={this.handleOnClickBack}
                >
                  {" "}
                  Back
                </Button>  
              ): " "}
               
            </div>
    
           <ButterToast position={{vertical: POS_TOP,  horizontal: POS_CENTER}} style={{ top: '50px' }}/>
          </React.Fragment>
       {console.log(this.state.client_id)}
        {/* </Container> */}
      </div>
  
    );
  }
}
addPost.propTypes = {
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(
  mapStateToProps,
)(addPost);
