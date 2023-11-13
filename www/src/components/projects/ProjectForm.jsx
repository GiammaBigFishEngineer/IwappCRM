import React from 'react'
import {URL} from '../../index'
import RenderList from '../../utils/RenderList';

export const ProjectForm = () => {
    var list = RenderList(URL+'trattative');
    const negotiations = list.map(({ negotiation }) => negotiation);
  return (
    <div>
        <form action={URL+'crea_progetto'} method='post' enctype="multipart/form-data">
           
        <div className="modal-body">
        <div className="input-group mb-3">
        <span className="input-group-text">Nome Progetto</span>
        <input type="text" name="nome" className="form-control"/>
        </div>
        <div className="input-group mb-3">
        <span className="input-group-text">Trattativa</span>
          <select className="form-select" name="trattativa">
          {negotiations.map(item => (
            <option key={item.id} value={item.id}>{item.nome_trattativa}</option>
          ))}
          </select>
        </div>
        <div className="mb-3">
        <label class="form-label">Descrizione</label>
        <textarea type="text" name="descrizione" className="form-control"/>
        </div>
        <input type="file" className='form-control mb-3' name="file[]"/>
        
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button type="submit" className="btn btn-primary">Crea</button>
          </div>
          </form>
    </div>
  )
}
