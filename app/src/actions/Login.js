import React from 'react';
import firebase from 'firebase';

import FileUpload from '../components/FileUpload'

class Login extends React.Component {
    constructor() {
        super()
        this.state = {
            user: null                    
        };

        this.handleAuth = this.handleAuth.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
    }

    componentWillMount(){
        firebase.auth().onAuthStateChanged(user => {
            this.setState({ user })
        });        
    }

    handleAuth () {
        const provider = new firebase.auth.GoogleAuthProvider();

        firebase.auth().signInWithPopup(provider)
            .then(result => console.log(`${result.user.email} ha iniciado sesion`))
            .catch(error => console.log(`Error ${error.code}: ${error.message}`));
    }

    handleLogout () {
        firebase.auth().signOut()
            .then(result => console.log(`${result.user.email} ha salido`))
            .catch(error => console.log(`Error ${error.code}: ${error.message}`));
    }

    renderLoginButton () {
        // Si el usuario está logueado
        if (this.state.user) {
            return (
                <div>
                    <img width="64" height="64" src={this.state.user.photoURL} alt={this.state.user.displayName}/>
                    <div>Hola {this.state.user.displayName}!</div>
                    
                    <button onClick={this.handleLogout}>Salir</button>
                    <FileUpload/>
                </div>
            );
        } else {
            return <button onClick={this.handleAuth}>Login con Google</button>
        }
        // Sino lo está
    }

    render () {
        return <div className="App-intro">{ this.renderLoginButton() }</div>
    }
}

export default Login