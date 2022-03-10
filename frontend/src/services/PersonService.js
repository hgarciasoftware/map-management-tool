import axios from 'axios';

const API_URL = 'https://mod3-maptool.herokuapp.com';

class PersonService {
  createPerson(person) {
    return axios.post(API_URL + '/add', person);
  }

  deletePerson(id) {
    return axios.delete(API_URL + '/person/' + id);
  }

  getAllPeople() {
    return axios.get(API_URL + '/all');
  }

  getPersonById(id) {
    return axios.get(API_URL + '/person/' + id);
  }

  getStateCount() {
    return axios.get(API_URL + '/count');
  }

  modifyPerson(id, person) {
    return axios.put(API_URL + '/person/' + id, person);
  }
}

export default new PersonService();
