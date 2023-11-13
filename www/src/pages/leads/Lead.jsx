import React from 'react'
import Map from '../../components/Map'
import { useLocation } from 'react-router-dom';
import RenderList from '../../utils/RenderList'
import {URL} from '../../index'
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useState } from 'react';
import { LeadUpdate } from '../../components/leads/LeadUpdate';

export const Lead = () => {
 
  const size = {
    width: "100%",
    height: "400px",
  };

  const loc = useLocation();
  const searchParams = new URLSearchParams(loc.search);
  const id = searchParams.get('id');

  const lead = RenderList(URL+'cliente?id='+id);
  const list = RenderList(URL+'trattative');
  const negotiations = list.map(({ negotiation }) => negotiation);

  return (
    <div className="p-2">
    <div className="row">
      <div className="col-4">

    
        <LeadUpdate item={lead}/>
 
      </div>
      <div className="col">
      <input className="form-control mb-2" type="text" placeholder="Ricerca" aria-label="default input example"/>
      <div className="mb-2" style={{ height: "200px", overflow: "auto" }}>
        <ul className="list-group list-group-flush">
         {negotiations.map(item=>(
           item.cliente == lead.id ? 
           <li className="list-group-item">
             <Link to={'/negotation?id='+item.id}>{item.nome_trattativa}</Link>
            </li> : null
         ))}
        </ul>
      </div>
      <Map lng={lead.longitude} lat={lead.latitude} size={size} />
      </div>
    </div>

    

    </div>
  )
}
