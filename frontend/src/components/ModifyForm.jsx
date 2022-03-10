import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import accessibleAutocomplete from 'accessible-autocomplete';
import PersonService from '../services/PersonService';

import states from '../data/states.json';

function ModifyForm() {
  const ref = useRef();
  const [person, setPerson] = useState({id: '', name: '', state: ''});
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    (async () => {
    const { data } = await PersonService.getPersonById(id);

    setPerson(data);
    accessibleAutocomplete({
      defaultValue: data.state,
      element: ref.current,
      id: 'state',
      name: 'state',
      source: states
    });
    })();
  }, [id]);

  async function handleSubmit(event) {
    event.preventDefault();

    const form = event.target;
    const body = {
      name: form.name.value,
      state: form.state.value
    };

    await PersonService.modifyPerson(id, body);
    navigate('/admin');
  }

  return (
    <div className="container-sm mt-3" style={{maxWidth: '33.75rem'}}>
      <h1 className="text-center">update person</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name" className="form-label">NAME</label>
          <input className="form-control" id="name" name="name" defaultValue={person.name} />
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

export default ModifyForm;
