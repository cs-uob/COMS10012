package uk.ac.bristol.cs.application.model;

import java.io.Serializable;
import java.util.Objects;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

@Entity
public class Region implements Serializable {
    private @Id String code;
    private String name;
    @ManyToOne(fetch = FetchType.LAZY) @JoinColumn(name="parent")
    private Country parent;
    
    public String getName() { return name; }
    public String getCode() { return code; }
    public Country getParent() { return parent; }

    public void setName(String name) { this.name = name; }
    public void setCode(String code) { this.code = code; }
    public void setParent(Country parent) { this.parent = parent; }
    
    @Override
    public int hashCode() {
        int hash = 7;
        hash = 53 * hash + Objects.hashCode(this.code);
        hash = 53 * hash + Objects.hashCode(this.name);
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
        final Region other = (Region) obj;
        return Objects.equals(this.code, other.code);
    }   
}
