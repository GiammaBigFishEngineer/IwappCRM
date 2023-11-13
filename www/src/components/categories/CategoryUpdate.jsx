import React, {useState, useEffect} from 'react'
import { SketchPicker } from 'react-color';
import {URL} from '../../index'


export const CategoryUpdate = ({item}) => {
    const [background, setBackground] = useState("#23f2");

    const handleChangeComplete = (color) => {
        setBackground(color.hex);
      };
    
    const [obj,setObj] = useState(item)
    const handleInputChange = (e) => {
        // copia l'oggetto JSON esistente nello stato
        const myObjectCopy = {...obj};
        // modifica il valore della proprietà "nome"
        myObjectCopy.nome_categoria = e.target.nome_categoria;       
        // aggiorna lo stato con il nuovo oggetto JSON
        setObj(myObjectCopy);
        console.log(e.target.nome_categoria);
      }

  return (
    <div>
    <form action={URL+'categoria'} method="post">
    <input type="hidden" value={item.id} name="id"/>
    <div className="modal-dialog">
        <div className="modal-content">
        <div className="modal-header">
            <h1 className="modal-title fs-5" id="exampleModalLabel">Modifica Categoria</h1>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div className="modal-body">
        <div className="input-group mb-3">
    <span className="input-group-text" id="basic-addon1">Nome Categoria</span>
    <input type="text" onChange={handleInputChange} value={obj.nome_categoria} name="nome_categoria" className="form-control" placeholder="Nome" aria-label="Username" aria-describedby="basic-addon1"/>
    </div>
    <SketchPicker
    color={ background }
    onChangeComplete={ handleChangeComplete }
    />
    <input
    type="hidden"
    name="colore"
    value={background}
    />
    
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
