import React, { Component } from 'react';
import firebase from 'firebase'
import './App.css'
import './modal.css'
import FormClases from './components/FormClases'
import ProxClases from './components/ProxClases'
import data2 from './data2'
import Login from './actions/Login'
import AddClase from './actions/addClase'


class App extends Component {
    constructor(props) {
        super(props);
        let data = data2[0],
        fecha = new Date(),
        hoy = fecha.getDay(),
        manana = hoy+1,
        horas = parseInt(fecha.getHours(),10),
        minutos = parseInt(fecha.getMinutes(),10);
        if (manana === 7) {  manana = 2  }
        if (hoy === 6) { hoy = 1  }
        if (horas <10) { horas = '0'+horas}
        if (minutos <10) { minutos = '0'+minutos}
        this.state = {
            clase: [],
            data: data,
            hoy: hoy,
            manana: manana,
            hora: horas,
            minutos: minutos
        };
    }
    componentWillMount() {
        firebase.database().ref('clases').on('child_added', snapshot => {
            this.setState({
                clases: this.state.clase.concat(snapshot.val())
            })
        })
        console.log(this.state.clases)
    }
    

    componentDidMount(){
        setInterval(() => {
            this.setState({
                minutos: this.state.minutos - 1
            })
        },60000);
    }

    render() {
        // FILTRAR LA LISTA DESPLEGABLE
        let listaOpciones = ['Salsa Bachata Infantil','Ladies Noray Inicio', 'Baile Moderno Infantil', 'Cardio Fitness','TRX', 'Gap Streching', 'Body Concept', 'Boot Camp', 'Box Noray', 'FitBall', 'Karate Niños 1', 'Karate Niños 2', 'Karate Adultos' ,'Ninjutsu (Bujinkan)' ,'Salsa Inicio', 'Salsa Medio', 'SpinBike' ,'SpinBike Virtual','Zumba','Bachata Inicio', 'Bachata Medio', 'Bachata Avanzado', 'Coreográfico Estilo Chicas','Flamenco','L-Training','Sevillanas','Step Tono', 'Yoga', 'Pilates', ''],
        listaOrdenada = listaOpciones.sort(),
        horaActual = this.state.hora + ':' + this.state.minutos,

        // EXTRAER LAS CLASES DE HOY Y MAÑANA DE LA BASE DE DATOS
        clasesHoy = this.state.data[this.state.manana]
            .filter((item) => {
            if (item.horaclase > horaActual) { return item } else { return false }
            }),
        clasesManana = this.state.data[this.state.manana]
            .filter((item) => {
            if (item.horaclase < horaActual) { return item } else { return false }
            });

        // ORDENA LAS CLASES POR HORA
        let listHoy = clasesHoy,
            mappedHoy = listHoy.map(function (el, i) {
                return { index: i, value: el.horaclase }
            });
        mappedHoy.sort(function (a, b) {
            return +(a.value > b.value) || +(a.value === b.value) - 1
        });
        let resultHoy = mappedHoy.map(function (el) {
            return listHoy[el.index]
        }),
        list = clasesManana,
            mapped = list.map(function (el, i) {
                return { index: i, value: el.horaclase }
            });
        mapped.sort(function (a, b) {
            return +(a.value > b.value) || +(a.value === b.value) - 1
        });
        let result = mapped.map(function (el) {
            return list[el.index]
        });
        // FIN DE ORDENAR LAS CLASES POR HORA

        // PASAR LOS DATOS A LOS COMPONENETES VIA PROPS
        return (
            <div> 
                <Login />   
                <AddClase/>        
                <FormClases
                    clases={this.state.data}
                    listaOrdenada={listaOrdenada}
                />
                <hr/>
                <ProxClases
                    clasesHoy={resultHoy}
                    clasesManana={result}
                    hoy={this.state.hoy}
                />
             </div>
        );
    }
}
export default App;

