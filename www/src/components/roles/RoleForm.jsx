import React from 'react'
import {URL} from '../../index'


export const RoleForm = () => {
  return (
    <div>
        <form action={URL+'ruolo'} method="post">
        
        <div className="modal-dialog">
            <div className="modal-content">
            <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">Nuovo Ruolo</h1>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>            </div>
            <div className="modal-body">
        <div className="input-group mb-3">
        <span className="input-group-text" id="basic-addon1">Nome Ruolo</span>
        <input type="text" name="nome_ruolo" className="form-control" placeholder="Nome"/>
        </div>

        <div className="input-group mb-3">
        <span className="input-group-text" id="basic-addon2">Priorità</span>
        <select className="form-select" name="priorita">
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
        <option value="6">6</option>
        <option value="7">7</option>
        <option value="8">8</option>
        <option value="9">9</option>
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
