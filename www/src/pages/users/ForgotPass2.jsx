import React from 'react'
import {URL} from '../../index'
import logo from '../../static/logo.png'

export const ForgotPass2 = () => {
  return (
    <div className='container' style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      height: "100vh"
    }}>

      <form action={URL+'forgot_password'} className='col-md-6 col-12 mx-auto bg-light p-5' style={{borderRadius:"15px"}} method='post'>
        <h3 className='mb-3'>
          <img src={logo} width="100px" height="100px"/>Cambia Password
          </h3>
          <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">Email</label>
                <input type="email" name="email" className="form-control"/>
          </div>
          <p>Ti invieremo un'email con un link di conferma per verificare che sei tu.</p>

        <button type="submit" className="btn btn-primary">Invia</button>
        
      </form>
    </div>
  )
}
