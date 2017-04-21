import React from 'react';
import firebase from 'firebase';
import Addclase from './addClase';

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
            // console.log('el estado del usuario ha cambiado a: ', user.uid)
            if(user) {
                console.log('Usuario logueado correctamente:', user.email, 'con uid', user.uid)
                this.setState({ user, uid: user.uid })                
            } else {
                console.log('El componente FileUpload se ha montado sin usuario', this.state.user)
            }

        });        
    }

    handleAuth () {
        const provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(provider)
            .then(result => console.log(`${result.user.email} ha iniciado sesion`))
            .catch(error => console.log(`Error ${error.code}: ${error.message}`));
    }

    handleLogout () {        
        console.log('Has hecho clic en SALIR')
        firebase.auth().signOut()
            .then(result => console.log(`${result.user.email} ha salido`))
            .catch(error => console.log(`Error ${error.code}: ${error.message}`));
    }

    renderLoginButton () {
        // Si el usuario está logueado
        if (this.state.user !== null) {           
            return (
                <div>                
                    <img width="64" height="64" src={this.state.user.photoURL} alt={this.state.user.displayName}/>
                    <div>Hola {this.state.user.displayName}!</div>                    
                    <button onClick={this.handleLogout}>Salir</button>
                    <Addclase 
                        userIn={this.state.user}                         
                        uid={this.state.uid}
                        />
                    <FileUpload/>
                </div>
            );
        // Sino lo está
        } else {
            return <button onClick={this.handleAuth}>Login con Google</button>
        }
        
    }

    render () {
        // let usuario = firebase.auth().currentUser,
        // name,email,photoURL,uid;
        // if (usuario != null) {
        //     name = usuario.displayName;
        //     email = usuario.email;
        //     photoURL = usuario.photoURL;
        //     uid = usuario.uid
        // }
        // console.log(name, email, photoURL, uid);
        return <div className="App-intro">
                    { this.renderLoginButton() }
                </div>
    }
}

export default Login