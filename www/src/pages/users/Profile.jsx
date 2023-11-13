import React from 'react'
import { URL } from '../..'
import RenderList from '../../utils/RenderList'

const Profile = () => {
    const stats = RenderList(URL+'profilo');
    const data = RenderList(URL+'session_data');

  return (
    <div className="container mt-5">
        <div className="row bg-light" style={{borderRadius:"10px"}}>
            <div className="col text-center">
            <h2>{data.fullname}</h2>
            <p>{data.email}</p>
            </div>
            <div className="col text-center">
            <h2>Ruolo: {data.nome_ruolo}</h2>
            <p>Agente di: {data.nome_referente}</p>
            </div>
        </div>
        <div className="row text-center bg-light mt-3">
            <h2>Le tue statistiche</h2>
            <div className="col">
                <div class="card w-75 mx-auto mb-3 border-primary">
                    <div class="card-body">
                        <div class="row">
                            <div className="col">
                                <h6 class="text-muted text-uppercase mt-0">Trattative Vinte Quest'anno</h6>
                                <h2 class="m-b-20">{stats[0]}</h2>
                            </div>
                            <div class="col text-center my-auto ">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" class="bi bi-trophy" viewBox="0 0 16 16">
                                    <path d="M2.5.5A.5.5 0 0 1 3 0h10a.5.5 0 0 1 .5.5c0 .538-.012 1.05-.034 1.536a3 3 0 1 1-1.133 5.89c-.79 1.865-1.878 2.777-2.833 3.011v2.173l1.425.356c.194.048.377.135.537.255L13.3 15.1a.5.5 0 0 1-.3.9H3a.5.5 0 0 1-.3-.9l1.838-1.379c.16-.12.343-.207.537-.255L6.5 13.11v-2.173c-.955-.234-2.043-1.146-2.833-3.012a3 3 0 1 1-1.132-5.89A33.076 33.076 0 0 1 2.5.5zm.099 2.54a2 2 0 0 0 .72 3.935c-.333-1.05-.588-2.346-.72-3.935zm10.083 3.935a2 2 0 0 0 .72-3.935c-.133 1.59-.388 2.885-.72 3.935zM3.504 1c.007.517.026 1.006.056 1.469.13 2.028.457 3.546.87 4.667C5.294 9.48 6.484 10 7 10a.5.5 0 0 1 .5.5v2.61a1 1 0 0 1-.757.97l-1.426.356a.5.5 0 0 0-.179.085L4.5 15h7l-.638-.479a.501.501 0 0 0-.18-.085l-1.425-.356a1 1 0 0 1-.757-.97V10.5A.5.5 0 0 1 9 10c.516 0 1.706-.52 2.57-2.864.413-1.12.74-2.64.87-4.667.03-.463.049-.952.056-1.469H3.504z"/>
                                    </svg>
                            </div>
                            
                        </div>
                        
                    </div> 
                    
                </div>
            </div>
            <div className="col">
                <div class="card w-75 mx-auto mb-3 border-primary">
                    <div class="card-body">
                        <div class="row">
                            <div className="col">
                                <h6 class="text-muted text-uppercase mt-0">Trattative Perse Quest'anno</h6>
                                <h2 class="m-b-20">{stats[1]}</h2>
                            </div>
                            <div class="col text-center my-auto ">
                                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" class="bi bi-emoji-frown" viewBox="0 0 16 16">
                                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                                    <path d="M4.285 12.433a.5.5 0 0 0 .683-.183A3.498 3.498 0 0 1 8 10.5c1.295 0 2.426.703 3.032 1.75a.5.5 0 0 0 .866-.5A4.498 4.498 0 0 0 8 9.5a4.5 4.5 0 0 0-3.898 2.25.5.5 0 0 0 .183.683zM7 6.5C7 7.328 6.552 8 6 8s-1-.672-1-1.5S5.448 5 6 5s1 .672 1 1.5zm4 0c0 .828-.448 1.5-1 1.5s-1-.672-1-1.5S9.448 5 10 5s1 .672 1 1.5z"/>
                                </svg>
                            </div>
                            
                        </div>
                        
                    </div> 
                    
                </div>
            </div>
        </div>
    </div>
  )
}

export default Profile