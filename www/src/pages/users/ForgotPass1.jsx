import React from 'react'
import {URL} from '../../index'
import { useLocation } from 'react-router-dom';
import logo from '../../static/logo.png'

export const ForgotPass1 = () => {
    const loc = useLocation();
    const searchParams = new URLSearchParams(loc.search);
    const token = searchParams.get('token');
    const expires = searchParams.get('expires');
  return (
    <div className='container' style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      height: "100vh"
    }}>

      <form action={URL+'change_password'} className='col-md-6 col-12 mx-auto bg-light p-5' style={{borderRadius:"15px"}} method='post'>
        <h3 className='mb-3'>
          <img src={logo} width="100px" height="100px"/>IwappCRM
          </h3>
          <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">Password</label>
                <input type="password" name="password1" className="form-control"/>
              </div>
          <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">Ripeti Password</label>
                <input type="password" name="password2" className="form-control"/>
          </div>

          <input type="hidden" name="token" value={token}/>
          <input type="hidden" name="expires" value={expires}/>

        <button type="submit" className="btn btn-primary">Invia</button>
        
      </form>
    </div>
    
        
  )
}
