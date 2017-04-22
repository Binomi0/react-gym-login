import React from 'react'
import firebase from 'firebase'

class ListaClases extends React.Component {   
    handleAddclase(value) {
        let confirmar = confirm(`¿Estas seguro de querer añadir la clase ${value}?`);
        //const miclase= this.refs.clase.value;
        if (confirmar) {
            //firebase.database.enableLogging(true);
            const record = {                
                clase: value                   
            } 

            const dbRef = firebase.database().ref('clases/' + this.props.uid);
            const newClase = dbRef.push();
            newClase.set(record);
            //console.log(newClase)

        } else {

        }
    }
    render(){
        let lista = {};
        for (let i = 1; i < 7 ; i++) {
            lista[i] = this.props.clases[i].filter((item) => {
                if (item.actividad === this.props.clase){
                    return item.actividad
                } return false
            })
        }
        let clasesFiltradas = {};
        for (let i = 1; i < 7; i++){
            clasesFiltradas[i] = lista[i].map((item) => {
                console.log(item)
                return (
                        <li key={item.id} onClick={(value) => this.handleAddclase(item.actividad)} className={item.estilo}>
                            <div>Los <strong>{item.hoy}</strong> a las <strong>{item.horaclase}</strong></div>
                            <div className="duracion">{item.duracion}</div>
                            <div className="sala">{item.sala}</div>
                        </li>
                    );
            })
        }
        return (
            <div className="titulo">
                <h2 className="entry-title">{this.props.clase}</h2>
                <ul className="lista-clase">{clasesFiltradas[1]}</ul>
                <ul className="lista-clase">{clasesFiltradas[2]}</ul>
                <ul className="lista-clase">{clasesFiltradas[3]}</ul>
                <ul className="lista-clase">{clasesFiltradas[4]}</ul>
                <ul className="lista-clase">{clasesFiltradas[5]}</ul>
                <ul className="lista-clase">{clasesFiltradas[6]}</ul>
            </div>
        )
    }
}

export default ListaClases
