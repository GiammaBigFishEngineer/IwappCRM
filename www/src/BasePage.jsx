import React from 'react'
import LeadList from './pages/leads/LeadList';
import {Lead} from './pages/leads/Lead';

import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import NegotationList from './pages/negotations/NegotationList';
import { Negotation } from './pages/negotations/Negotation';
import { Categories } from './pages/settings/Categories';
import { Products } from './pages/settings/Products';
import { Fases } from './pages/settings/Fases';
import { Motivations } from './pages/settings/Motivations';
import { Stallo } from './pages/settings/Stallo';
import { Dashboard } from './pages/Dashboard';
import { AgentList } from './pages/agents/AgentList';
import { Agent } from './pages/agents/Agent';
import { General } from './pages/General';
import { Roles } from './pages/settings/Roles';
import { ProjectsList } from './pages/Projects/ProjectsList'
import { Project } from './pages/Projects/Project';

import { Navigate } from 'react-router-dom';
import RenderList from './utils/RenderList'
import {URL} from './index'

import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import $ from 'jquery';
import Popper from 'popper.js';
import './style/custom.scss';
import Profile from './pages/users/Profile';
import { Landing } from './Landing';


export const BasePage = () => {
    const data = RenderList(URL+'session_data')
    console.log(data);
    if(data.loggedIn === null){
        return (
            <Navigate to='/login'></Navigate>
        )
    }
  if(data.loggedIn === true){
      return (
          <div>
              <Navbar/>
              <main class="d-flex flex-nowrap">
                  <Sidebar/>

                  <div className="container" style={{overflow: "auto"}}>
                      {/*Routing Custom*/}

                      {/*Lista clienti*/}
                      {
                          window.location.pathname === '/leads' ? (
                              <LeadList/>
                          ):null
                      }
                      {/*Anagrafica Cliente*/}
                      {
                          window.location.pathname === '/lead' ? (
                              <Lead/>
                          ):null
                      }
                      {/*Lista Trattative*/}
                      {
                          window.location.pathname === '/negotations' ? (
                              <NegotationList/>
                          ):null
                      }
                      {/*Info Trattativa*/}
                      {
                          window.location.pathname === '/negotation' ? (
                              <Negotation/>
                          ):null
                      }
                      {/*Categorie*/}
                      {
                          window.location.pathname === '/categories' ? (
                              <Categories/>
                          ):null
                      }
                      {/*Prodotti*/}
                      {
                          window.location.pathname === '/products' ? (
                              <Products/>
                          ):null
                      }
                      {/*Fasi*/}
                      {
                          window.location.pathname === '/fases' ? (
                              <Fases/>
                          ):null
                      }
                      {/*Stallo*/}
                      {
                          window.location.pathname === '/stallo' ? (
                              <Stallo/>
                          ):null
                      }
                      {/*Motivazioni*/}
                      {
                          window.location.pathname === '/motivations' ? (
                              <Motivations/>
                          ):null
                      }
                      {/*Ruoli*/}
                      {
                          window.location.pathname === '/roles' ? (
                              <Roles/>
                          ):null
                      }
                      {/*Dashboard*/}
                      {
                          window.location.pathname === '/dashboard' ? (
                              <Dashboard/>
                          ):null
                      }
                      {/*Agenti Lista*/}
                      {
                          window.location.pathname === '/agents' ? (
                              <AgentList/>
                          ):null
                      }
                      {/*Agente Info*/}
                      {
                          window.location.pathname === '/agent' ? (
                              <Agent/>
                          ):null
                      }
                      {/*General*/}
                      {
                          window.location.pathname === '/general' ? (
                              <General/>
                          ):null
                      }
                      {/*Lista progetti*/}
                      {
                          window.location.pathname === '/projects' ? (
                              <ProjectsList/>
                          ):null
                      }
                      {/*Progetto*/}
                      {
                          window.location.pathname === '/project' ? (
                              <Project/>
                          ):null
                      }
                      {/*Profilo*/}
                      {
                          window.location.pathname === '/profile' ? (
                              <Profile/>
                          ):null
                      }
                      {/*Profilo*/}
                      {
                          window.location.pathname === '/' ? (
                              <Landing/>
                          ):null
                      }



                  </div>

              </main>
          </div>
      )
  }

}
