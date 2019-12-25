import React, { Component } from 'react'
import '../App.css';
// import { Link } from 'react-router-dom'
import axios from 'axios'
import Left from "./Left/LeftSide";
import Right from "./Right/RightSide";
// import Header from "./Header";



export default class ProjectList extends Component {
    state={
        data: [],
        current: {},
        flag: 'false'
      }

    componentDidMount = () =>{
        axios.get('/projects/all')
        .then(response => {
            console.log("here sta");
            
            console.log(response.data);
            
            this.setState({data: response.data})
            console.log("here end");
            console.log(this.state.data);
        }) 
        .catch((err) => {
            console.log(err);
        })
    }

    handleDetailsClick = project => {
        const url = `http://localhost:5001/projects/${project}`
        axios({
            method: 'GET',
            url: url
          }).then(response => {
            console.log('Hi')
            console.log(response) // take a look at what you get back!
            console.log('Hi')
            this.setState({ current: response.data})
          })

    }

    render() {
        return (
            
            <div className="champs">
                
        <Left project={this.state.data} detailsClick={this.handleDetailsClick}/>
            <Right  details={this.state.current} fun={this.handleDetailsClick}/>

            </div>
            
        )
    }
}


    // componentDidMount(){
    //     axios.get('http://localhost:5001/users/project')
    //     .then((res)=> {
    //       let tmparry = []
    //       for (let i = 0; i < 30; i++) {
    //         tmparry.push(res.data.manga[i])
    //       }
    //       this.setState({
    //         data : tmparry
    //         })
          
    //         console.log(res.data);
    //         console.log(this.state.data);
    //   })
    //   }


