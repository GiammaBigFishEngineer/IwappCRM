import React, {useState} from 'react'
import {URL} from '../../index'


export const EventUpdate = ({neg_id,item}) => {

  const [obj,setObj] = useState(item);
  const handleInputChange = (e) => {
    // copia l'oggetto JSON esistente nello stato
    const myObjectCopy = {...obj};
    // modifica il valore della proprietà "nome"
    myObjectCopy.nome_evento = e.target.nome_evento;  
    myObjectCopy.tipologia = e.target.tipologia;  
    myObjectCopy.descrizione = e.target.descrizione;    
    // aggiorna lo stato con il nuovo oggetto JSON
    setObj(myObjectCopy);
    console.log(e.target.nome_evento);
  }
  return (
    <div>
        <form action={URL+'evento'} method="post">
          <input type="hidden" name="id" value={item.id}/>
        <div className="modal-dialog">
            <div className="modal-content">
            <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">Nuovo Evento</h1>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>            </div>
            <div className="modal-body">
          <div className="input-group mb-3">
        <span className="input-group-text" id="basic-addon1">Nome Evento</span>
        <input type="text" name="nome_evento" onChange={handleInputChange} value={obj.nome_evento} className="form-control" placeholder="Nome" aria-label="Username" aria-describedby="basic-addon1"/>
        </div>
        <div className="input-group mb-3">
        <span className="input-group-text" id="basic-addon2">Tipologia</span>
        <select className="form-select" onChange={handleInputChange} value={obj.tipologia} name="tipologia">
        <option value="1">Chiamata</option>
        <option value="2">Messaggio</option>
        <option value="3">Email</option>
        <option value="4">Appuntamento</option>
        </select>
        </div>

        <div className="input-group mb-3">
        <span className="input-group-text">Descrizione</span>
        <textarea className="form-control" onChange={handleInputChange} value={obj.descrizione} name="descrizione" aria-label="With textarea"></textarea>
        </div>
        <input type="hidden" value="0" name="referente"/>
        <input type="hidden" value={neg_id} name="trattativa"/>
        <input type="hidden" value="0" name="date_added"/>
        
        
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
