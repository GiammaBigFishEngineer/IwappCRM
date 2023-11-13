import React, {useState} from 'react'
import RenderList from '../../utils/RenderList';
import { URL } from '../../index';

export const ProjectUpdate = ({item}) => {
  var list = RenderList(URL+'trattative');
  const negotiations = list.map(({ negotiation }) => negotiation);
  const [obj,setObj] = useState(item)
    const handleInputChange = (e) => {
        // copia l'oggetto JSON esistente nello stato
        const myObjectCopy = {...obj};
        // modifica il valore della proprietà "nome"
        myObjectCopy.nome = e.target.nome;
        myObjectCopy.descrizione = e.target.descrizione;
        myObjectCopy.trattativa = e.target.trattativa;
        // aggiorna lo stato con il nuovo oggetto JSON
        setObj(myObjectCopy);
      }
  return (
    <div>
        <form action={URL+'crea_progetto'} method='post'>
           <input type="hidden" value={item.id} name="id" />
        <div className="modal-body">
        <div className="input-group mb-3">
        <span className="input-group-text">Nome Progetto</span>
        <input type="text" name="nome" onChange={handleInputChange} value={obj.nome} className="form-control"/>
        </div>
        <div className="input-group mb-3">
        <span className="input-group-text">Trattativa</span>
          <select className="form-select" onChange={handleInputChange} value={obj.trattativa} name="trattativa">
          {negotiations.map(obj => (
            <option key={obj.id} value={obj.id}>{obj.nome_trattativa}</option>
          ))}
          </select>
        </div>
        <div className="mb-3">
        <label class="form-label">Descrizione</label>
        <textarea type="text" name="descrizione" onChange={handleInputChange} value={obj.descrizione} className="form-control"/>
        </div>
        
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button type="submit" className="btn btn-primary">Crea</button>
          </div>
          </form>
    </div>
  )
}
