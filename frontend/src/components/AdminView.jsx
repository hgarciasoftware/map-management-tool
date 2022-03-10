import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PersonService from '../services/PersonService';

function AdminView() {
  const [people, setPeople] = useState([]);

  useEffect(() => {
    (async () => {
      const { data } = await PersonService.getAllPeople();

      setPeople(data);
    })();
  }, []);

  return (
    <div className="container">
      {people.map(person => {
        return (
          <div
            className="d-flex align-items-center justify-content-between mt-4 px-4 py-3"
            style={{backgroundColor: 'var(--bs-gray-300)'}}
            key={person.id}
          >
            <span>{person.name} (id: {person.id})</span>
            <div>
              <Link className="btn btn-success" to={`update/${person.id}`}>
                <i className="bi-pencil-square"></i>
                UPDATE
              </Link>
              <Link className="btn btn-danger ms-2" to={`delete/${person.id}`}>
                <i className="bi-trash"></i>
                DELETE
              </Link>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default AdminView;
