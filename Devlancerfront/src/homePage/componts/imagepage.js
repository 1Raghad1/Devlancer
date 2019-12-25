import React, { Component } from 'react'
// import {
//   BrowserRouter ,
//   Switch,
//   Route,
//   Link
// } from "react-router-dom";
import { Spring } from 'react-spring/renderprops'
import addProject from '../../addPost/addPost'
import {Image, Container,Button} from 'react-bootstrap'
import '../homepage.css'
// import '/Users/sarakhaled/Desktop/SEI/projects/P4/frontend/src/homePage/homepage.css'
export default class imagepage extends Component {
  render() {
    return (
      <div>
      {/* <Container> */}
        <Image  className ='view' src='https://cdn.pixabay.com/photo/2017/08/10/08/28/mac-2619994_960_720.jpg' />

<Spring
  from={{ opacity: 0 }}
  to={{ opacity: 1 }}>
  {props => <div  className="btnhome" style={props}>
  <h1 style={{fontSize:"40px" }} >
<strong>
Hire expert freelancers for any job, online<br/></strong></h1>
<p >Millions of small businesses use Freelancer to turn their ideas into reality.</p>
  <Button style={{  width: "150px"}} variant="success"  size="lg" href='/addProject'> Hire</Button>
<Button style={{width: "150px"}} variant="outline-success"  size="lg" href='/projectlist' >Work</Button>
  </div>
  
  }
</Spring>

        {/* </Container> */}
        {/* <BrowserRouter>
        <Switch>
          
        <Route exact path='/addProject' component={addProject} />
        </Switch>
        </BrowserRouter> */}
      </div>
    )
  }
}
