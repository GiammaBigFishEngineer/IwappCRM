import React, { useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom';
import $ from 'jquery';
import 'datatables.net';
import DataTable from 'datatables.net';
import 'datatables.net-bs4';
import 'datatables.net-responsive';
import 'datatables.net-responsive-bs4';
import 'datatables.net-bs4/css/dataTables.bootstrap4.min.css';
import 'datatables.net-responsive-bs4/css/responsive.bootstrap4.min.css';
import { LeadForm } from '../../components/leads/LeadForm';

import RenderList from '../../utils/RenderList';
import {URL} from '../../index'
import axios from "axios";

const LeadList = () => {

  //Bisogna sistemare la modifica popup ed il render alla pagina anagrafica


  const [pageLength, setPageLength] = useState(50);
  const handleClick = (event) => {
    if (!window.confirm('Are you sure you want to leave this page?')) {
      event.preventDefault();
    }
  };

  const tableRef = useRef(null);
  
  useEffect(() => {
    const dataTable = $(tableRef.current).DataTable(
    {
      processing: true,
      serverSide: true,
      ajax: function (data, callback, settings) {
        axios.get(URL + 'api/clients/list', {
          params: data,
          withCredentials: true
        })
            .then(function (response,) {
              const responseData = {
                data: response.data.data,  // Estrai i dati dalla proprietà 'data' nella risposta JSON
                recordsTotal: response.data.recordsTotal,
                recordsFiltered: response.data.recordsFiltered
              };
              console.log(response);
              callback(responseData);
            })
            .catch(function (error) {
              console.error(error);
              callback({ data: [], recordsTotal: 0, recordsFiltered: 0 });
            });
      },
      columns: [
        { title: 'Nome', data: 'nome' },
        { title: 'Cognome', data: 'cognome' },
        { title: 'Email', data: 'email' },
        { title: 'Data Aggiunta', data: 'date_added' },
        { title: 'Categoria',
          data: 'categoria',
        },
        { title: 'Modifica', data: null },
        { title: 'Elimina', data: null },
      ],
      columnDefs: [
        {
          targets: -2, // Indice della colonna "Aggiornamento"
          render: function(data, type, row, meta) {
            return '<a href="/lead?id=' + row.id + '"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16"><path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/><path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/></svg></a>';
          },

        },
        {
          targets: -1, // Indice della colonna "Aggiornamento"
          render: function(data, type, row, meta) {
            return '<a href="' + URL + 'elimina_cliente?id=' + row.id + '"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16"><path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/><path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/></svg></a>';
          }
        }
      ],
      responsive: true,
      paging: true,
      lengthChange: false,
      searching: true,
      info: true,
      pageLength: pageLength,
      language: {
        search: 'Cerca',
        zeroRecords: 'Nessun risultato trovato',
        info: 'Mostra _START_ a _END_ di _TOTAL_ elementi',
        infoEmpty: 'Mostra 0 a 0 di 0 elementi',
        infoFiltered: '(filtrati da un totale di _MAX_ elementi)'
      }
    });
    return () => {
      // distruggi la tabella quando il componente viene smontato
      dataTable.destroy();
    };

  }, [pageLength]);


  const handlePageLengthChange = (event) => {
    const newPageLength = event.target.value;
    setPageLength(newPageLength);
  }


  return (
    <div className="table-responsive container">
      <div className="row mt-4 mb-4">
  <div className="col-sm-6 mb-3 mb-sm-0">
    <div className="card">
      <div class="card-body">
        <h5 className="card-title"><svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="currentColor" className="bi bi-person-check" viewBox="0 0 16 16">
  <path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Zm1.679-4.493-1.335 2.226a.75.75 0 0 1-1.174.144l-.774-.773a.5.5 0 0 1 .708-.708l.547.548 1.17-1.951a.5.5 0 1 1 .858.514ZM11 5a3 3 0 1 1-6 0 3 3 0 0 1 6 0ZM8 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z"/>
  <path d="M8.256 14a4.474 4.474 0 0 1-.229-1.004H3c.001-.246.154-.986.832-1.664C4.484 10.68 5.711 10 8 10c.26 0 .507.009.74.025.226-.341.496-.65.804-.918C9.077 9.038 8.564 9 8 9c-5 0-6 3-6 4s1 1 1 1h5.256Z"/>
</svg></h5>
        <p className="card-text">Clienti assegnati: </p>
        <a href="#" className="btn btn-secondary">Visualizza</a>
      </div>
    </div>
  </div>
  <div className="col-sm-6">
    <div className="card">
      <div className="card-body">
        <h5 className="card-title"><svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="currentColor" className="bi bi-star" viewBox="0 0 16 16">
  <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z"/>
</svg></h5>
        <p className="card-text">Preferiti</p>
        <a href="#" className="btn btn-secondary">Visualizza</a>
      </div>
    </div>
  </div>
</div>

<div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <LeadForm/>
</div>


<div className="input-group mt-3 w-50">
<button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
  Nuovo Cliente
</button>
  
  <span className="input-group-text" id="basic-addon1">Clienti Visibili</span>
      <select
        className="form-control "
        id="pageLengthSelect"
        value={pageLength}
        onChange={handlePageLengthChange}
      >
        <option default="50">50</option>
        <option value="10">10</option>
        <option value="25">25</option>
        <option value="50">50</option>
        <option value="100">100</option>
      </select>
</div>

  <table className="table table-striped" ref={tableRef}>
    <thead>
      <tr>
        <td>Nome</td>
        <td>Cognome</td>
        <td>Email</td>
        <td>Data Aggiunta</td>
        <td>Categoria</td>
        <td>Modifica</td>
        <td>Elimina</td>
      </tr>
    </thead>
    </table>
    </div>
  );
};
export default LeadList