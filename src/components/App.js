// Fichero src/components/App.js
import '../styles/App.scss';
// import api from '../data/api.jsonn'
import { useEffect, useState } from 'react';
import getAdalabers from '../../src/services/apiadalabers';

function App() {
  const [activeSection, setActiveSection] = useState('colapsable');
  const [data, setData] = useState([]);
  const [search, setSearchs] = useState('Todos');
  const [searchInput, setSearchsInput] = useState('');
  const [newAda, setNewAda] = useState({
    name: '',
    counselor: '',
    speciality: '',
    id: '',
    social_networks: [],
  });

  useEffect(() => {
    getAdalabers().then((data) => {
      setData(data.results);
    });
  }, []);
  //HANDLE
  const handleNew = (ev) => {
    setNewAda({ ...newAda, [ev.target.id]: ev.target.value });
  };
  const handleClick = (ev) => {
    ev.preventDefault();
    data.push(newAda);
    setData([...data]);
    setNewAda({
      name: '',
      counselor: '',
      speciality: '',
      id: crypto.randomUUID(),
      social_networks: [],
    });
  };
  const handleOnsubmit = (ev) => {
    ev.preventDefault();
  };
  const handleSearch = (ev) => {
    setSearchs(ev.target.value);
  };
  const handleSearchInput = (ev) => {
    setSearchsInput(ev.target.value);
  };

  const handleClickTable = () => {

    setActiveSection('')
  };
  const handleClickOffTable = () => {

    setActiveSection('colapsable')
  };
  // RENDER
  const htmlData2 = data
    .filter((ada) => ada.counselor === search || search === 'Todos')
    .filter((ada) => ada.name.toLowerCase().includes(searchInput.toLowerCase()))
    .map((ada) => {
      return (
        <tr className="tr" key={ada.id}>
          <td className="tr">{ada.name}</td>
          <td className="tr">{ada.counselor}</td>
          <td className="tr">{ada.speciality}</td>
          <td>
            {ada.social_networks.map((ada, index) => {
              return (
                <span key={index} className="social">
                  {' '}
                  - <a href={ada.url}>{ada.name}</a> -{' '}
                </span>
              );
            })}
          </td>{' '}
        </tr>
      );
    });

  return (
    <div>
      <header className="header">
        <h1 className="header__title">Bootcamp de programación Web </h1>
        </header>
        <section>
        <h3>Con nosotr@s aprenderas las siguientes habilidades</h3>
        <div className='info'>
        <h2>Front-end</h2>
      <p>HTML y CSS</p>
      <p>JavaScript y React</p>
        </div>
        <div className='info'>
        <h2> Back-end</h2>
      <p> Node.JS Express </p>
      <p> SQL </p>
        </div>
      
      <p className='info_text'> A continuacion te presentamos el listado de alumnas y tendras la posibilidad de filtrarlas por nombre e incluso por tutor. Tambien tendras la posibilidad de añadir una nueva alumna, asignarle un tutor y una especialidad</p>
      <div className='btn'>
      <button className='btn' onClick={handleClickTable}>Mostrar alumnas</button>
      <button className='btn' onClick={handleClickOffTable}>Ocultar alumnas</button>
      </div>
     
        </section>
        <div className={`${activeSection}`}>
       <h4 className='social'> Filtrado de alumnas</h4>
      
      <form className="form" onSubmit={handleOnsubmit}>
          <label className="label" htmlFor="searchName">
            Nombre 
          </label>
          <input
            className="header__search"
            autoComplete="off"
            type="text"
            name="name"
            placeholder="Ej. MariCarmen"
            onChange={handleSearchInput}
            value={searchInput}
          />
          <label className="label" htmlFor="counselor">
            Elige tutor
          </label>
          <select
            className="select"
            value={search}
            name="counselor"
            id="counselor"
            onChange={handleSearch}
          >
            <option value="Todos">Todos</option>
            <option value="Yanelis">Yanelis</option>
            <option value="Dayana">Dayana</option>
            <option value="Iván">Iván</option>
          </select>
        </form>
      
      <table className="table" >
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Tutora</th>
            <th>Especialidad</th>
            <th>Redes</th>
          </tr>
        </thead>

        <tbody>{htmlData2}</tbody>
      </table>
      <form className="new-contact__form">
        <h2 className="new-contact__title">Añadir una alumna </h2>
        <label className="label" htmlFor="searchName">
            Nombre 
          </label>
        <input
          className="new-contact__input"
          type="text"
          name="name"
          id="name"
          placeholder="Nombre"
          onInput={handleNew}
          value={newAda.name}
        />
         <label className="label" htmlFor="searchName">
            Tutora
          </label>
        <input
          className="new-contact__input"
          type="text"
          name="counselor"
          id="counselor"
          placeholder="Tutora"
          onInput={handleNew}
          value={newAda.counselor}
        />
         <label className="label" htmlFor="searchName">
            Especialidad
          </label>
        <input
          className="new-contact__input"
          type="text"
          name="speciality"
          id="speciality"
          placeholder="Especialidad"
          onInput={handleNew}
          value={newAda.speciality}
        />
        <input
          className="new-contact__btn"
          type="submit"
          value="Añadir una nueva Adalabers"
          onClick={handleClick}
        />
      </form>
      </div>
      <footer class="footer">
      <h3 class="subtittle">&copy; Bella Garcia Villegas 2022</h3>
    </footer>
    </div>
  );
}

export default App;
