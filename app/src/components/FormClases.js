import React from 'react'
import ListaClases from './ListaClases'

class FormClases extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            clase: '',
            clases: props.clases[1],
            lista: props.listaOrdenada,            
        }
    }
    selectUpdate() {
        let clase = this.refs.selectClases.value;
        this.setState({ clase });
    }

    render() {
        let actividades = {};
        for (let i = 0; i < this.state.lista.length; i++) {
            actividades = this.state.lista.map((item, index) => {
                return <option key={index} value={item}>{item}</option>
            })
        }
        return (
            <div className="app-clases">
                <form onChange={this.selectUpdate.bind(this)}>
                    <div className="app-header">
                        <h2>Horario de Clases </h2>
                        <select ref="selectClases" placeholder="Dentro de mí escondo las clases colectivas... shhh ">
                            {actividades}</select>
                    </div>
                </form>
                <ListaClases clase={this.state.clase} clases={this.props.clases} />
            </div>

        )
    }
}
export default FormClases