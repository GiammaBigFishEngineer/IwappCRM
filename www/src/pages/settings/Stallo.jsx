import React, { useState, useEffect } from 'react'
import {URL} from '../../index'
import IsOrganizer from '../../utils/IsOrganizer';
import RenderList from '../../utils/RenderList';

export const Stallo = () => {
  const data = RenderList(URL+'session_data');
  const organizer = IsOrganizer();
  const [stallo,setStallo] = useState(0);
  useEffect(() => {
    setStallo(data.stallo);
  }, [data]);

  const handleInput = (event) => {
      setStallo(event.target.stallo);
  }
  return (
    <div className="p-5">
      <h2>Il tempo di stallo della tue trattative è impostato a {data.stallo} giorni</h2>
    {organizer ? <form action={URL+'stallo'} method="post">
      <div className="mb-3">
        <label className="form-label">Giorni</label>
        <input type="number" name="stallo" onChange={handleInput} value={stallo} className="form-control"/>
      </div>
      <button type="submit" className="btn btn-primary">Salva</button>
      </form>
      :null}
      
    </div>
  )
}
