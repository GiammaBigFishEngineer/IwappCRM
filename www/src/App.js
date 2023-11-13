import { BrowserRouter as Router, Link, Route, Routes } from 'react-router-dom';
import { Login } from './pages/users/Login';
import { Signup } from './pages/users/Signup';
import {BasePage} from './BasePage';
import './style/App.css'
import { Landing } from './Landing';
import { ForgotPass1 } from './pages/users/ForgotPass1';
import { ForgotPass2 } from './pages/users/ForgotPass2';

function App() {

  return (
    <>
    <Router>
    <Routes>
      <Route exact path='/' element={< Landing />}></Route>
     <Route exact path='/login' element={< Login />}></Route>
     <Route exact path='/signup' element={< Signup />}></Route>
     <Route exact path='/forgot_password1' element={< ForgotPass1 />}></Route>
     <Route exact path='/forgot_password2' element={< ForgotPass2 />}></Route>
     <Route exact path='/leads' element={< BasePage />}></Route> 
     <Route exact path='/lead' element={< BasePage />}></Route> 
     <Route exact path='/negotation' element={< BasePage />}></Route> 
     <Route exact path='/negotations' element={< BasePage />}></Route> 
     <Route exact path='/categories' element={< BasePage />}></Route> 
     <Route exact path='/fases' element={< BasePage />}></Route> 
     <Route exact path='/products' element={< BasePage />}></Route> 
     <Route exact path='/stallo' element={< BasePage />}></Route> 
     <Route exact path='/motivations' element={< BasePage />}></Route> 
     <Route exact path='/dashboard' element={< BasePage />}></Route> 
     <Route exact path='/agents' element={< BasePage />}></Route> 
     <Route exact path='/agent' element={< BasePage />}></Route> 
     <Route exact path='/general' element={< BasePage />}></Route> 
     <Route exact path='/roles' element={< BasePage />}></Route> 
     <Route exact path='/projects' element={< BasePage />}></Route> 
     <Route exact path='/project' element={< BasePage />}></Route> 
     <Route exact path='/profile' element={< BasePage />}></Route> 
    </Routes>
    </Router>
    </>
  );
}

export default App;
