import React from 'react'
import {URL} from '../../index'
import {useLocation} from "react-router-dom";
import { Link } from 'react-router-dom';
export const Signup = () => {

  const loc = useLocation();
  const searchParams = new URLSearchParams(loc.search);
  const message = searchParams.get('message');
  if(message){
    const error = true;
  }else{
    const error = false
  }

  return (
      <div className='container' style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh"
      }}>

        <form action={URL+'signup'} className='w-50 mx-auto bg-light p-5' style={{borderRadius:"15px"}} method='post'>
          <h3 className='mb-3'>Iscriviti a IwappCRM</h3>

            <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">Nome Cognome</label>
                <input type="text" name="fullname" className="form-control"/>
            </div>

          {message === "Questa email é già utilizzata" ?
              <>
                <div className="mb-3">
                  <label htmlFor="exampleInputEmail1" className="form-label">Email</label>
                  <input type="email" name="email" className="form-control is-invalid"/>
                  <div id="emailHelp" className="form-text">La tua email è riservata alla pricay</div>
                  <div id="emailHelp" className="form-text text-danger mb-3">{message}</div>
                </div>
              </>
              :
              <>
                <div className="mb-3">
                  <label htmlFor="exampleInputEmail1" className="form-label">Email</label>
                  <input type="email" name="email" className="form-control"/>
                  <div id="emailHelp" className="form-text">La tua email è riservata alla pricay</div>
                </div>
              </>
          }


          {message === "le due password non coincidono" ?
              <>
                <div className="mb-3">
                  <label name="password" className="form-label">Password</label>
                  <input type="password" name="password" className="form-control is-invalid"/>
                </div>
              <div className="mb-3">
                  <label name="password" className="form-label">Ripeti Password</label>
                  <input type="password" name="password2" className="form-control is-invalid"/>
              </div>
              <div id="emailHelp" className="form-text text-danger mb-3">{message}</div>
              </>
              :
              <>
                <div className="mb-3">
                  <label name="password" className="form-label">Password</label>
                  <input type="password" name="password" className="form-control"/>
                </div>
                  <div className="mb-3">
                      <label name="password" className="form-label">Ripeti Password</label>
                      <input type="password" name="password2" className="form-control"/>
                  </div>
              </>
          }


          <button type="submit" className="btn btn-primary">Submit</button>
          <br/>
          <br/>
          <Link to='/login'>Hai già un account?</Link>

        </form>
      </div>
  )
}
