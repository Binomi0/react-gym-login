import React from 'react'
import Addclase from '../actions/addClase'
import FileUpload from '../actions/FileUpload'

export default class Userinfo extends React.Component {
    render(){
        return (
            <div className="App-intro">
                { this.props.renderLoginButton() }           
                <img width="64" height="64" src={this.props.user.photoURL} alt={this.props.user.displayName}/>
                <div>Hola {this.props.user.displayName}!</div>   
                <Addclase 
                    userIn={this.props.user}                         
                    uid={this.props.uid}
                    />
                <FileUpload/>                    
            </div>
        )
    }
}