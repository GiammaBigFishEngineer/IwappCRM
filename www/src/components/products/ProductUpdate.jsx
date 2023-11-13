import React, {useState} from 'react'
import {URL} from '../../index'

export const ProductUpdate = ({item}) => {
    const [obj,setObj] = useState(item)
    const handleInputChange = (e) => {
        // copia l'oggetto JSON esistente nello stato
        const myObjectCopy = {...obj};
        // modifica il valore della proprietà "nome"
        myObjectCopy.nome_prodotto = e.target.nome_prodotto; 
        myObjectCopy.prezzo = e.target.prezzo; 
        myObjectCopy.stock = e.target.stock;       
        // aggiorna lo stato con il nuovo oggetto JSON
        setObj(myObjectCopy);
        console.log(e.target.nome_prodotto);
      }

      function checkInput(event) {
        const input = event.target;
        const isValid = input.checkValidity();
        const errorEl = document.getElementById("error-msg");
      
        if (!isValid) {
          input.classNameList.add("invalid");
          errorEl.style.display = "block";
        } else {
          input.classNameList.remove("invalid");
          errorEl.style.display = "none";
        }
      }

  return (
    <div>
        <form action={URL+'prodotto'} method="post">
        <input type="hidden" value={item.id} name="id"/>
        <div className="modal-dialog">
            <div className="modal-content">
            <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">Modifica Prodotto</h1>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
            <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">Nome Prodotto</span>
            <input type="text" onChange={handleInputChange} value={obj.nome_prodotto} name="nome_prodotto" className="form-control" placeholder="Prodotto" aria-label="Username" aria-describedby="basic-addon1"/>
            </div>
            <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">Prezzo</span>
            <input type="number" onChange={handleInputChange} value={obj.prezzo} step="0.01" onInput={(e)=>{checkInput(e)}} name="prezzo" className="form-control" placeholder="prezzo" aria-label="Username" aria-describedby="basic-addon1"/>
            </div>
            <input type="hidden" name="immagine" value=""/>
            <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">Residui in magazzino</span>
            <input type="number" onChange={handleInputChange} value={obj.stock} name="stock" className="form-control" placeholder="stock" aria-label="Username" aria-describedby="basic-addon1"/>
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
