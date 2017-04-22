import React, { Component } from 'react';
import firebase from 'firebase'

class FileUpload extends Component {
    constructor() {
        super();
        this.state = {
            uploadValue: 0,
            picture: null
        }
        this.handleUpload = this.handleUpload.bind(this);
    }

    handleUpload (event) {
        const file = event.target.files[0];
        const storageRef = firebase.storage().ref(`/fotos/${file.name}`);
        const task = storageRef.put(file);
        console.log(storageRef.location.path)

        task.on('state_changed', snapshot => {
            let percentage = (snapshot.bytesTransfered / snapshot.totalBytes) * 100;
            this.setState({
                uploadValue: percentage
            })
        }, error => {
            console.log(error.message)
        }, () => {
            this.setState({
                uploadValue: 100,
                picture: task.snapshot.downloadURL
            });
            console.log(`La imagen subida es ${this.state.picture}`)
        });
        
    }

    render () {
        return (
            <div>                
                <h3>Sube una imagen</h3>                
                <progress value={this.state.uploadValue} max="100"></progress>  
                <br />
                <input type="file" onChange={this.handleUpload}/>
                <br />
                <img src={this.state.picture} width="320" alt=""/>            
            </div>
        )
    }
}

export default FileUpload