import React from 'react'
import {URL} from '../index'
import RenderList from '../utils/RenderList';


export const AgentForm = () => {
  const roles = RenderList(URL+'ruoli');
  
  return (
    <div>
        <form action={URL+'agente'} method="post">
        <div className="modal-dialog">
            <div className="modal-content">
            <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">Nuovo Agente</h1>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
            <div className="input-group mb-3">
        <span className="input-group-text" id="basic-addon1">Nome Cognome</span>
        <input type="text" name="fullname" className="form-control" id="exampleFormControlInput1" placeholder=""/>
        </div>

        <div className="input-group mb-3">
        <span className="input-group-text" id="basic-addon2">Email</span>
        <input type="email" className="form-control" name="email"/>
        </div>

        <div className="input-group mb-3">
        <span className="input-group-text" id="basic-addon2">Ruolo</span>
        <select className="form-select" name="ruolo" aria-label="Default select example">
          {roles.map(item=>(
          <option value={item.id}>{item.nome_ruolo}</option>            
          )
          )}
          </select>
        </div>

       
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="submit" className="btn btn-primary">Registra</button>
      </div>
    </div>
  </div>
  </form>
    </div>
  )
}
