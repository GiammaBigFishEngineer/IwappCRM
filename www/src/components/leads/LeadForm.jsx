import React from 'react'
import RenderList from '../../utils/RenderList';
import {URL} from '../../index'

export const LeadForm = () => {
  const agents = RenderList(URL+'agenti');
  const categories = RenderList(URL+'categorie');
  return (
    <div>
        <form action={URL+'cliente'} method="post">
        <div className="modal-dialog">
            <div className="modal-content">
            <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">Nuovo Cliente</h1>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
            <div className="input-group mb-3">
        <span className="input-group-text" id="basic-addon1">Nome Cognome</span>
        <input type="text" name="nome" className="form-control" placeholder="nome" aria-label="Username" aria-describedby="basic-addon1"/>
        <input type="text" name="cognome" className="form-control" placeholder="cognome" aria-label="Username" aria-describedby="basic-addon1"/>
        </div>

        <div className="input-group mb-3">
        <span className="input-group-text" id="basic-addon2">Azienda</span>
        <input type="text" name="azienda" className="form-control" placeholder="azienda" aria-label="Recipient's username" aria-describedby="basic-addon2"/>
        </div>
        <div className="input-group mb-3">
        <span className="input-group-text" id="basic-addon2">Città</span>
        <input type="text" name="citta" className="form-control" placeholder="città" aria-label="Recipient's username" aria-describedby="basic-addon2"/>
        </div>

        <div className="input-group mb-3">
        <span className="input-group-text" id="basic-addon2">Via Provincia</span>
        <input type="text" name="via" className="form-control" placeholder="via" aria-label="Recipient's username" aria-describedby="basic-addon2"/>
        <input type="text" name="provincia" className="form-control" placeholder="provincia" aria-label="Recipient's username" aria-describedby="basic-addon2"/>
        </div>

        <div className="input-group mb-3">
        <span className="input-group-text" id="basic-addon2">Email</span>
        <input type="email" name="email" className="form-control" placeholder="email" aria-label="Recipient's username" aria-describedby="basic-addon2"/>
        </div>

        <div className="input-group mb-3">
        <span className="input-group-text" id="basic-addon2">Partita IVA</span>
        <input type="text" name="partita_iva" className="form-control" placeholder="partita_iva" aria-label="Recipient's username" aria-describedby="basic-addon2"/>
        </div>

        <div className="input-group mb-3">
        <span className="input-group-text" id="basic-addon2">Cellulare/ Telefono Fisso</span>
        <input type="text" name="cellulare" className="form-control" placeholder="cellulare" aria-label="Recipient's username" aria-describedby="basic-addon2"/>
        <input type="text" name="telefono_fisso" className="form-control" placeholder="telefono_fisso" aria-label="Recipient's username" aria-describedby="basic-addon2"/>
        </div>

        <div className="input-group mb-3">
        <span className="input-group-text" id="basic-addon2">Agente</span>
          <select className="form-select" name="agente" aria-label="Default select example">
          {agents.map(item => (
            <option key={item.id} value={item.id}>{item.fullname}</option>
          ))}
          </select>
        </div>

        <div className="input-group mb-3">
        <span className="input-group-text" id="basic-addon2">Categoria</span>
        <select className="form-select" name="categoria" aria-label="Default select example">
        <option value="0" selected>Seleziona categoria</option>
        {categories.map(item => (
            <option key={item.id} value={item.id}>{item.nome_categoria}</option>
          ))}
          </select>
          </div>

        <div className="input-group mb-3">
        <label for="basic-url" className="form-label">URL</label>
        <div className="input-group">
            <span className="input-group-text" id="basic-addon3">Sito Web</span>
            <input type="text" name="sitoweb" className="form-control" id="basic-url" aria-describedby="basic-addon3"/>
        </div>
        </div>

        <div className="form-check">
              <input className="form-check-input" 
              type="checkbox" 
              value="1"
              name="preferiti" 
             /> 
              <label className="form-check-label">Preferiti</label>
            </div> 

        
      </div>
      <input type="hidden" name="referente" className="form-control" value="0" placeholder=""/>
      <input type="hidden" name="converted_date" className="form-control" value="0" placeholder=""/>

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
