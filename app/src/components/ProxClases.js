import React from 'react'

class ProxClases extends React.Component {
    render () {
        let { hoy } = this.props;
        switch (hoy) {
            case 0:
                hoy = "Domingo";
                break;
            case 1:
                hoy = "Lunes";
                break;
            case 2:
                hoy = "Martes";
                break;
            case 3:
                hoy = "Miercoles";
                break;
            case 4:
                hoy = "Jueves";
                break;
            case 5:
                hoy = "Viernes";
                break;
            case 6:
                hoy = "Sabado";
                break;
            default:
                hoy = "Esperando dia de la semana";
                break;
        }
        let clasesHoy = this.props.clasesHoy.map((item, i) => {
            return (
                <li key={i} className={item.estilo}>
                    <div><strong>{item.actividad} </strong> a las <strong>{item.horaclase}</strong></div>
                    <div className="duracion">{item.duracion}</div>
                    <div className="sala">{item.sala}</div>
                </li>
            )
        });
        let clasesManana = this.props.clasesManana.map((item, i) => {
            return (
                <li key={i} className={item.estilo}>
                    <div><strong>{item.actividad}</strong> el <strong>{item.hoy}</strong> a las <strong>{item.horaclase}</strong></div>
                    <div className="duracion">{item.duracion}</div>
                    <div className="sala">{item.sala}</div>
                </li>
            )
        });
        return(
            <div>
                <h2>Clases disponibles para las próximas 24h</h2>
                <ul className="clases-hoy">{clasesHoy}</ul>
                <hr/>
                <h2>Clases disponibles para Mañana</h2>
                <ul className="clases-manana">{clasesManana}</ul>
            </div>
        )
    }
}
export default ProxClases