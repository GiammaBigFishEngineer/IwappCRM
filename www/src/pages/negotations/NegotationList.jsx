import React, { useEffect, useRef, useState } from 'react';
import $ from 'jquery';
import 'datatables.net';
import 'datatables.net-bs4';
import 'datatables.net-responsive';
import 'datatables.net-responsive-bs4';
import 'datatables.net-bs4/css/dataTables.bootstrap4.min.css';
import 'datatables.net-responsive-bs4/css/responsive.bootstrap4.min.css';
import RenderList from '../../utils/RenderList';
import { NegotationForm } from '../../components/negotations/NegotationForm';
import { NegotationUpdate } from '../../components/negotations/NegotationUpdate';

import {URL} from '../../index'


const NegotationList = () => {
  const [pageLength, setPageLength] = useState(50);
  var list = RenderList(URL+'trattative');
  const negotiations = list.map(({ negotiation }) => negotiation);
  const products = list.flatMap(({ products }) => products);
  const tableRef = useRef(null);
  const leads = RenderList(URL+'clienti');
  const fases = RenderList(URL+'fasi');

  const stati = [
    {id: 1, stato: 'aperta'},
    {id: 2, stato: 'vinta'},
    {id: 3, stato: 'persa'},
  ]

  useEffect(() => {
    const dataTable = $(tableRef.current).DataTable(
    {
      data: negotiations,
      columns: [
        { title: 'Trattativa', data: 'nome_trattativa' },
        {
          title: 'Cliente',
          data: 'cliente',
          createdCell: function(td, cellData, rowData, row, col) {
            var html = '<div>';
            html += leads.map(function(item) {
              return rowData.cliente == item.id ? '<p>' + item.nome +' '+ item.cognome + '</p>' : '';
            }).join('');
            html += '</div>';
            $(td).html(html);
          }
        },
        {
          title: 'Stato',
          data: 'stato',
          createdCell: function(td, cellData, rowData, row, col) {
            var html = '<div>';
            html += stati.map(function(item) {
              return rowData.stato == item.id ? '<p>' + item.stato + '</p>' : '';
            }).join('');
            html += '</div>';
            $(td).html(html);
          }
        },
        {
          title: 'Fase',
          data: 'fase',
          createdCell: function(td, cellData, rowData, row, col) {
            var html = '<div>';
            html += fases.map(function(item) {
              return rowData.fase == item.id ? '<p>' + item.nome_fase + '</p>' : '';
            }).join('');
            html += '</div>';
            $(td).html(html);
          }
        },
        { title: 'Valore(€)', data: 'valore_economico' },
        { title: 'Modifica', data: null },
        { title: 'Elimina', data: null },
      ],
      columnDefs: [
        {
          targets: -2, // Indice della colonna "Aggiornamento"
          render: function(data, type, row, meta) {
            return '<a class="text-primary" data-bs-toggle="modal" data-bs-target="#'+row.id+'"> <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16"><path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/><path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/></svg></a>';
          }
        },
        {
          targets: -1, // Indice della colonna "Aggiornamento"
          render: function(data, type, row, meta) {
            return '<a href="' + URL + 'elimina_trattativa?id=' + row.id + '"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16"><path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/><path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/></svg></a>';
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
    dataTable.rows().nodes().to$().on('click','td:lt(4)', function() {
      // qui puoi inserire il codice che deve essere eseguito al click su una riga
      // per accedere ai dati della riga cliccata, puoi utilizzare il metodo row().data() di DataTable
      const rowData = dataTable.row(this).data();
      const id = rowData.id;
      window.location.href = `/negotation?id=${id}`;
      $(this).siblings(':lt(4)').css('cursor', 'pointer');
    });
    return () => {
      // distruggi la tabella quando il componente viene smontato
      dataTable.destroy();
    };
  }, [negotiations, pageLength]);

  
  


  const handlePageLengthChange = (event) => {
    const newPageLength = event.target.value;
    setPageLength(newPageLength);
  }

  return (
    <div className="table-responsive container">

    {negotiations.map(item=>(
      <div key={item.id} className="modal fade" id={item.id} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <NegotationUpdate item={item}/>
      </div>
    ))}


<div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <NegotationForm/>
</div>


<div className="input-group mt-3 w-50">
<button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
  Nuova Trattativa
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
        <td>Trattativa</td>
        <td>Cliente</td>
        <td>Stato</td>
        <td>Fase</td>
        <td>Valore(€)</td>
        <td>Modifica</td>
        <td>Elimina</td>
      </tr>
    </thead>
    </table>
    </div>
  );
};
export default NegotationList