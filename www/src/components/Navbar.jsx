import React, {useState,useEffect} from 'react'
import { BrowserRouter as Router, Link, Route, Routes } from 'react-router-dom';
import { URL } from '../index'
import RenderList from '../utils/RenderList'

export const Navbar = () => {
  const data = RenderList(URL+'session_data');

  //Ricerca link
  const [searchTerm, setSearchTerm] = useState('');
  const [links, setLinks] = useState([
    { id: 1, url: '/profile', name: 'Profilo' },
    { id: 2, url: '/agents', name: 'Agenti' },
    { id: 3, url: '/roles', name: 'Ruoli' },
    { id: 4, url: '/categories', name: 'Categorie' },
    { id: 5, url: '/fases', name: 'Fasi' },
    { id: 6, url: '/products', name: 'Prodotti' },
    { id: 7, url: '/motivations', name: 'Motivazioni Perdite' },
    { id: 8, url: '/stallo', name: 'Tempo Stallo' },
    { id: 9, url: '/leads', name: 'Clienti' },
    { id: 10, url: '/negotations', name: 'Trattativa' },
    { id: 11, url: '/general', name: 'Area Generale' },
    { id: 12, url: '/dashboard', name: 'DashBoard' },
    { id: 13, url: '/projects', name: 'Progetti' },
    { id: 14, url: '/logout', name: 'Logout' },

  ]);
  const [showList, setShowList] = useState(false);

  const handleChange = (event) => {
    const value = event.target.value;
    setSearchTerm(value);
    setShowList(value.trim().length > 0);
  };

  const filteredLinks = links.filter((link) =>
    link.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return (
    <div>
    <nav className="navbar navbar-expand-lg bg-body-tertiary bg-primary">
  <div className="container-fluid">
    <a className="navbar-brand" href="#">{data.fullname}</a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link className="nav-link active" to="/profile">Profilo</Link>
        </li>
        <li className="nav-item">
        <Link className="nav-link active" to="/agents">Agenti</Link>
        </li>
        
        <li className="nav-item dropdown">
          <a className="nav-link active dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Impostazioni
          </a>
          <ul className="dropdown-menu">
            <li><Link className="dropdown-item" to="/roles">Ruoli</Link></li>
            <li><Link className="dropdown-item" to="/categories">Categorie</Link></li>
            <li><Link className="dropdown-item" to="/fases">Fasi trattative</Link></li>
            <li><Link className="dropdown-item" to="/products">Prodotti</Link></li>
            <li><Link className="dropdown-item" to="/motivations">Motivazione perdita</Link></li>
            <li><Link className="dropdown-item" to="/stallo">Tempo stallo</Link></li>
          </ul>
        </li>
      </ul>
      <form className="d-flex" role="search">
        <div className="d-block">
        <input className="form-control me-2" type="search" placeholder="Pagine" aria-label="Search" onChange={handleChange} value={searchTerm} />
        {showList && (
        <ul class="list-group position-absolute list-group-flush bg-light">
          {filteredLinks.map((link) => (
            <li key={link.id} className="list-group-item">
              <a href={link.url}>{link.name}</a>
            </li>
          ))}
        </ul>
      )}
        </div>
      </form>
    </div>
  </div>
</nav>
   
  </div>
  )
}
