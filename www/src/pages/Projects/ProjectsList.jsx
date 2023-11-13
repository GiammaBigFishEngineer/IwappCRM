import React from 'react'
import { Container, Row, Col } from 'react-bootstrap';
import { ProjectForm } from '../../components/projects/ProjectForm';
import RenderList from '../../utils/RenderList';
import {URL} from '../../index'
import { ProjectUpdate } from '../../components/projects/ProjectUpdate';
import { Link } from 'react-router-dom';
import IsOrganizer from '../../utils/IsOrganizer';

function Delete(id) {
  const answer = window.confirm("Sei sicuro di volere eliminare questo progetto? L'azzione è irreversibile.");
  if (answer) {
      console.log('agente eliminato con successo');
      alert('agente eliminato con successo');  
      window.location.href = URL+'elimina_progetto?id='+id;
  }   
}
//La funzione renderColumns disponde a 3 colonne ogni riga in base al numero di progetti da reinderizzare


function renderColumns(data) {
  return data.map((item, index) => (
    <>
   
    <div className="modal fade" id={item.id} data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="staticBackdropLabel">Crea un nuovo progetto</h1>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <ProjectUpdate item={item}/>
        </div>
      </div>
    </div>

    <Col key={index}>
      <div className="card mb-3" style={{width: "18rem"}}>
      <img src={URL+'projects_file/'+item.id+'/'+item.immagine} className="card-img-top" alt="..."/>
      <div className="card-body">
        <h5 className="card-title">{item.nome}</h5>
        <p className="card-text">{item.descrizione}</p>

        <div className='row'>
        <Link to={"/project?id="+item.id} className="btn btn-secondary mb-3">Visualizza</Link>
        </div>
        <div className='row'>
        <button type="button" className="btn btn-primary mb-3" data-bs-toggle="modal" data-bs-target={"#"+item.id}>Modifica</button>
        </div>
        <div className='row'>
        <a href="#" onClick={(e)=>Delete(item.id)} className="btn btn-danger mb-3">Elimina</a>
        </div>

      </div>
    </div>
    </Col>
    </>
  ));
}

export const ProjectsList = () => {
  const data = RenderList(URL+'progetti')
  const organizer = IsOrganizer();

  const columnCount = 3;
  const rowCount = Math.ceil(data.length / columnCount);

  let rows = [];

  for (let i = 0; i < rowCount; i++) {
    let startIndex = i * columnCount;
    let endIndex = startIndex + columnCount;
    let rowItems = data.slice(startIndex, endIndex);
    let row = (
      <Row key={i}>
        {renderColumns(rowItems)}
      </Row>
    );
    rows.push(row);
  }
  return (
  <>
  <h2>Area Progetti</h2>
    <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="staticBackdropLabel">Crea un nuovo progetto</h1>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <ProjectForm/>
        </div>
      </div>
    </div>

    <Container className="mt-3">
    {organizer ?  <button type="button" className="btn btn-primary mb-3" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
      Nuovo Progetto
    </button>
    :null}
     
      {rows}
    </Container>
  </>
  )
}
