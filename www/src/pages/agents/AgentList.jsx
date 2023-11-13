import React from 'react'
import {AgentForm} from '../../components/AgentForm'
import {URL} from '../../index'
import RenderList from '../../utils/RenderList';

export const AgentList = () => {
  const agents = RenderList(URL+'agenti');
  const roles = RenderList(URL+'ruoli');

  function Delete(id) {
    const answer = window.confirm("Sei sicuro di volere eliminare questo agente? Così facendo il profilo verrà eliminato.");
    if (answer) {
        console.log('agente eliminato con successo');
        alert('agente eliminato con successo');  
        window.location.href = URL+'elimina_agente?id='+id;
    }   
  }
  return (
    <div className="p-2">

      {roles.length !== 0 ? 
       <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
       Invita Agente
       </button>
      :
      <p className='text-danger'>Devi registrare almeno un ruolo prima di invitare nuovi agenti</p>}
       

        <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <AgentForm/>
        </div>

        <table className="table table-striped table-light mt-3">
  <thead>
    <tr>
      <th scope="col">Nome Cognome</th>
      <th scope="col">Ruolo</th>
      <th scope="col">Dissocia</th>
    </tr>
  </thead>
  <tbody>
    {agents.map(item=>(
      <tr>
      <td>{item.fullname}</td>
      {roles.map(role=>(
        item.ruolo == role.id ? 
        <td>{role.nome_ruolo}</td>:
        null
      ))}
      <td onClick={(e)=>Delete(item.id)}>Elimina</td>
      </tr>
    ))}
  </tbody>
</table>
    </div>
  )
}
