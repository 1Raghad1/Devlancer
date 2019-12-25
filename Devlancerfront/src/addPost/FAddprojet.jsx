import React, { Component } from "react";
import {
  Container,
  Form,
  Row,
  Button,
  InputGroup,
  Card
} from "react-bootstrap";
import axios from 'axios'
import "./addProject.css";
import storage from "./Firebase/index";
import ChipInput from "material-ui-chip-input";
import Stepper from "react-js-stepper";
import { useToasts } from 'react-toast-notifications'
import store from '../store';
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
  { title: "Stage - 3" }
];
class FAddprojet extends Component {
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
      type: 0,
      price: "",
    user:store.getState(),
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
      }
        axios.post('http://localhost:5001/projects/add',project)
        .then(res => console.log(res.data)
     
        
        ) 
        console.log(project)

        window.location = `/dashbored/${this.state.user.auth.user.id}`
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
            content={() => <div> YOUR PROJECT ADDED {window.location = `/`}  </div>  }
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
  Changepaytype = event => {
    this.setState({ paytype: event.target.value });
  };
  render() {
    const firstStep = "Next"
    const lastStep = "Finsh"
    const { chips } = this.state;
let tag = this.state.chips.map(x => x + " ");

    return (
      <div>
      <Container>
        {  console.log(store.getState())}
        {/* <Container className="addP"> */}
          <React.Fragment >
            <Stepper
              steps={steps}
              activeStep={this.state.activeStep}
              onSelect={this.handleOnClickStepper}
              showNumber={false}
            />

            <div className="addP" style={{ marginTop: "40px" }}>
              {this.state.activeStep === 1 ? (
                <div className="addP">
                  {" "}
                  <div className="addP">
                    {/* <Container> */}
                      <Form>
                        <Form.Group controlId="exampleForm.ControlInput1">
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

                        <Form.Group controlId="exampleForm.ControlTextarea1">
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
                      <div className="addP">
                        <div className="file-field input-field">
                          <div className="btn">
                            <span>File</span>
                            <input type="file" onChange={this.handleChange} />
                          </div>
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
                    {/* </Container> */}
                  </div>{" "}
                </div>
              ) : this.state.activeStep === 2 ? (
                <div>
                  <h1 className="addP" >What skills are required?</h1>
                  Enter up to 3 skills that best describe your project.
                  Freelancers will use these skills to find projects they are
                  most interested and experienced in. What skills are required?
                  <ChipInput
                    style={{ marginTop: "20px" , float:"left"}}
                    value={this.state.chips}
                    onAdd={this.handleAddition}
                    onDelete={(tag, index) => this.handleDelete(tag, index)}
                  />
                </div>
              )  : (
              <div>

          <div class="card mb-3" className="box" style={{Width: "30%"}}>
  <div class="row no-gutters">
    <div class="col-md-4">
  <img src={this.state.url} class="card-img" alt="..."/>
    </div>
    <div class="col-md-8">
      <div class="card-body">
        <h5 class="card-title"> {this.state.Title}</h5>
        <p class="card-text"> {this.state.desc}
        <p>{this.state.price}</p></p>
        <p class="card-text"><small class="text-muted">{tag}</small></p>
      </div>
    </div>
  </div>
</div>
</div>  
              )}
            </div>
            <div style={{  marginLeft: "25%" }}>
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
                    ? this.onSubmit && this.onClickMe 
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
        {/* </Container> */}
        </Container>
      </div>
    );
  }
}

export default FAddprojet 
