package uk.ac.bristol.cs.application.model;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.JoinColumn;
import javax.persistence.FetchType;

import java.io.Serializable;

@Entity
public class Ward implements Serializable {
    @Id private String code;
    private String name;
    
    @ManyToOne(fetch = FetchType.LAZY) @JoinColumn(name="parent")
    private County parent;

    public String getName() { return name; }
    public String getCode() { return code; }
    public County getParent() { return parent; }

    public void setName(String name) { this.name = name; }
    public void setCode(String code) { this.code = code; }
    public void setParent(County parent) { this.parent = parent; }
}
