import React, {useState} from 'react'
import {URL} from '../../index'

export const FaseUpdate = ({item}) => {
    const [obj,setObj] = useState(item)
    const handleInputChange = (e) => {
        // copia l'oggetto JSON esistente nello stato
        const myObjectCopy = {...obj};
        // modifica il valore della proprietà "nome"
        myObjectCopy.nome_fase = e.target.nome_fase;       
        // aggiorna lo stato con il nuovo oggetto JSON
        setObj(myObjectCopy);
        console.log(e.target.nome_fase);
      }

  return (
    <div>
        <form action={URL+'fase'} method="post">
            <input type="hidden" value={item.id} name="id"/>
        <div className="modal-dialog">
            <div className="modal-content">
            <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">Modifica Fase</h1>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>            </div>
            <div className="modal-body">
            <div className="input-group mb-3">
        <span className="input-group-text" id="basic-addon1">Nome Fase</span>
        <input type="text" onChange={handleInputChange} value={obj.nome_fase} name="nome_fase" className="form-control" placeholder="Nome" aria-label="Username" aria-describedby="basic-addon1"/>
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
