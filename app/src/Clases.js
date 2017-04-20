import React from 'react'

class Clases extends React.Component {
    render () {
        let lista = this.props.data.map((item) => {
            return (
                <li key={item.id}>
                    <p>{item.actividad} el {item.hoy} a las {item.horaclase}</p>
                </li>
            )
        });
        return(
            <div>{lista}</div>
        )
    }
}
export default Clases