import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import PersonService from '../services/PersonService';

function DeleteForm() {
  const [person, setPerson] = useState({id: '', name: '', state: ''});
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    (async () => {
    const { data } = await PersonService.getPersonById(id);

    setPerson(data);
    })();
  }, [id]);

  async function handleSubmit(event) {
    event.preventDefault();
    await PersonService.deletePerson(id);
    navigate('/admin');
  }

  return (
    <div className="container-sm mt-3" style={{maxWidth: '33.75rem'}}>
      <h1 className="text-center">delete person</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name" className="form-label">NAME</label>
          <input className="form-control" id="name" name="name" value={person.name} readOnly={true} />
        </div>
        <div className="mt-3">
          <label htmlFor="state" className="form-label">STATE</label>
          <input className="form-control" id="state" name="state" value={person.state} readOnly={true} />
        </div>
        <div className="mt-3">
          <button className="btn btn-success">SUBMIT</button>
        </div>
      </form>
    </div>
  );
}

export default DeleteForm;
