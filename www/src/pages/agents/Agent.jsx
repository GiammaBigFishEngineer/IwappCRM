import React from 'react'

export const Agent = () => {

  return (
    <div className="p-2">
    <div className="row">
      <div className="col-4">

        <div className="card" style={{width:"18rem"}}>
          <ul className="list-group list-group-flush">
          <li className="list-group-item"><h4>Gianni D'amico</h4></li>
            <li className="list-group-item">Ruolo</li>
            <li className="list-group-item">Fatturato annuale</li>
            <li className="list-group-item">Cliente Assegnati</li>
            <li className="list-group-item">Progetti Assegnati</li>
          </ul>
          <div className="card-body">
            <a href="#" className="card-link">Assegna Progetto</a>
            <a href="#" className="card-link">Modifica Ruolo</a>
          </div>
        </div>
      </div>
      <div className="col">
      <input className="form-control mb-2" type="text" placeholder="Ricerca" aria-label="default input example"/>
      <div className="mb-2" style={{ height: "500px", overflow: "auto" }}>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">Progetto1</li>
          <li className="list-group-item">Progetto1</li>
          <li className="list-group-item">Progetto1</li>
          <li className="list-group-item">Progetto1</li>
          <li className="list-group-item">Progetto1</li>
        </ul>
      </div>
      </div>
    </div>

    

    </div>
  )
}
