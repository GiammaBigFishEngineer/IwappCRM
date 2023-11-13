import React, { useState } from 'react';
import { Form, FormGroup, Label, Input } from 'reactstrap';

const MultiSelect = () => {
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleOptionChange = (e) => {
    const { value } = e.target;
    const index = selectedOptions.indexOf(value);
    if (index === -1) {
      setSelectedOptions([...selectedOptions, value]);
    } else {
      const updatedOptions = [...selectedOptions];
      updatedOptions.splice(index, 1);
      setSelectedOptions(updatedOptions);
    }
  };

  return (
    <div>
      <FormGroup>
        <Label for="multi-select">Seleziona una o più opzioni:</Label>
        <Input type="select" id="multi-select" multiple onChange={handleOptionChange}>
          <option value="opzione1">Opzione 1</option>
          <option value="opzione2">Opzione 2</option>
          <option value="opzione3">Opzione 3</option>
          <option value="opzione4">Opzione 4</option>
        </Input>
      </FormGroup>
      <FormGroup>
        <Label>Anteprima selezione:</Label>
        {selectedOptions.length > 0 && (
          <ul>
            {selectedOptions.map((option) => (
              <li key={option}>{option}</li>
            ))}
          </ul>
        )}
        {selectedOptions.length === 0 && <p>Nessuna opzione selezionata</p>}
      </FormGroup>
    </div>
  );
};

export default MultiSelect;