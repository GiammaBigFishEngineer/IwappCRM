import React, {useState, useEffect} from 'react'
import { SketchPicker } from 'react-color';
import {URL} from '../../index'

export const CategoryForm = () => {

    const [background, setBackground] = useState("#23f2");

    const handleChangeComplete = (color) => {
        setBackground(color.hex);
      };
    
  return (
    <div>
        <form action={URL+'categoria'} method="post">
        <div className="modal-dialog">
            <div className="modal-content">
            <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">Nuova Categoria</h1>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
            <div className="input-group mb-3">
        <span className="input-group-text" id="basic-addon1">Nome Categoira</span>
        <input type="text" name="nome_categoria" className="form-control" placeholder="Nome" aria-label="Username" aria-describedby="basic-addon1"/>
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
