package uk.ac.bristol.cs.application.model;

import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
public class Ward {
    private @Id String code;
    private String name;
    
    public String getName() { return name; }
    public String getCode() { return code; }

    public void setName(String name) { this.name = name; }
    public void setCode(String code) { this.code = code; }
}
