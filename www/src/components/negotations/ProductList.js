import React, { useState, useEffect } from 'react';
import RenderList from '../../utils/RenderList';
import {URL} from '../../index'
import { useLocation } from 'react-router-dom';

function ProductList({ products, relations, relation_prod }) {
  const [selectedRelations, setSelectedRelations] = useState([]);
  
  useEffect(() => {
    setSelectedRelations(relations);
  }, [relations]);

  const handleCheckboxChange = (event, productId) => {
    const { checked } = event.target;

    let newSelectedRelations = [...selectedRelations];

    if (checked) {
      // Add product id to selectedRelations if it's not already present
      if (!selectedRelations.includes(productId)) {
        newSelectedRelations.push(productId);
      }
    } else {
      // Remove product id from selectedRelations
      newSelectedRelations = selectedRelations.filter(
        (id) => id !== productId
      );
    }
    setSelectedRelations(newSelectedRelations);
  };

  const [selled, setSelled] = useState(relation_prod.map(item => item));
  useEffect(() => {
    setSelled(relation_prod.map(item => item));
  }, [relation_prod]);

  const handleChangeSelled = (index, event) => {
    const newValues = [...selled];
    newValues[index] = event.target.value;
    setSelled(newValues);
  };
  return (
    <div>
      <table className='table table-bordered mt-4 mb-3'>
        <thead>
          <tr>
            <td>Prodotti</td>
            <td>Numero Articoli</td>
          </tr>
        </thead>
      {products.map((product,index) => (
       <tr>
         <td>
       <div key={product.id}>
          <div className="form-check">
              <input className="form-check-input" 
              type="checkbox" 
              value={product.id} 
              id={product.id} 
              name="products[]" 
              checked={selectedRelations.includes(product.id)}
              onChange={(event) => handleCheckboxChange(event, product.id)}/>   
              <label className="form-check-label" for={product.id}>{product.nome_prodotto}</label>
            </div>  
        </div>
        </td>
        <td>
          <input type="number" name="selled[]"  onChange={(event) => handleChangeSelled(index, event)} value={selled[index]} placeholder='numero articoli' className='form-input w-100'></input>
        </td>
        </tr>
      ))}
      </table>
      
    </div>
  );
}

export default ProductList;