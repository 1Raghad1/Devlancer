import React, { Component } from "react";
import storage from "./Firebase/index";

class UploadForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
          image: null,
          url: "",
          progress: 0
        };
        this.handleUpload = this.handleUpload.bind(this);
        this.handleChange = this.handleChange.bind(this);
      }
    
      handleChange = e => {
        if (e.target.files[0]) {
          const image = e.target.files[0];
          this.setState(() => ({ image }));
        }
      };
    
      handleUpload = () => {
        const { image } = this.state;
    
        
        const uploadTask = storage.ref(`images/${image.name}`).put(image);
        uploadTask.on(
          "state_changed",
          snapshot => {
            console.log(snapshot.state);
            
          },
          error => {
            // Error function ...
            console.log(error);
          },
          () => {
            // complete function ...
            storage
              .ref("images")
              .child(image.name)
              .getDownloadURL()
              .then(url => {
                this.setState({ url });
                console.log(url)
              });
              
          }
        );
      };
      render() {
        return (
           
          <div className="center">
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
              src={this.state.url }
              alt="Uploaded Images"
              height="300"
              width="400"
            />
          </div>
         
        );
      }
    }

export default  UploadForm;