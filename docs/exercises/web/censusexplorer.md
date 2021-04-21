# The Census Explorer Spring Application

In this exercise, you will look at and modify a sample Spring web application that displays information about UK geography, which you hopefully already know from your databases exercises.

## Set-Up

We will work on a Java application that uses a database connection and that you can connect to with a web browser. The simplest way to do this is to use the Alpine VM as the database server, and do both the Java development and access the application from your host OS, where you have presumably already installed Java and Maven and where you can use your favourite text editor or IDE. If you prefer, you can develop and run the application on the Alpine VM itself, then you will only need a browser but not a Java/JDK installation on your host machine - but you will be restricted to a terminal-based editor for development.

You will only need to run the following steps once (unless you rebuild the VM).

1\. Open the Vagrantfile for your VM and add the following line, just beneath the `synced_folder` one:

    config.vm.network "forwarded_port", guest: 3306, host: 3306

This makes connections to port 3306 on your host (the default for mysql/mariadb) forward to port 3306 on the VM (where we will set up the server).

If you want to develop on the VM, then add another copy of the line with both instances of 3306 replaced by 8080, as that is the port the web application will use. In this case you can skip steps 2 and 3.

Restart your VM by logging out and doing `vagrant halt` then `vagrant up`.

2\. Start the VM and enter the command `netstat -tan` which shows which services are listening on which ports. You should see one on `0.0.0.0:22` (that's the ssh server), but nothing on 3306 yet. Run `cat /etc/my.cnf` to display the main mariadb configuration file, and notice the line `!includedir /etc/my.cnf.d`. Do a `ls` on that folder to see there is one file `mariadb-server.cnf`, edit it as root (e.g. with nano). Notice these lines:

    [mysqld]
    skip-networking

This means that the server is not listening on port 3306 (remember, we were connecting over a socket file) but we need to change that as a socket file won't allow a connection from a different machine. Comment out the `skip-networking` line by putting a `#` in front, save the file, then reload mariadb with `sudo rc-service mariadb restart`. Try another `netstat -tan`, and you should see a row with state LISTEN and a local address like `:::3306` which is the mariadb server now listening on a network port.

3\. The server is now listening on the network, but it will refuse connections for security reasons from remote machines. Find the mariadb root password (it's in `/vagrant/secure-setup.sql` if you followed my instructions) and log in to mariadb as root (`mysql -u root -p` then enter the password).

Run the command `SELECT name, host FROM mysql.user;` and you should see an entry with user vagrant and host localhost. We now want to allow vagrant to log in from anywhere, so run this:

    UPDATE mysql.user SET host='%' WHERE name='vagrant';

`vagrant` can now log in from anywhere, but back when we created the databases, the `sample-data.sql` contained the line `GRANT ALL ON census.* to 'vagrant'@'localhost';` which we need to update now to allow remote access. Grants are entries in `mysql.db`, try this:

    SELECT user, host, db FROM mysql.db;

You should see the entries for `vagrant`. The table has a lot of other columns, you can list them with `DESCRIBE mysql.db;` - each one controls a particular privilege. But what we want to do is let vagrant log in from anywhere, so type this:

    UPDATE mysql.db SET host = '%' WHERE user = 'vagrant';
    FLUSH PRIVILEGES;

Mariadb will now let vagrant log in and access the census and other databases remotely. Note that root can not log in remotely, as that would be bad security practice. To adminster the database, you SSH into the machine itself and then log in from there.

After this crash course in mariadb user administration, you can now log out of mariadb, but keep the VM running. It is now working as a database server that your host machine can access.

4\. On your development machine where you have Java/JDK and Maven installed, and hopefully git too,

    git clone git@github.com:cs-uob/COMS10012.git

This is the repository behind the unit page for this unit, but it also contains the code for the application in `code/censusexplorer`. If you for some reason don't have git on your host machine but would still like to develop there, go to [https://github.com/cs-uob/COMS10012](https://github.com/cs-uob/COMS10012) and use the _Code_ button then _Download ZIP_, then unzip the file you get.

If you have Java installed but not Maven, you can get Maven from [https://maven.apache.org/](https://maven.apache.org/) - it's just a ZIP file that you unzip, but you do need to add its `bin/` folder to your `PATH` variable after that. You may also have to set the `JAVA_HOME` variable to point to your JDK, if this isn't done already.

5\. If you are developing on the Alpine VM directly, and you have skipped steps 2 and 3, then you need to make one minor change to tell the application to use a socket rather than a network connection: in `code/censusexplorer/src/main/resources/application.properties`, add the following string to the end of the `spring.datasource.url` line, with no space before it and the previous text:

    &localSocket=/var/run/mysqld/mysqld.sock

This gets you back a socket file connection instead of a network one.

## Building and running

Go to the folder `code/censusexplorer` in a terminal (Windows CMD should work fine too, but not powershell) and run `mvn spring-boot:run`. This will download all the dependencies, compile the code, and run the application on port 8080 on your development machine. 

When the application is running, open a web browser on your host machine, and go to [http://localhost:8080](http://localhost:8080). You should see the main page of the application.

Whenever you make changes to the code, you can stop the server with Control+C (press this _twice_ if you're on windows, for technical reasons), then rerun the maven command which will recompile any changed java files and bring the server up again.

If there is a compiler error, the application won't start; if there is a spring error, the application will start but will throw an exception either at startup, or when you try and access whichever page is causing the error. The exception text in your terminal might be useful to determine what the problem is.

## Structure of the application

When you open `http://localhost:8080` in your browser, the HTTP request goes to the server that spring sets up, and lands with a class called `DispatcherServlet` which is responsible for deciding which of your functions to call. Classes that can react to web requests are called _Controllers_, and when spring starts, it scans all the classes in the packages below the application class for ones with an annotation that declares them to be a controller. 

All java classes are in `src/main/java`, and in this folder the normal Java folder naming conventions apply - I've chosen to make a package `uk.ac.bristol.cs.censusexplorer` so there are subfolders with those names. From now on, when I say `censusexplorer.SOMETHING`, I am referring to that folder structure, so the full path to `censusexplorer.controller.MainController` from the root of the repository is

    code/censusexplorer/src/main/java/uk/ac/bristol/cs/censusexplorer/controller/MainController.java

If you have an editor that understands this naming convention, for example Visual Studio Code or a Java IDE, then you should be able to find the class quite easily in the tree view that is normally on the left of your screen.

In the class `censusexplorer.controller.MainController`, you can see that:

  - The class is annotated with `@RestController`. This is what spring picks up to know that there are methods in this class that can react to web requests.
  - The method is annotated `@GetRequest("/")`, which means HTTP requests for `GET /` are sent by the `DispatcherServlet` to this method.
  - The method itself just displays an `index.html` (which lives in `src/main/resources/templates`), after running it through the thymeleaf templating engine. More on this soon.
  - The `@Autowired` annotation on the templates instance (in the `censusexplorer` package) tells spring that when we use this controller, we would like an instance of the `Templates` class to be ready for us to use. It is up to spring how it does this (e.g. different calls to the same method might get the same instance of the class, or not) unless we tell spring otherwise in its configuration. In principle, the `Templates` class itself could contain `@Autowired` members of other classes, and spring would then have to sort out in what order to create everything. This is the heart of what the spring framework is built for, and is sometimes called _Dependency Injection_ or _Inversion of Control (IoC)_.
  - The `censusexplorer.Templates` class itself is not too interesting: it just sets up Thymeleaf, as we saw earlier, except that it now uses the `HTML` template mode. Note the `@Component` annotation which tells spring that it's in charge of managing this class.
  - In the `index.html` file (in `src/main/resources/templates`), we see some tags annotated with `th:` which means thymeleaf. The idea here is that some parts of the application, like the left menu and the stylesheet, are the same on all pages and we don't want to repeat them for every page we write. The `th:replace` tells thymeleaf to replace this tag with a fragment of another file (`layout.html`). Fragments can take parameters, for example we pass a title along to the `head` fragment since that is where the page title goes.
  - `layout.html` (in the same folder) contains some blocks annotated with `th:fragment` which can be reused on other pages. The interesting line is `<title th:text="${title}"></title>` which means replace the contents of this tag with the value of the parameter `title`.

## Viewing the countries list

Click the countries link in the left bar. The following sequence of steps happens:

  - The browser interprets the link `<a href="/country/all">Countries</a>` (from the source in `layout.html`) and sends a HTTP request `GET /country/all HTTP/1.1` as you can see in your browser's F12 tools on the Network tab (you need to open the tab before clicking the link for this to work).
  - The request arrives at spring's `DispatcherServlet` which maps it to `displayCountries()` in the `censusexplorer.controller.CountryController` class.
  - The method has an `@Autowired` instance of `censusexplorer.repository.CountryRepository`, so spring provides one. This class is actually just an interface that inherits from the `JpaRepository` class, whose documentation you can see [in the spring javadocs](https://docs.spring.io/spring-data/jpa/docs/2.4.5/api/index.html?org/springframework/data/jpa/repository/JpaRepository.html). It is one of many ways to access a database, and provides methods such as `findAll()` and `getOne(ID)`. Spring and the database client (in our case, Hibernate) sort out which class to return for the repository implementation.
  - The `CountryRepository` is declared as a sub-interface of `JpaRepository<Country, String>` where the first parameter is the entity class, and the second is the class of the primary key type. The entity class is `censusexplorer.model.Country` which carries the usual JPA annotations to explain how it maps to a database table. For example, `@OneToMany(mappedBy = "parent") private List<Region> regions;` manages the one-to-many association that one country can contains many regions.
  - In case you wondered, the database connection string itself is in `src/main/resources/application.properties`.
  - Back to the `CountryController`, the first line in the method ends up doing the equivalent of `SELECT * FROM Country`; you can see the actual SQL queries in the terminal where the spring server is running.
  - Next, we ask thymeleaf to render the `country_list.html` template (from `src/main/resources/templates/`), with the parameter "countries" set to the list of countries that we just loaded (this is what the thymeleaf context class is for). In the html file, we first use thymeleaf to import the standard header and navigation bar, then we create a list with one item per country:
  
        <ul th:each="country: ${countries}">
          <li><span th:text="${country.name}"></span> (<a th:href="'/country/show/' + ${country.code}" th:text="${country.code}"></a>)</li>
        </ul>
    
    The `th:each` is the equivalent of the Java code `for (country : countries)`, at least if this were allowed without mentioning the type of the variable explicitly. If the list is empty, thymeleaf skips the `ul` tag completely; if not, it writes out the tag (and the closing tag) and runs the body once per element in the list. The basic rules for thymeleaf in HTML mode are that you can prefix `th:` on an attribute to tell thymeleaf to evaluate its value and then set the attribute to that, and you can use the special `th:text` to refer to the body of the current tag. Within these expressions, `${...}` interpolates a variable. Since you already use double quotes for the attributes themselves, you use single quotes for strings inside the attributes such as the `'/country/show'` prefix.

_Exercise_: mentally go through the same list as above, but for viewing an individual country (e.g. when you click the link after "England" on the countries page). There is one extra step to deal with the URL parameter, and the html file is a different one. Look at the files and try and make sense of how the different parts come together to produce the page that you see.

## Coding exercise

The demo application can display countries, regions and counties. There is no link for all counties in the menu because there are a lot of them, but you can view a region and click one of its counties to view its details.

Your exercise is to implement a `WardController` and the other necessary files to view the details of a ward, in the same way as viewing the details of a county (except that wards don't have "children"). Finally, edit the county files to implement the TO DO part so that when you view a county, you can select its wards from a list.

About half this exercise is copy-pasting, and the other half is figuring out what you need to change. For every piece of code that you change, try and explain to yourself (or to someone else) what it does.
