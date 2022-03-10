package map.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import map.exception.ResourceNotFoundException;
import map.model.Person;
import map.repository.PersonRepository;

@CrossOrigin
@RestController
public class PersonController {
  @Autowired
  private PersonRepository personRepository;

  @PostMapping("/add")
  public Person newPerson(@RequestBody Person p) {
    return personRepository.save(p);
  }

  @GetMapping("/all")
  public List<Person> getAllPersons() {
    return personRepository.findAll();
  }

  @GetMapping("/person/{id}")
  public ResponseEntity<Person> getPersonById(@PathVariable int id) {
    Person person = personRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Person not found"));

    return ResponseEntity.ok(person);
  }

  @GetMapping("/count")
  public List<Object[]> countStates() {
    return personRepository.countPeopleByState();
  }

  @PutMapping("/person/{id}")
  public ResponseEntity<Person> modifyPerson(@PathVariable int id, @RequestBody Person person) {
    Person p = personRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Person not found"));

    p.setName(person.getName());
    p.setState(person.getState());

    Person updatedPerson = personRepository.save(p);

    return ResponseEntity.ok(updatedPerson);
  }

  @DeleteMapping("/person/{id}")
  public String deletePerson(@PathVariable int id) {
    personRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Person not found"));
    personRepository.deleteById(id);

    return "The person with id: " + id + " has been removed from the database.";
  }
}
