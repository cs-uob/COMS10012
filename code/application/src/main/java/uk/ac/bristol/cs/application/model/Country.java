package uk.ac.bristol.cs.application.model;

import java.io.Serializable;
import java.util.Objects;
import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
public class Country implements Serializable {
    private @Id String code;
    private String name;
    
    public String getName() { return name; }
    public String getCode() { return code; }

    public void setName(String name) { this.name = name; }
    public void setCode(String code) { this.code = code; }

    @Override
    public int hashCode() {
        int hash = 3;
        hash = 83 * hash + Objects.hashCode(this.code);
        hash = 83 * hash + Objects.hashCode(this.name);
        return hash;
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj) {
            return true;
        }
        if (obj == null) {
            return false;
        }
        if (getClass() != obj.getClass()) {
            return false;
        }
        final Country other = (Country) obj;
        return Objects.equals(this.name, other.name);
    }
}
