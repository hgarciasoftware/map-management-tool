import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import accessibleAutocomplete from 'accessible-autocomplete';
import PersonService from '../services/PersonService';

import states from '../data/states.json';

import 'accessible-autocomplete/dist/accessible-autocomplete.min.css';

function Home() {
  const navigate = useNavigate();
  const ref = useRef();

  useEffect(() => {
    accessibleAutocomplete({
      element: ref.current,
      id: 'state',
      name: 'state',
      source: states
    });
  }, []);

  async function handleSubmit(event) {
    event.preventDefault();

    const form = event.target;
    const body = {
      name: form.name.value,
      state: form.state.value
    };

    await PersonService.createPerson(body);
    navigate('/map');
  }

  return (
    <div className="container-sm mt-3" style={{maxWidth: '33.75rem'}}>
      <h1 className="text-center">map management tool</h1>
      <p className="fw-bold mt-4">the home page provides users with a form to enter basic information about themselves.</p>
      <p className="fw-bold">upon submission, the information is recorded in an external database and users are then redirected to the choropleth page.</p>
      <p className="fw-bold">currently, only users' names and (us) states are recorded. the state input utilizes an accessible autocomplete component.</p>
      <hr />
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name" className="form-label">NAME</label>
          <input className="form-control" id="name" name="name" />
        </div>
        <div className="mt-3">
          <label htmlFor="state" className="form-label">STATE</label>
          <div id="state" ref={ref}></div>
        </div>
        <div className="mt-3">
          <button className="btn btn-success">SUBMIT</button>
        </div>
      </form>
    </div>
  );
}

export default Home;
