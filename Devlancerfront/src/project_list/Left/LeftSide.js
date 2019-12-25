import React, { Component } from 'react'
import {Card, Button} from 'react-bootstrap'
// import axios from 'axios'
import '../../App.css'
export default class LeftSide extends Component {
  constructor(props){
    super(props)
    // this.deleteExercise = this.deleteExercise.bind(this)
    this.state = {projects: this.props.project}
}
// componentDidMount(){
//     axios.get('http://localhost:5001/projects/all')
//     .then(response => {
//         console.log("here sta");
//         console.log(response.data);
//         this.setState({projects: response.data})
//         console.log("here end");
//         console.log(this.state.projects);
//     }) 
//     .catch((err) => {
//         console.log(err);
//     })
// }
// onButtonClickHandler = () => {
//   return this.props.project.map(project => {
//   return <th>
//   <Card style={{ width: '18rem', height: '18rm' }}>
//               <Card.Body>
//                 <Card.Title>{project.description}</Card.Title>
//     </Card.Body>
// </Card></th>})}
exerciseList() {
  console.log("hehewkf");
  console.log(this.props.project);
  return this.props.project.map(project => {
      console.log(project.title);
    return <Card key={project._id} style={{ padding: '15rm', height: '20rm',marginBottom:'50px',width:"10rm" }}>
            <Card.Body>
            <div className="thr"><Card.Title >{project.title}</Card.Title>
  <Card.Subtitle className="mb-2 text-muted">tags:{
    project.tags.map( tag => {return <span key={tag}>{tag}</span>})
  }</Card.Subtitle></div>
  <Button variant="primary" onClick={ ()=> this.props.detailsClick(project._id)} >Show</Button>
            </Card.Body>
          </Card> 
    // <tbody>
    //     <td>{project.title}</td> 
    //     <td>{project.description}</td>;
    // </tbody>
  })
}
    render() {
      return (
        <div>
            <br/>  
            <br/>  
            <br/>  
            <h1>Projects List: </h1>    
            <br/>    
            <div className="fixed">
            <div className="p-4 bg-light rounded shadow-md">
            <br/>
                    {this.exerciseList()}
                </div>
                </div>
        </div>
    )
    }
}