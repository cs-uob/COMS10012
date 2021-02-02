# Hibernate

JDBC lets us connect to a database and pull out data, but we have to do a lot of manual coding to check and convert types, deal with result sets and exceptions etc. We can abstract away most of this into a service class like the `DataService` at the end of the last page, but we still have to write the data service - even though it is a lot of boilerplate code that we almost need to copy-paste from a template for each new class. We could write a script that given an ER diagram in some machine-readable format, automatically generates a data service for this class to automate all this - or we could use Hibernate to do this for us.

Hibernate is an object-relational mapping (ORM) framework, that is to say it automatically generates an advanced form of data service at runtime which includes many extra features such as sessions, transactions, caches and connection pools. It implements the Java Persistence Api (JPA), an API that in turn builds on JDBC for the purpose of implementing ORMs. Actually Hibernate has its own features that go beyond JPA, such as its own query language.

In a real application, you will be using an ORM most of the time, but you can fall back to SQL for more advanced queries that the ORM cannot support easily.

## Example application

There is an example application in [resources/orm/orm.tar](../resources/jdbc-example.tar) which you can download and extract in your VM.

The POM file simply has an extra dependency on Hibernate:

```xml
<dependency>
    <groupId>org.hibernate</groupId>
    <artifactId>hibernate-core</artifactId>
    <version>5.4.27.Final</version>
</dependency>
```

Hibernate's configuration lives in `src/main/resources/hibernate.cfg.xml`. Hibernate uses a _Session Factory_ to create sessions, in which you can make queries:

```xml
<?xml version = "1.0" encoding = "utf-8"?>
<!DOCTYPE hibernate-configuration SYSTEM 
"http://www.hibernate.org/dtd/hibernate-configuration-3.0.dtd">
<hibernate-configuration>
  <session-factory>
    
    <!-- These properties set up the database connection. -->
    <property name="dialect">org.hibernate.dialect.MySQLDialect</property>
    <property name="connection.url">jdbc:mariadb://localhost/elections?localSocket=/var/run/mysqld/mysqld.sock</property>
    <property name="connection.username">vagrant</property>
    
    <!-- Don't use this in production, use a connection pool instead. -->
    <property name="current_session_context_class">thread</property>

    <!-- Display generated SQL on the console. -->
    <property name="show_sql">true</property>

    <!-- The classes to map to database tables. -->
    <mapping class="org.example.Candidate" />
    <mapping class="org.example.Party" />
    <mapping class="org.example.Ward" />
    
  </session-factory>
</hibernate-configuration>
```

  - The _dialect_ selects the SQL dialect to speak to the database, in this case _MySQL_ (there's no separate MariaDB one because the two are for all practical purposes identical).
  - The connection string lives in `connection.url`, minus the username/password because there are separate properties for these. Note though that we have included the socket option here.
  - Username and, if you need it, password go in separate properties.
  - The connection pool is really important for performance in real applications, but we don't bother with that here and just say one connection per thread (we don't use multiple threads in our program so it doesn't matter as much).
  - `show_sql` is a debuging property that prints all generated SQL to standard output. This is useful to know about when debugging your own applications.
  - Finally, we list all the classes we want Hibernate to take care of. In SPE, you are going to use the Spring Framework which takes care of this automatically, but for now we're listing them all.

The classes themselves are standard Java value classes (private fields, public getter/setter) decorated with JPA annotations to explain to Hibernate how they work:

```java
import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
public class Party {
    @Id private int id;
    private String name;
    
    public Party() {}
    
    public int getId()      { return id; }
    public String getName() { return name; }

    public void setId(int id)         { this.id = id; }
    public void setName(String name)  { this.name = name; }
}
```

  - `@Entity` means this is something that maps to a table in the database. By default, Hibernate guesses the table name from the class name, but you could change this with a parameter e.g. `@Entity(name="Parties")`.
  - `@Id` indicates the primary key.

The candidate class is a bit more interesting as it has foreign keys:

```java
@ManyToOne 
@JoinColumn(name = "party")
private Party party;
```

  - `@ManyToOne` tells Hibernate that this is a foreign key for a many-to-one relationship (there is also `@ManyToMany`).
  - `@JoinColumn` sets the name of the foreign key column, as the default here would be `party_id`.