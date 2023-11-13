import React, {useState, useEffect} from 'react'
import {URL} from '../../index'
import RenderList from '../../utils/RenderList'
import SelectInput from './SelectInput'
import ProductList from './ProductList'
import { useLocation } from 'react-router-dom';

export const NegotationUpdate = ({item}) => {

  const fases = RenderList(URL+'fasi');
  const leads = RenderList(URL+'clienti');
  const negotation = RenderList(URL+'trattativa?id='+item.id);
  const motivations = RenderList(URL+'motivazioni')
  const relation_prod = RenderList(URL+'relations?neg='+item.id);

  const loc = useLocation();
  const searchParams = new URLSearchParams(loc.search);
  const error = searchParams.get('error');

  //Reinderizazzione prodotti
  const singleProducts = RenderList(URL+'prodotti');
  const relations = negotation.flatMap(qr => qr.products.map(({ product }) => product));
  

  function handleSelect(option) {
    console.log('Opzione selezionata:', option);
  }

  const options = leads.map(obj => ({
    value: obj.id,
    label: obj.cognome
  }));

  //VERIFICIO INPUT FLOAT
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

  //CAMBIO VALUE INPUT
  //change input text or number
  const [obj,setObj] = useState(item);
  const handleInputChange = (e) => {
    // copia l'oggetto JSON esistente nello stato
    const myObjectCopy = {...obj};
    // modifica il valore della proprietà "nome"
    myObjectCopy.nome_trattativa = e.target.nome_trattativa;  
    myObjectCopy.cliente = e.target.cliente;   
    myObjectCopy.fase = e.target.fase;
    myObjectCopy.prodotti = e.target.prodotti;
    myObjectCopy.valore_economico = e.target.valore_economico;
    myObjectCopy.descrizione = e.target.descrizione;
    // aggiorna lo stato con il nuovo oggetto JSON
    setObj(myObjectCopy);
    setStato(e.target.value);
  }
  const [motivazione,setMotivazione] = useState(item.motivazione_perdita);
  const handleMotivazione = (e) => {
    setMotivazione(e.target.motivazione_perdita);
  }
  const [stato,setStato] = useState(item.stato);
  const handleStato = (e) => {
    setStato(e.target.value);
  }

  //Mostrare o meno oggetto in base URL
  const [currentUrl, setCurrentUrl] = useState(window.location.pathname);

  useEffect(() => {
    const handleLocationChange = () => setCurrentUrl(window.location.pathname);
    window.addEventListener('popstate', handleLocationChange);
    return () => window.removeEventListener('popstate', handleLocationChange);
  }, []);

  const shouldShowDiv = currentUrl === '/negotations';

  return (
    <div>
        <form action={URL+'trattativa'} method="post">
          <input type="hidden" value={item.id} name="id"/>
        <div className="modal-dialog">
            <div className="modal-content">
            <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">Modifica trattativa {item.nome_trattativa}</h1>
                {shouldShowDiv && <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>}
            </div>
            <div className="modal-body">
        <div className="input-group mb-3">
        <span className="input-group-text" id="basic-addon1">Trattativa</span>
        <input type="text" onChange={handleInputChange} value={obj.nome_trattativa} name="nome_trattativa" className="form-control" placeholder="nome trattativa" aria-label="Username" aria-describedby="basic-addon1"/>
        </div>

       
        <SelectInput options={options} onSelect={handleSelect} cliente={obj.cliente} />
        
        

        <div className="input-group mb-3">
        <span className="input-group-text" id="basic-addon2">Stato</span>
        <select className="form-select" onChange={handleStato} value={stato} name="stato">
        <option value="1">Aperta</option>
        <option value="2">Vinta</option>
        <option value="3">Persa</option>
        </select>

        <span className="input-group-text" id="basic-addon2">Fase</span>
        <select className="form-select" onChange={handleInputChange} value={obj.fase} name="fase" aria-label="Default select example">
          {fases.map(fase=>(
            <option key={fase.id} value={fase.id}>{fase.nome_fase}</option>
          ))}
        </select>
        </div>

        <div className="form-group mb-3">
        <div>
        <ProductList products={singleProducts} relations={relations} relation_prod={relation_prod}/>
            <h5 className='text-danger'>{error}</h5>
        </div>
      </div>
     

        <div className="input-group mb-3">
        <span className="input-group-text" id="basic-addon1">Valore Economico</span>
        <input type="number" name="valore_economico" onChange={handleInputChange} value={obj.valore_economico} dafualt='0' step="0.01" onInput={(e)=>{checkInput(e)}} className="form-control" placeholder="€" aria-label="Username" aria-describedby="basic-addon1"/>
        </div>

        <div className="input-group mb-3">
        <span className="input-group-text">Descrizione</span>
        <textarea className="form-control" onChange={handleInputChange} value={obj.descrizione} name="descrizione" aria-label="With textarea"></textarea>
        </div>

        {stato == 3 ? 
      <div className="input-group mb-3">
      <span className="input-group-text" id="basic-addon2">Motivazione Perdita</span>
        <select className="form-select" onChange={handleMotivazione} value={motivazione} name="motivazione_perdita">
          {motivations.map(mot=>(
            <>
            <option key={mot.id} value={mot.id}>{mot.nome_motivazione}</option>
            </>
          ))}
        </select>
      </div>
      
      :null
      }
      </div>
      

      <input type="hidden" name="referente" className="form-control" value="0" placeholder=""/>
      <input type="hidden" name="date_added" className="form-control" value="0" placeholder=""/>
      <input type="hidden" name="data_vincita" className="form-control" value="0" placeholder=""/>


      <div className="modal-footer">
      {shouldShowDiv && <button type="button" className="btn btn-secondary mt-3" data-bs-dismiss="modal">Close</button>}
        <button type="submit" className="btn btn-primary mt-3">Salva</button>
      </div>
    </div>
  </div>
  </form>
    </div>
  )
}
