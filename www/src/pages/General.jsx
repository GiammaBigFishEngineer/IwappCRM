import { Table } from "react-bootstrap";
import React, { useEffect, useRef, useState } from 'react';
import { Offcanvas } from 'bootstrap';
import $ from 'jquery';
import 'datatables.net';
import 'datatables.net-bs4';
import 'datatables.net-responsive';
import 'datatables.net-responsive-bs4';
import 'datatables.net-bs4/css/dataTables.bootstrap4.min.css';
import 'datatables.net-responsive-bs4/css/responsive.bootstrap4.min.css';
import RenderList from '../utils/RenderList';
import {URL} from '../index'
import axios from "axios";


  

export const General = () => {
    const agents = RenderList(URL+'agenti');
    const fases = RenderList(URL+'fasi');
    var categorie = RenderList(URL+"categorie");
    const states = [  {"id": 1,"value": "aperta"},{"id": 2,"value": "vinta"},{"id": 3,"value":"persa"}]
    
    const columns = [
      { title: 'Nome', data: 'nome' },
      { title: 'Cognome', data: 'cognome' },
      { title: 'Azienda', data: 'azienda' },
      { title: 'Via', data: 'via' },
      { title: 'Città', data: 'citta' },
      { title: 'Email', data: 'email' },
      { title: 'Provincia', data: 'provincia' },
      { title: 'Partita IVA', data: 'partita_iva' },
      { title: 'Cellulare', data: 'cellulare' },
      { title: 'Fisso', data: 'telefono_fisso' },
      {
        title: 'Agente',
        data: 'agente',
        createdCell: function(td, cellData, rowData, row, col) {
          var html = '<div>';
          html += agents.map(function(item) {
            return rowData.agente == item.id ? '<p>' + item.fullname + '</p>' : '';
          }).join('');
          html += '</div>';
          $(td).html(html);
        }
      },
      {
        title: 'Categoria',
        data: 'categoria',
        createdCell: function(td, cellData, rowData, row, col) {
          var html = '<div>';
          html += categorie.map(function(item) {
            return rowData.categoria == item.id ? '<span style="background:' + item.colore + '" class="badge rounded-pill">' + item.nome_categoria + '</span>' : '';
          }).join('');
          html += '</div>';
          $(td).html(html);
        }
      },
      { title: 'Ultima Modifica', data: 'converted_date' },
      { title: 'Data Aggiunta', data: 'date_added', render: date_added => date_added.toLocaleString() },
      { title: 'Sito Web', data: 'sitoweb' },

      { title: 'Trattative', data: 'nome_trattative',render: nome_trattative => nome_trattative.join("<hr/>") },
      {
        title: 'Stati',
        data: 'stato',
        render: stato => stato.map((valore) => {
          if (valore === 1) {
            return "aperta";
          } else if (valore === 2) {
            return "vinta";
          } else if (valore === 3) {
            return "persa";
          } else {
            return valore;
          }
        }).join("<hr/>")
      },
      {
        title: 'Fasi',
        data: 'fase',
        render: fase => fase.map((item)=>{
          for(let i = 0;i<fases.length;i++){
            if(fases[i].id == item){
              return fases[i].nome_fase;
            }
          }
        }).join("<hr/>")
      },
      { title: 'Valore', data: 'valore_economico',render: valore_economico => valore_economico.join("<hr/>") },
      { title: 'Data Trattativa', data: 'date_added_neg',render: date_added_neg => date_added_neg.join("<hr/>") },
      { title: 'Data Vincita', data: 'data_vincita',render: data_vincita => data_vincita.join("<hr/>") },

    ];

    //IMPOSTO OFFCANVAS CON REFRESH
    const offcanvasRef = useRef(null);
    useEffect(() => {
      const offcanvas = new Offcanvas(offcanvasRef.current);
      // Imposta il reload della pagina come callback della funzione hide di Offcanvas
      offcanvas.hide = () => {
        Offcanvas.prototype.hide.call(offcanvas);
        window.location.reload();
      };
      // Pulisci l'evento quando il componente viene smontato
      return () => {
        offcanvas.hide = Offcanvas.prototype.hide;
      };
    }, []);
    
    //IMPOSTA COLONNE----------
    const [selectedColumns, setSelectedColumns] = useState(() => {
        // Cerca i dati salvati nel localStorage e utilizza quelli come valore iniziale
        const savedColumns = localStorage.getItem("selectedColumns");
        if (savedColumns) {
          return JSON.parse(savedColumns);
        } else {
          return columns.map((column) => column.title);
        }
        });
    
      useEffect(() => {
        // Salva le colonne selezionate nel localStorage
        localStorage.setItem("selectedColumns", JSON.stringify(selectedColumns));
      }, [selectedColumns]);
    
      const handleColumnToggle = (columnTitle) => {
        if (selectedColumns.includes(columnTitle)) {
          setSelectedColumns(selectedColumns.filter((title) => title !== columnTitle));
        } else {
          setSelectedColumns([...selectedColumns, columnTitle]);
        }
      };
    
    const filteredColumnsDef = columns.filter((column) =>
      selectedColumns.includes(column.title)
    );

  //RIGHE PER PEGINA----------------
  const [pageLength, setPageLength] = useState(50);
  const handlePageLengthChange = (event) => {
    const newPageLength = event.target.value;
    setPageLength(newPageLength);
  }
  //IMPOSTA TABELLA------------------

  var list = RenderList(URL + "general");

  const [leads,setLeads] = useState(list);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    setLeads(list);
  }, [list]);

  
  const tableRef = useRef(null);
  useEffect(() => {
    const dataTable = $(tableRef.current).DataTable(
    {
      processing: true,
      serverSide: true,
      ajax: function (data, callback, settings) {
        axios.get(URL + 'general', {
          data: data,
          withCredentials: true,
        })
            .then(function (response,) {
              const responseData = {
                data: response.data.data,  // Estrai i dati dalla proprietà 'data' nella risposta JSON
                recordsTotal: response.data.recordsTotal,
                recordsFiltered: response.data.recordsFiltered,  
              };
              callback(responseData);
            })
            .catch(function (error) {
              console.error(error);
              callback({ data: [], recordsTotal: 0, recordsFiltered: 0 });
            });
      },
      columns: filteredColumnsDef,
      responsive: true,
      paging: true,
      lengthChange: false,
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

  }, [leads, pageLength]);

  //Mostra filtri
  const [showDiv, setShowDiv] = useState(false);
  const handleClick = () => {
    setShowDiv(!showDiv);
  };

  return (
     <div className="p-3">
      <h3>Lista generale</h3>
      
    <div className="w-25 d-flex">
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
<div className="offcanvas offcanvas-start" ref={offcanvasRef} data-bs-scroll="true" tabIndex="-1" id="offcanvasWithBothOptions" aria-labelledby="offcanvasWithBothOptionsLabel">
  <div className="offcanvas-header">
    <h5 className="offcanvas-title" id="offcanvasWithBothOptionsLabel">Filtra Colonne</h5>
    <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
  </div>
  <div className="offcanvas-body">
  {columns.map((column) => (
          <label key={column.title} style={{ marginRight: "10px" }}>
            <input
              type="checkbox"
              checked={selectedColumns.includes(column.title)}
              onChange={() => handleColumnToggle(column.title)}
            />
            {column.title}
          </label>
        ))}
  </div>
  </div>

  <button className="btn btn-secondary mt-3" onClick={handleClick}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-funnel" viewBox="0 0 16 16">
  <path d="M1.5 1.5A.5.5 0 0 1 2 1h12a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.128.334L10 8.692V13.5a.5.5 0 0 1-.342.474l-3 1A.5.5 0 0 1 6 14.5V8.692L1.628 3.834A.5.5 0 0 1 1.5 3.5v-2zm1 .5v1.308l4.372 4.858A.5.5 0 0 1 7 8.5v5.306l2-.666V8.5a.5.5 0 0 1 .128-.334L13.5 3.308V2h-11z"/>
</svg></button>
<button className="btn btn-primary mt-3" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasWithBothOptions" aria-controls="offcanvasWithBothOptions">Filtra Colonne</button>

 
  <div className={`my-div ${showDiv ? 'show' : 'hide'}`} style={{ height: showDiv ? 'auto' : 0 }}>
  
  <div className="input-group mb-4 mt-3">
  </div>
  <div className="input-group mb-4 mt-3">
  </div>
  <div className="input-group mb-4 mt-3">
  </div>
  <div className="input-group mb-4 mt-3">
  </div>
  
  </div>
  
  
      <Table striped bordered ref={tableRef}>
        <thead>
          <tr>
            {selectedColumns.map((columnTitle) => (
              <th key={columnTitle}>{columnTitle}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          
        </tbody>
      </Table>
    </div>
  )
}