import React, {useState, useEffect} from 'react'
import { URL } from '../../index'
import RenderList from '../../utils/RenderList'
import { AssignAgents } from './AssignAgents';
import MultiSelect from './MultiSelect';

export const TaskUpdate = ({id,progetto}) => {
  const task = RenderList(URL+'task?id='+id);
  const [obj,setObj] = useState([])
  useEffect(() => {
    setObj(task);
  }, [task]);

  const handleInputChange = (e) => {
      // copia l'oggetto JSON esistente nello stato
      const myObjectCopy = {...obj};
      // modifica il valore della proprietà "nome"
      myObjectCopy.titolo = e.target.nome;
      myObjectCopy.descrizione = e.target.descrizione;
      myObjectCopy.data_inizio = e.target.data_inizio;
      myObjectCopy.data_scadenza = e.target.data_scadenza;
      // aggiorna lo stato con il nuovo oggetto JSON
      setObj(myObjectCopy);
    }

    //Trovo files allegati alla task
    const file_list = RenderList(URL+'show_files?id='+id);
    
    

  return (
    <div className='update mb-5'>

      <form action={URL+'crea_task'} method="post">
        <input type="hidden" value={id} name="id"/>
        <input type="hidden" value={task.eseguita} name="eseguita"/>
      <div className="mb-3">
        <label className="form-label">Titolo</label>
        <input type="text" onChange={handleInputChange} value={obj.titolo} name="titolo" className="form-control"/>
      </div>
      <div className="mb-3">
        <label className="form-label">Descrizione</label>
        <textarea type="text" onChange={handleInputChange} value={obj.descrizione} name="descrizione" className="form-control"/>
      </div>
      <div className="mb-3">
        <label className="form-label">Data Inizio</label>
        <input type="date" onChange={handleInputChange} value={obj.data_inizio} name="data_inizio" className="form-control"/>
        <label className="form-label">Data Scadenza</label>
        <input type="date" onChange={handleInputChange} value={obj.data_scadenza} name="data_scadenza" className="form-control"/>
      </div>
      <input type="hidden" value={progetto} name="progetto" />

      <AssignAgents task_id={id}/>

      <button type="submit" className='btn btn-primary mt-3 mb-3'>Salva</button>
      </form>

      <ul className="list-group p-3 mt-3">
        {file_list.file != null ? 
        file_list.file.map((item,index)=>(
          <li>
            <a href={URL+file_list.file_path[index]} download key={index}>{item}</a>
              </li>)) 
        : null}
      </ul>
      <a href={URL+'elimina_task?id='+id} className='btn btn-danger'>Elimina Task</a>

    </div>
  )
}
