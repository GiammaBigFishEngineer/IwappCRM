import React, {useState, useEffect} from 'react'
import { URL } from '../../index'
import RenderList from '../../utils/RenderList'
import { Form, FormGroup, Label, Input } from 'reactstrap';
import './task.css'

export const AssignAgents = ({task_id}) => {
  const agents_assigned = RenderList(URL+'lista_agenti_task?task_id='+task_id)
  const agents = RenderList(URL+'agenti');

  //Sezione per anteprima selezione  
  const [selectedOptions, setSelectedOptions] = useState([]);
  useEffect(() => {
    const defaultSelectedOptions = agents
      .filter((agent) => agents_assigned.find((qr) => qr.agent === agent.id))
      .map((agent) => agent.fullname);
    setSelectedOptions(defaultSelectedOptions);
  }, [agents, agents_assigned]);
  
  const handleOptionChange = (e) => {
    const { options } = e.target;
    const selectedOptions = Array.from(options)
      .filter((option) => option.selected)
      .map((option) => option.className);
    setSelectedOptions(selectedOptions);
  };

  return (
      <div className='assign_agents mt-4 '>

<div>
      <FormGroup>
        <Label for="multi-select">Seleziona una o più opzioni:</Label>
        <Input type="select" id="multi-select" multiple onChange={handleOptionChange} name="relations[]">
          {agents.map(item => (
          <option className={item.fullname} key={item.id} value={item.id}
          selected = {agents_assigned.find((qr) => qr.agent === item.id) !== undefined}
          >{item.fullname}</option>
          ))}
        </Input>
      </FormGroup>
      <FormGroup>
        <Label>Anteprima selezione:</Label>
        {selectedOptions.length > 0 && (
          <ul class="list-group">
          <li class="list-group-item active" aria-current="true">Agenti Selezionati</li>
          {selectedOptions.map((option) => (
               <li class="list-group-item">{option}</li>
            ))}
        </ul>
          
        )}
        {selectedOptions.length === 0 && <p>Nessuna opzione selezionata</p>}
      </FormGroup>
    </div>

       
      </div>

  )
}
