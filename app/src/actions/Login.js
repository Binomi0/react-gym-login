import React from 'react';
import firebase from 'firebase';
import Userinfo from '../components/Userinfo'

class Login extends React.Component {
    constructor() {
        super()
        this.state = {
            uid: null,
            user: null,
            logged: false                    
        };
        this.handleAuth = this.handleAuth.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
        this.renderLoginButton = this.renderLoginButton.bind(this)
    }

    componentWillMount(){
        firebase.auth().onAuthStateChanged(user => {
            if(user) {
                console.log('Usuario logueado correctamente:', user.email, 'con uid', user.uid)
                this.setState({ user, uid: user.uid, logged: true })                
            } else {
                console.log('El componente FileUpload se ha montado sin usuario', this.state.user)
            }

        });        
    }

    handleAuth () {
        const provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(provider)
            .then(result => {
                this.setState({
                    logged: true
                })
                console.log(`${result.user.email} ha iniciado sesion`)

            })
            .catch(error => console.log(`Error ${error.code}: ${error.message}`));
    }

    handleLogout () {        
        console.log('Has hecho clic en SALIR')
        firebase.auth().signOut()
            .then(result => {                
                this.setState({
                    logged: false
                })
                console.log(`${result.user.email} ha salido`)
            })
            .catch(error => console.log(`Error ${error.code}: ${error.message}`));
        this.renderLoginButton();
    }

    renderLoginButton () {
        // Si el usuario está logueado
        if (this.state.logged) {  
            console.log('El usuario está logueado', this.state.logged)                    
            return <button className="button-logout" onClick={this.handleLogout}>Salir</button>    
        // Sino lo está
        } else {
            console.log('El usuario no está logueado', !this.state.logged)
            return <button className="button-login" onClick={this.handleAuth}>Login con Google</button>
        }
        
    }

    render () {
        console.log(this.state.logged)
        if (this.state.logged) {
            return (
                <div>
                    <Userinfo renderLoginButton={this.renderLoginButton}
                        user={this.state.user}
                        uid={this.state.uid}
                    />                    
                </div>   
            )
        } else {        
        return <div className="App-intro">
                    { this.renderLoginButton() }
                </div>
        }
    }
}

export default Login