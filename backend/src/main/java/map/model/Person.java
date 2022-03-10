package map.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="people")
public class Person {
  @Id
  @GeneratedValue(strategy=GenerationType.IDENTITY)
  private int id;

  private String name;
  private String state;

  public Person() {}

  public Person(String name, String state) {
    super();
    this.name = name;
    this.state = state;
  }

  public int getId() {
    return id;
  }

  public String getName() {
    return name;
  }

  public String getState() {
    return state;
  }

  public void setName(String name) {
    this.name = name;
  }

  public void setState(String state) {
    this.state = state;
  }

  @Override
  public String toString() {
    return "Person [name=" + name + ", state=" + state + "]";
  }
}
