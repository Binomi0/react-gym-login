import React from 'react'
class ListaClases extends React.Component {
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
                return (
                        <li key={item.id} className={item.estilo}>
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
