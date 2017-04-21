import React from 'react'
import firebase from 'firebase'

class AddClase extends React.Component {
    constructor(props) {
        super(props)
        //console.log(`¿Usuario verificado en ADDCLASE?: ${this.props.userIn.emailVerified} ${this.props.uid}`)
        this.state = {
            clase: [],
            uid: this.props.uid,
            user: this.props.uid !== null,
            entrada: null,
            cierto: this.props.userIn.emailVerified === true
        }
    }
    componentDidMount() {       
        if(this.state.user) {
        firebase.database().ref('clases/' + this.props.uid).on('child_added', snapshot => {
            this.setState({
                clase: this.state.clase.concat(snapshot.val())
            })
        })
        } else {
            //console.log('No hay usuario logueado')
        }
    }

    handleAddClase (e) {
        e.preventDefault();
        let confirmar = confirm(`¿Estas seguro de querer añadir la clase ${this.refs.clase.value}?`);
        //const miclase= this.refs.clase.value;
        if (confirmar) {
            //firebase.database.enableLogging(true);
            const record = {
                prueba: "prueba",
                clase: this.refs.clase.value,
                entrada: this.state.entrada + 1,
                cierto: this.state.cierto         
            } 
        const dbRef = firebase.database().ref('clases/' + this.state.uid);
        const newClase = dbRef.push();
        newClase.set(record);
        //console.log(newClase)
    } else {

    }
    
    }

    renderMisclases() {
        console.log(this.state.clase)
        if (this.state.uid) {
            return (
                <div>
                    <h2>Mis clases</h2>
                    {
                        this.state.clase.map((clase, i) => (
                            <div key={i}>
                            <p>Estoy apuntado en <span>{clase.clase}</span></p>                           
                            </div>
                    ))
                }                 
                    <hr/>
                    <h3>Escribe una clase</h3>
                    <form onSubmit={(e) => this.handleAddClase(e)}>
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