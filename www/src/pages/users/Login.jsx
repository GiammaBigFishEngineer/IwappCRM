import React from 'react'
import RenderList from '../../utils/RenderList'
import {URL} from '../../index'
import {useLocation} from "react-router-dom";
import { Link } from 'react-router-dom';
import logo from '../../static/logo.png'

export const Login = () => {
  const loc = useLocation();
  const searchParams = new URLSearchParams(loc.search);
  const message = searchParams.get('message');
  if(message){
    const error = true;
  }else{
    const error = false ;
  }
  return (
    <div className='container' style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      height: "100vh"
    }}>

      <form action={URL+'login'} className='col-md-6 col-12 mx-auto bg-light p-5' style={{borderRadius:"15px"}} method='post'>
        <h3 className='mb-3'>
          <img src={logo} width="100px" height="100px"/>IwappCRM
          </h3>

        {message === "Email non esistente" ?
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


        {message === "Password non corretta" ?
            <>
              <div className="mb-3">
                <label name="password" className="form-label">Password</label>
                <input type="password" name="password" className="form-control is-invalid"/>
              </div>
              <div id="emailHelp" className="form-text text-danger mb-3">{message}</div>
            </>
            :
            <>
              <div className="mb-3">
                <label name="password" className="form-label">Password</label>
                <input type="password" name="password" className="form-control"/>
              </div>
            </>
        }
        {message === "Devvi attivare il tuo account" ? 
        <div id="emailHelp" className="form-text text-danger mb-3">{message}</div>
        :null}

        <button type="submit" className="btn btn-primary">Submit</button>
        <br/>
        <br/>
        <Link to='/signup'>Registrati se non hai ancora un account</Link>
        <br/>
        <br/>
        <Link to='/forgot_password2'>Hai dimenticato la password?</Link>
      </form>
    </div>
  )
}
