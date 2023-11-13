import React, {useState, useEffect} from 'react'
import RenderList from '../../utils/RenderList'
import { URL } from '../../index'
import { useLocation } from 'react-router-dom';
import { Container, Form } from 'react-bootstrap';
import {TaskUpdate} from '../../components/projects/TaskUpdate'
import './project.css'

export const Project = () => {
  const loc = useLocation();
  const searchParams = new URLSearchParams(loc.search);
  const id = searchParams.get('id');
   const project = RenderList(URL+'progetto?id='+id);

   const [items, setItems] = useState([]);
   const tasks = RenderList(URL+'lista_task?progetto='+id);
    useEffect(() => {
      setItems(tasks);
    }, [tasks]);
  
  const handleCheckboxChange = (itemId) => {
    const updatedItems = items.map(item => {
      if (item.id === itemId) {
        return { ...item, eseguita: !item.eseguita };
      }
      return item;
    });
    setItems(updatedItems);
  };
  
  return (
    <div className='container mt-3'>

      <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header">
                  <h1 class="modal-title fs-5" id="exampleModalLabel">Nuova Task</h1>
                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <form action={URL+'crea_task'} method='post'>
                <div class="modal-body">

                <div className="input-group mb-3">
                <span className="input-group-text">Titolo Task</span>
                <input type="text" name="titolo" className="form-control"/>
                </div>

                <div className="input-group mb-3">
                <span className="input-group-text">Data Inizio</span>
                <input type="date" name="data_inizio" className="form-control"/>
                </div>

                <div className="input-group mb-3">
                <span className="input-group-text">Data Scadenza</span>
                <input type="date" name="data_scadenza" className="form-control"/>
                </div>
                <input type="hidden" name="progetto" value={id} />  
                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                  <button type="submit" class="btn btn-primary">Crea</button>
                </div>
                </form>
              </div>
            </div>
          </div>

          
           
    {items.map(item => (
      <div class="modal fade modal-xl" id={"static"+item.id} data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="staticBackdropLabel">{item.titolo}</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
      {item.descrizione}
      <TaskUpdate id={item.id} progetto={id}/>
      <form method="post" action={URL+'task_file?id='+item.id+'&&progetto='+id} enctype="multipart/form-data">
        <input type="file" className='form-control mb-3' name="file[]" multiple/>
        <input type="submit" className='btn btn-secondary btn-sm mb-3' name="submit" value="Carica file"/>
      </form>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary">Understood</button>
      </div>
    </div>
  </div>
</div>

    ))}
    

      <h2>{project.nome}</h2>
      <p>{project.descrizione}</p>
      <div className='row mt-3'>
        <div className='col'>
          <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
            Registra Task
          </button>

    

          
        </div>
        <div className='col'>
          <h5>Task List</h5>
          
          <Form action={URL+"carica_task?progetto="+id} method="post">
            {items.map(item => (
              <>
              
              <div className="step">
              <Form.Check 
                key={item.id}
                type="checkbox"
                checked={item.eseguita}
                onChange={() => handleCheckboxChange(item.id)}
                name={item.id}
                label={
                <span className={item.eseguita ? 'text-decoration-line-through' : ''}>
                  <a data-bs-toggle="modal" data-bs-target={"#"+"static"+item.id}>{item.titolo}</a>
                  </span>}
              />
              <p className='text-muted'>12/02/23</p>
              </div>
              </>
            ))}
            <button type="submit" className='btn btn-secondary'>Salva</button>
          </Form>
        </div>
      </div>
    </div>
  )
}
