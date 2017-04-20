import React from 'react'
import firebase from 'firebase'

class AddClase extends React.Component {
    constructor() {
        super()
        this.state = {
            clase: []
        }
    }

    componentWillMount() {
        firebase.database().ref('clases').on('child_added', snapshot => {
            this.setState({
                clase: this.state.clase.concat(snapshot.val())
            })
        })
    }

    handleAddClase (event) {
        event.preventDefault();
        //const miclase= this.refs.clase.value;
        firebase.database.enableLogging(true);

        const record = {
            clase: this.refs.clase.value            
        }
        
        const dbRef = firebase.database().ref('clases');
        const newClase = dbRef.push();
        newClase.set(record);
        console.log(record, dbRef, newClase)
    }


    render() {
        return (
            <div>
                <h2>Mis clases</h2>
                <p>Estoy apuntado en {this.props.misClases}</p>
                <hr/>
                <h3>Escribe una clase</h3>
                <form onSubmit={(event) => this.handleAddClase(event)}>
                    <input type="text" ref="clase" id="clase" required/>                    
                    <input type="submit" />
                </form>

                {
                    this.state.clase.map(clase => (
                        <div>
                            <p>{clase.clase}</p>                           
                        </div>
                    ))
                }                
            </div>
        )
    }
}

export default AddClase