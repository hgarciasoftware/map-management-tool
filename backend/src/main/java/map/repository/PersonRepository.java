package map.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import map.model.Person;

@Repository
public interface PersonRepository extends JpaRepository<Person, Integer> {
  @Query("SELECT state, COUNT(state) FROM Person GROUP BY state")
  List<Object[]> countPeopleByState();
}
