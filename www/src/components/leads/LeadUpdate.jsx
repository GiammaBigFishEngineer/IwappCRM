import React, {useEffect, useState} from 'react'
import RenderList from '../../utils/RenderList';
import {URL} from '../../index'

export const LeadUpdate = ({item}) => {
    const agents = RenderList(URL+'agenti');
    const categories = RenderList(URL+'categorie');

    const [obj,setObj] = useState(item)
    useEffect(()=>{
        setObj(item);
    },[item])
    const handleInputChange = (e) => {
        // copia l'oggetto JSON esistente nello stato
        const myObjectCopy = {...obj};
        // modifica il valore della proprietà "nome"
        myObjectCopy.nome = e.target.nome;
        myObjectCopy.cognome = e.target.cognome;
        myObjectCopy.azienda = e.target.azienda;
        myObjectCopy.citta = e.target.citta;
        myObjectCopy.via = e.target.via;
        myObjectCopy.provincia = e.target.provincia;
        myObjectCopy.email = e.target.email;
        myObjectCopy.partita_iva = e.target.partita_iva;
        myObjectCopy.cellulare = e.target.cellulare;
        myObjectCopy.telefono_fisso = e.target.telefono_fisso;
        myObjectCopy.agente = e.target.agente;
        myObjectCopy.categoria = e.target.categoria;
        myObjectCopy.sitoweb = e.target.sitoweb;
        myObjectCopy.preferiti = e.target.preferiti;
       
        // aggiorna lo stato con il nuovo oggetto JSON
        setObj(myObjectCopy);
      }
    return (
      <div>
          <form action={URL+'cliente'} method="post">
            <input type="hidden" value={item.id} name="id"/>
          <div className="modal-dialog">
              <div className="modal-content">
              <div className="modal-header">
                  <h1 className="modal-title fs-5" id="exampleModalLabel">Modifica {item.cognome}</h1>
              </div>
              <div className="modal-body">
              <div className="input-group mb-3">
          <span className="input-group-text" id="basic-addon1">Nome Cognome</span>
          <input type="text" onChange={handleInputChange} value={obj.nome} name="nome" className="form-control" placeholder="nome" aria-label="Username" aria-describedby="basic-addon1"/>
          <input type="text" onChange={handleInputChange} value={obj.cognome} name="cognome" className="form-control" placeholder="cognome" aria-label="Username" aria-describedby="basic-addon1"/>
          </div>
  
          <div className="input-group mb-3">
          <span className="input-group-text" id="basic-addon2">Azienda</span>
          <input type="text" onChange={handleInputChange} value={obj.azienda} name="azienda" className="form-control" placeholder="azienda" aria-label="Recipient's username" aria-describedby="basic-addon2"/>
          </div>
          <div className="input-group mb-3">
          <span className="input-group-text" id="basic-addon2">Città</span>
          <input type="text" onChange={handleInputChange} value={obj.citta} name="citta" className="form-control" placeholder="azienda" aria-label="Recipient's username" aria-describedby="basic-addon2"/>
          </div>
  
          <div className="input-group mb-3">
          <span className="input-group-text" id="basic-addon2">Via Provincia</span>
          <input type="text" onChange={handleInputChange} value={obj.via} name="via" className="form-control" placeholder="via" aria-label="Recipient's username" aria-describedby="basic-addon2"/>
          <input type="text" onChange={handleInputChange} value={obj.provincia} name="provincia" className="form-control" placeholder="provincia" aria-label="Recipient's username" aria-describedby="basic-addon2"/>
          </div>
  
          <div className="input-group mb-3">
          <span className="input-group-text" id="basic-addon2">Email</span>
          <input type="email" onChange={handleInputChange} value={obj.email} name="email" className="form-control" placeholder="email" aria-label="Recipient's username" aria-describedby="basic-addon2"/>
          </div>
  
          <div className="input-group mb-3">
          <span className="input-group-text" id="basic-addon2">Partita IVA</span>
          <input type="text" onChange={handleInputChange} value={obj.partita_iva} name="partita_iva" className="form-control" placeholder="partita_iva" aria-label="Recipient's username" aria-describedby="basic-addon2"/>
          </div>
  
          <div className="input-group mb-3">
          <span className="input-group-text" id="basic-addon2">Cellulare/ Telefono Fisso</span>
          <input type="text" onChange={handleInputChange} value={obj.cellulare} name="cellulare" className="form-control" placeholder="cellulare" aria-label="Recipient's username" aria-describedby="basic-addon2"/>
          <input type="text" onChange={handleInputChange} value={obj.telefono_fisso} name="telefono_fisso" className="form-control" placeholder="telefono_fisso" aria-label="Recipient's username" aria-describedby="basic-addon2"/>
          </div>
  
          <div className="input-group mb-3">
          <span className="input-group-text" id="basic-addon2">Agente</span>
            <select className="form-select" onChange={handleInputChange} value={obj.agente} name="agente" aria-label="Default select example">
            {agents.map(item => (
              <option key={item.id} value={item.id}>{item.fullname}</option>
            ))}
            </select>
          </div>
  
          <div className="input-group mb-3">
          <span className="input-group-text" id="basic-addon2">Categoria</span>
          <select className="form-select" onChange={handleInputChange} value={obj.categoria} name="categoria" aria-label="Default select example">
          {categories.map(item => (
              <option key={item.id} value={item.id}>{item.nome_categoria}</option>
            ))}
            </select>
            </div>
  
          <div className="input-group mb-3">
          <label for="basic-url" className="form-label">URL</label>
          <div className="input-group">
              <span className="input-group-text" id="basic-addon3">Sito Web</span>
              <input type="text" onChange={handleInputChange} value={obj.sitoweb} name="sitoweb" className="form-control" id="basic-url" aria-describedby="basic-addon3"/>
          </div>
          </div>

          <div className="form-check">
              <input className="form-check-input" 
              type="checkbox" 
              checked={obj.preferiti}
              onChange={handleInputChange}
              value="1"
              name="preferiti" 
             /> 
              <label className="form-check-label">Preferiti</label>
            </div>  
  
          
        </div>
        <input type="hidden" name="referente" className="form-control" value="0" placeholder=""/>
        <input type="hidden" name="converted_date" className="form-control" value="0" placeholder=""/>
  
        <div className="modal-footer">
          <button type="submit" className="btn btn-primary">Salva</button>
        </div>
      </div>
    </div>
    
    </form>
      </div>
    )
}
