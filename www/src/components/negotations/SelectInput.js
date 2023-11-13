import { useState } from 'react';

function SelectInput({ options, onSelect, cliente }) {
  const [searchTerm, setSearchTerm] = useState('');

  const [client,setClient] = useState(cliente);

  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  function handleSelect(event) {
    const selectedValue = event.target.id;
    const selectedOption = options.find((option) => option.value === selectedValue);
    onSelect(selectedOption);
    setClient(selectedOption);
  }

  function handleSearchTermChange(event) {
    setSearchTerm(event.target.value);
  }

  return (
    <div className="input-group mb-3">
      <label className="input-group-text" id="basic-addon1">Cliente</label>
      <input type="text" className="form-control" placeholder="Cerca Cliente" value={searchTerm} onChange={handleSearchTermChange} />
      <select name="cliente" className="form-select" value={client} onChange={handleSelect}>
        {filteredOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
export default SelectInput