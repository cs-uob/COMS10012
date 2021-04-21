# The Census Explorer Spring Application

In this exercise, you will look at and modify a sample Spring web application that displays information about UK geography, which you hopefully already know from your databases exercises.

## Set-Up

We will work on a Java application that uses a database connection and that you can connect to with a web browser. The simplest way to do this is to use the Alpine VM as the database server, and do both the Java development and access the application from your host OS, where you have presumably already installed Java and Maven and where you can use your favourite text editor or IDE. If you prefer, you can develop and run the application on the Alpine VM itself, then you will only need a browser but not a Java/JDK installation on your host machine - but you will be restricted to a terminal-based editor for development.

You will only need to run the following steps once (unless you rebuild the VM).

\1. Open the Vagrantfile for your VM and add the following line, just beneath the `synced_folder` one:

    config.vm.network "forwarded_port", guest: 3306, host: 3306

This makes connections to port 3306 on your host (the default for mysql/mariadb) forward to port 3306 on the VM (where we will set up the server).

If you want to develop on the VM, then add another copy of the line with both instances of 3306 replaced by 8080, as that is the port the web application will use. In this case you can skip steps 2 and 3.

Restart your VM by logging out and doing `vagrant halt` then `vagrant up`.

\2. Start the VM and enter the command `netstat -tan` which shows which services are listening on which ports. You should see one on `0.0.0.0:22` (that's the ssh server), but nothing on 3306 yet. Run `cat /etc/my.cnf` to display the main mariadb configuration file, and notice the line `!includedir /etc/my.cnf.d`. Do a `ls` on that folder to see there is one file `mariadb-server.cnf`, edit it as root (e.g. with nano). Notice these lines:

    [mysqld]
    skip-networking

This means that the server is not listening on port 3306 (remember, we were connecting over a socket file) but we need to change that as a socket file won't allow a connection from a different machine. Comment out the `skip-networking` line by putting a `#` in front, save the file, then reload mariadb with `sudo rc-service mariadb restart`. Try another `netstat -tan`, and you should see a row with state LISTEN and a local address like `:::3306` which is the mariadb server now listening on a network port.

\3. The server is now listening on the network, but it will refuse connections for security reasons from remote machines. Find the mariadb root password (it's in `/vagrant/secure-setup.sql` if you followed my instructions) and log in to mariadb as root (`mysql -u root -p` then enter the password).

Run the command `SELECT name, host FROM mysql.user;` and you should see an entry with user vagrant and host localhost. We now want to allow vagrant to log in from anywhere, so run this:

    UPDATE mysql.user SET host='%' WHERE name='vagrant';

`vagrant` can now log in from anywhere, but back when we created the databases, the `sample-data.sql` contained the line `GRANT ALL ON census.* to 'vagrant'@'localhost';` which we need to update now to allow remote access. Grants are entries in `mysql.db`, try this:

    SELECT user, host, db FROM mysql.db;

You should see the entries for `vagrant`. The table has a lot of other columns, you can list them with `DESCRIBE mysql.db;` - each one controls a particular privilege. But what we want to do is let vagrant log in from anywhere, so type this:

    UPDATE mysql.db SET host = '%' WHERE user = 'vagrant';
    FLUSH PRIVILEGES;

Mariadb will now let vagrant log in and access the census and other databases remotely. Note that root can not log in remotely, as that would be bad security practice. To adminster the database, you SSH into the machine itself and then log in from there.

After this crash course in mariadb user administration, you can now log out of mariadb, but keep the VM running. It is now working as a database server that your host machine can access.

\4. On your development machine where you have Java/JDK and Maven installed, and hopefully git too,

    git clone git@github.com:cs-uob/COMS10012.git

This is the repository behind the unit page for this unit, but it also contains the code for the application in `code/censusexplorer`. If you for some reason don't have git on your host machine but would still like to develop there, go to [https://github.com/cs-uob/COMS10012](https://github.com/cs-uob/COMS10012) and use the _Code_ button then _Download ZIP_, then unzip the file you get.

If you have Java installed but not Maven, you can get Maven from [https://maven.apache.org/](https://maven.apache.org/) - it's just a ZIP file that you unzip, but you do need to add its `bin/` folder to your `PATH` variable after that. You may also have to set the `JAVA_HOME` variable to point to your JDK, if this isn't done already.

\5. If you are developing on the Alpine VM directly, and you have skipped steps 2 and 3, then you need to make one minor change to tell the application to use a socket rather than a network connection: in `code/censusexplorer/src/main/resources/application.properties`, add the following string to the end of the `spring.datasource.url` line, with no space before it and the previous text:

    &localSocket=/var/run/mysqld/mysqld.sock

This gets you back a socket file connection instead of a network one.

## Building and running

Go to the folder `code/censusexplorer` in a terminal (Windows CMD should work fine too, but not powershell) and run `mvn spring-boot:run`. This will download all the dependencies, compile the code, and run the application on port 8080 on your development machine. 

When the application is running, open a web browser on your host machine, and go to [http://localhost:8080](http://localhost:8080). You should see the main page of the application.

Whenever you make changes to the code, you can stop the server with Control+C (press this _twice_ if you're on windows, for technical reasons), then rerun the maven command which will recompile any changed java files and bring the server up again.

If there is a compiler error, the application won't start; if there is a spring error, the application will start but will throw an exception either at startup, or when you try and access whichever page is causing the error. The exception text in your terminal might be useful to determine what the problem is.
