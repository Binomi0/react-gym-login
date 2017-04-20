import React from 'react'
import firebase from 'firebase'

class AddClase extends React.Component {
    constructor() {
        super()
        this.state = {
            clase: [],
            user: null
        }
    }

    componentWillMount() {
        firebase.auth().onAuthStateChanged(user => {
        this.setState({ user })
        });     
        console.log(this.state.user)    
    }

    componentDidMount() {
       
        if(!this.state.user) {
        firebase.database().ref('clases').on('child_added', snapshot => {
            this.setState({
                clase: this.state.clase.concat(snapshot.val())
            })
        })
        } else {
            console.log('No hay usuario logueado')
        }
    }

    handleAddClase (event) {
        event.preventDefault();
        let confirmar = confirm('¿Estas seguro?');
        //const miclase= this.refs.clase.value;
        if (confirmar) {firebase.database.enableLogging(true);

        const record = {
            clase: this.refs.clase.value            
        }
        
        const dbRef = firebase.database().ref('clases');
        const newClase = dbRef.push();
        newClase.set(record);
        console.log(record, dbRef, newClase)
    } else {
        
    }
    
    }

    renderMisclases() {
        if(this.state.user) {
            return (
            <div>
                <h2>Mis clases</h2>
                {
                    this.state.clase.map(clase => (
                        <div>
                        <p>Estoy apuntado en <span>{clase.clase}</span></p>                           
                        </div>
                    ))
                }  
                
                <hr/>
                <h3>Escribe una clase</h3>
                <form onSubmit={(event) => this.handleAddClase(event)}>
                    <input type="text" ref="clase" id="clase" required/>                    
                    <input type="submit" />
                </form>

                              
            </div>
        )
        } else {
            return <p>Accede para ver la lista de clases</p>
        }
    }

    render() {
        return <div>{ this.renderMisclases() }</div>
    }
}

export default AddClase