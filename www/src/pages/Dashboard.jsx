import React, { useEffect, useState } from 'react'
import LineChart from '../components/Dashboard/LineChart'
import MultipleLineChart from '../components/Dashboard/MultipleLineChart'
import BarChart from '../components/Dashboard/BarChart'
import AeroChart from '../components/Dashboard/AeroChart'
import CirclePercentage from '../components/Dashboard/CirclePercentage'
import RenderList from '../utils/RenderList';
import {URL} from '../index'


export const Dashboard = () => {
  const user_data = RenderList(URL+'session_data');
  const [yearSeen,setYearSeen] = useState(user_data.year_seen);
  useEffect(()=>{
    setYearSeen(user_data.year_seen);
  },[user_data])

  const handleChangeYear = (event) =>{
    setYearSeen(event.target.year_seen);
  }

  const data_agents = RenderList(URL+'mensile_agente');
  const tot_agents = RenderList(URL+'totale_agenti');
  const leads_category = RenderList(URL+'categorie_clienti');
  const products_sell = RenderList(URL+'prodotti_venduti');
  const status_neg = RenderList(URL+'trattative_stato');
  const fase_neg = RenderList(URL+'trattative_fase');
  const motivation_neg = RenderList(URL+'motivazioni_perdita');
  const redemption = RenderList(URL+'redemption');
  const categories_red = RenderList(URL+'redemption_categories');
  const agents_red = RenderList(URL+'redemption_agents');

  const categories = RenderList(URL+'categorie');
  const agents = RenderList(URL+'agenti');

  console.log(categories);

  return (
    <div>

      <div className="container p-3">
      <h2 className="text-center mb-5">Tutti i dati della tua azienda</h2>
      <form action={URL+'data_visualizzata'} method="post" className="mb-5 w-25">
      <input name="year_seen" value={yearSeen} onChange={handleChangeYear} className="form-control form-control-sm mb-3" type="number" placeholder="Anno"></input>
      <button type="submit" className="btn btn-secondary btn-sm mb-3">Visualizza anno</button>
      </form>

      <div className="row mb-5 mt-3">
        <div className='col bg-light'>
          <h4 className='text-center'>Incasso totale dei tuoi agenti per mese</h4>
        <LineChart data={tot_agents}/>
        </div>
        <div className='col bg-light'>
          <h4 className='text-center'>Motivazioni delle tue perdite</h4>
          <div className="mx-auto" style={{maxWidth:350}}>
          <AeroChart data={motivation_neg.values} labels={motivation_neg.names}/>
          </div>
        </div>
      </div>

      <div className="row mb-5">
        <div className='col bg-light'>
          <h4 className="text-center">Incasso mensile di ogni tuo agente</h4>
        <MultipleLineChart data={data_agents}/>
        </div>
        <div className='col bg-light'>
          <h4 className="text-center">Prodotti venduti</h4>
        <LineChart data={products_sell}/>
        </div>
      </div>

      <div className='row mb-5'>
        <div className='col bg-light p-2'>
          <p className="text-center">Clienti per categoria</p>
        <BarChart values={leads_category.values} names={leads_category.names} />
        </div>
        <div className='col bg-light p-2'>
          <p className="text-center">Stato Delle trattative</p>
        <BarChart values={status_neg.values} names={status_neg.names} />
        </div>
        <div className='col bg-light p-2'>
          <p className="text-center">Trattative per fase</p>
        <BarChart values={fase_neg.values} names={fase_neg.names} />
        </div>
      </div>

      <div className='row mb-4'>

        <div className='col bg-light p-2'>
          <div class="card p-2" style={{width: '18rem'}}>
            <CirclePercentage percentage={redemption}/>
            <div class="card-body">
              <p class="card-text">Redemption del {yearSeen} è del {redemption}%</p>
            </div>
          </div>
        </div>

        <div className='col bg-light p-2'>

          <p className='text-center'>Redemption Categorie</p>
          <table className='table table-bordered mx-auto'>
            <thead>
            <tr>
              {categories.map(item => (<td>{item.nome_categoria}</td>) )}
            </tr>
            </thead>
            <tbody>
            <tr>
              {categories_red.map(item => (
                  <td>{item}%</td>
              ))}
            </tr>
            </tbody>
          </table>
        </div>

        <div className='col bg-light p-2'>
          <p className='text-center'>Redemption Agenti</p>
          <table className='table table-bordered mx-auto'>
            <thead>
            <tr>
              {agents.map(item => (<td>{item.fullname}</td>) )}
            </tr>
            </thead>
            <tbody>
            <tr>
              {agents_red.map(item => (
                  <td>{item}%</td>
              ))}
            </tr>
            </tbody>
          </table>
        </div>

      </div>

      </div>{/*end container*/}
   
    </div>
  )
}
