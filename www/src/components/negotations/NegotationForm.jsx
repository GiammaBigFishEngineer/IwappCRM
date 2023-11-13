import React, {useState, useEffect} from 'react'
import {URL} from '../../index'
import RenderList from '../../utils/RenderList'
import SelectInput from './SelectInput'

export const NegotationForm = () => {

  const fases = RenderList(URL+'fasi');
  const leads = RenderList(URL+'clienti');
  const products = RenderList(URL+'prodotti');

  function handleSelect(option) {
    console.log('Opzione selezionata:', option);
  }

  const options = leads.map(obj => ({
    value: obj.id,
    label: obj.cognome
  }));

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
        <form action={URL+'trattativa'} method="post">
        <div className="modal-dialog">
            <div className="modal-content">
            <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">Nuova Trattativa</h1>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
        <div className="input-group mb-3">
        <span className="input-group-text" id="basic-addon1">Trattativa</span>
        <input type="text" name="nome_trattativa" className="form-control" placeholder="nome trattativa" aria-label="Username" aria-describedby="basic-addon1"/>
        </div>

       
        <SelectInput options={options} onSelect={handleSelect} />
        
        

        <div className="input-group mb-3">
        <span className="input-group-text" id="basic-addon2">Stato</span>
        <select className="form-select" name="stato" saria-label="Default select example">
        <option value="1" selected>Aperta</option>
        <option value="2">Vinta</option>
        <option value="3">Persa</option>
        </select>
        <span className="input-group-text" id="basic-addon2">Fase</span>
        <select className="form-select" name="fase" aria-label="Default select example">
          {fases.map(item=>(
            <option key={item.id} value={item.id}>{item.nome_fase}</option>
          ))}
        </select>
        </div>

        <div className="form-group mb-3">
        <label>Prodotti</label>
        <div>
        <table className='table table-bordered mt-4 mb-3'>
        <thead>
          <tr>
            <td>Prodotti</td>
            <td>Numero Articoli</td>
          </tr>
        </thead>
      {products.map((product,index) => (
       <tr>
         <td>
       <div key={product.id}>
          <div className="form-check">
            <input className="form-check-input" type="checkbox" value={product.id} id={product.id} name="products[]" />
            <label className="form-check-label" for={product.id}>{product.nome_prodotto}</label>
           </div>  
        </div>
        </td>
        <td>
          <input type="number" name="selled[]"  placeholder='numero articoli' className='form-input w-100'></input>
        </td>
        </tr>
      ))}
      </table>
            
        </div>
      </div>

        <div className="input-group mb-3">
        <span className="input-group-text" id="basic-addon1">Valore Economico</span>
        <input type="number" name="valore_economico" dafualt='0' step="0.01" onInput={(e)=>{checkInput(e)}} className="form-control" placeholder="€" aria-label="Username" aria-describedby="basic-addon1"/>
        </div>

        <div className="input-group">
        <span className="input-group-text">Descrizione</span>
        <textarea className="form-control" name="descrizione" aria-label="With textarea"></textarea>
        </div>
      </div>

      <input type="hidden" name="referente" className="form-control" value="0" placeholder=""/>
      <input type="hidden" name="date_added" className="form-control" value="0" placeholder=""/>
      <input type="hidden" name="data_vincita" className="form-control" value="0" placeholder=""/>

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
