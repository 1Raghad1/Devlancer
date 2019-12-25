import React, { Component } from 'react'
import {Button} from 'react-bootstrap'
import axios from 'axios'
import store from '../.././store'
// import ButterToast, { Cinnamon, POS_BOTTOM, POS_RIGHT ,POS_TOP,POS_CENTER  } from 'butter-toast';
export default class RightSide extends Component {
    applyhundler = () => {
        const st = store.getState()
        console.log(st.auth.user.id);
            const url = `/projects/${this.props.details._id}/addfreelancer/${st.auth.user.id}`
       //${this.props.details._id}/addfreelancer/${st.auth.user.id}
        axios({
            method: 'POST',
            url: url
          }).then(response => {
            console.log(response);
          })
    }
    render() {
        const st = store.getState()
        console.log(st);
        console.log(st.auth.user.id);
        // console.log("ptp");
        // console.log(this.props);
        let x = st.auth.user.type === "freelancer" ?
        <center><Button onClick={this.applyhundler}> Apply ...</Button></center>
        : <p></p>
        let d = this.props.details.price > 0 ?
        <div className="right-detail">
            <figure className="film-backdrop">
                    <h1>{this.props.details.title}</h1>
                    <h2>{this.props.details.description}</h2>
                    <img src={this.props.details.pic} /><br/>
                    <br/>
                    {x}
                    <br/>
            </figure>
        </div>          
: <div className="right-detail">
                    No Project selected
            </div>
        return (
            <div className="champs-detail">
                <br/><br/><br/><br/><br/><br/><br/>
        <h1>Details:</h1>
        <br/>
                {d}
            </div>
        )
    }
}