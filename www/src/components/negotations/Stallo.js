import React, { useState, useEffect } from 'react';
import { json } from 'react-router';
import RenderList from '../../utils/RenderList';
import {URL} from '../../index'



export const Stallo = ({date_added}) => {

    const data = RenderList(URL+'session_data');
    
    
    const dateParts = date_added.replace(/(\d{2})-(\d{2})-(\d{4})/, "$3-$2-$1").split("-");
    const dateObj = new Date(dateParts[0], dateParts[1] - 1, dateParts[2]);

    dateObj.setDate(dateObj.getDate() + parseInt(data.stallo));
   
    const now = new Date(); // data di oggi
    const timeDiff = dateObj.setHours(0,0,0,0) - now.setHours(0,0,0,0); // differenza in millisecondi, senza ore e minuti
    const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24)); // differenza in giorni, arrotondata per eccesso
    
    const percent = daysDiff * data.stallo/100;
  return (
    <div>
    <div className="progress mt-5" role="progressbar" aria-label="Danger striped example" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100">
        <div className="progress-bar progress-bar-striped bg-secondary" style={{width: percent+'%'}}>{daysDiff} Giorni Allo Stallo</div>
        </div>
        </div>
  )
}
