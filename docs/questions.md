# Compreshension Questions

This page is a list of comprehension questions based on the videos for the POSIX/Git part of the course, which the TAs have used previously to ask you questions when you don't have any questions for them. They are published here for your own study, and could be used for example as part of your revision for this unit's exam.

The video that each question is related to is indicated at the start.

It is likely that the exam questions will contain a combination of questions based on the videos and ones based on the exercises; and a combination of simpler comprehension questions and more involved questions where you have to apply what you have learnt to a new situation. I have not written the exam yet, so I cannot tell you more about what might be on it.

## Posix Activity 1

  - (shell) What does it mean if your shell prompt is a hash (#) sign? 

This normally means that you are logged in as root (administrator, superuser). 

  - (shell) How could you find out what command runs when you type nano? Will this always work? 

The command which nano shows the location of the program that would be executed if you type nano, e.g. `/bin/nano`. This does not work (1) for shell built-ins, e.g. cd and (2) if nano is not installed on your system. 

  - (shell) There is a manual for the shell printf command and one for the C printf command. How do you choose which one to view for the 'man' command? 

If necessary, include the section number, e.g. man 1 printf. Section 1 is shell commands, 2 is system calls, 3 is the C library. 

  - (shell) What happens if you type `ls *` in an empty folder and why? 

ls complains it cannot find a file named '*'. The shell expands * to the list of files in the current folder, if there are any, but passes the * on to the command unchanged if the folder is empty. 

  - (shell) The command 'echo' prints its argument, e.g. echo Hello would print Hello (this is useful in scripts, it makes less sense on the command line directly). How would you get echo to print the message `*IMPORTANT*` including the star at each end, and why? 

`echo "*IMPORTANT*"` with quotes. Otherwise, the shell looks for a list of files whose name contains the word important in all caps. Single and double quotes work equally well here. 

  - (shell) How would you list all files with the ending .c in or beneath the current folder (beneath means in subfolders? 

`find . -name "*.c"` with double quotes as you want find, not the shell, to expand the pattern (otherwise you're looking for all files that match the name of a .c file in the current folder). 

  - (ssh) What is the university bastion host that you can SSH into from the internet called? 

seis(.bris.ac.uk) but also accept "snowy" for students that know about this one. 

  - (ssh) What is a man-in-the-middle attack? 

You are trying to connect to a server S; the attacker pretends to be S towards you and pretends to be you towards S, effectively just passing messages back and forward between you and S but reading the messages as they do this. 

  - (vagrant) What is the difference between full virtualisation and containers? 

The main difference on the slides is that virtualisation also emulates the (hardware and) OS whereas containers only contain a program and libraries; any other valid answer counts too like containers are more lightweight, virtualisation uses a hypervisor etc. 

  - (vagrant) How do you connect to a running Vagrant VM? 

Use SSH with the vagrant ssh command in the folder with the Vagrantfile. 

  - (packages) What is the difference between an 'update' and an 'upgrade'? 

Update downloads a new list of the latest versions of all packages available but doesn't install anything, upgrade installs the latest version of each package you have already installed. 

  - (packages) Where are the repository lists for alpine linux stored? 

Accept either `/etc/apk/repositories` or `kernel.org/alpine` or other URLs to that effect (the one in the mentioned file has `sjc.edge.kernel.org`). 

  - (git) The git checkout command copies files from where to where? 

From your repository to your working copy. 

## POSIX/Git Activity 2

  - (permissions) What is the difference between su and sudo and which one should you use? 

su asks for the root password; sudo asks for your own password and then, if allowed, runs a particular command as root. You should use sudo as it allows better configuration and in a properly secured system, root should not have a password at all. 

  - (permissions) You have a shell script called build.sh which has `#!/bin/sh` in the first line, but typing `./build.sh` does not work. What have you probably forgotten? 

The +x bit, as only files with this set can be executed directly (`sh ./build.sh` would still work). 

  - (permissions) Name two different ways of running a python program called 'program'. 

The first is python program, the second is to put #!/usr/bin/python or whatever the path to your interpreter is on the first line and set the x bit so you can run it as `./program`. 

  - (permissions) Which bit do you need set on a folder in order to be able to create files in it? Are there exceptions to the rule? 

The w (write) bit. The main exception is that as root, you can do anything; if you own the folder, then you can of course set the w bit on it yourself if you want to. 

  - (permissions) A file has permissions `-rwxr-xr-x`. Who can edit this file? 

Only the owner, and root. Other users can make a copy of their own (they have read permissions) and edit that, but not edit the original. 

  - (permissions) Your ssh private key has permissions `-rw-r--r--`. Key-based ssh is not working, why - and what should you do? 

SSH won't use a key that is readable by other people than the owner, you should chmod ug-r or chmod 600 the file to remove the other permission bits. 

  - (permissions) A file has permissions set to 640. What kind of number is this and who can do what with it? 

It is in octal (base 8) and translates to `rw-r-----`. This means the owner can read and write it, members of the group can read only, and others cannot do anything with the file at all. 

  - (permissions) What does the setuid bit do and what kind of files might have it set? 

It means that anyone running the program gets it run with the file owner's rights rather than those of the person calling it. This bit is set on files like `/bin/passwd` (the command to change your password, owned by root) so that it can edit the password file - of course it's written in such a way that you can only edit your own password unless you really are root. 

  - (permissions) Where are passwords actually stored these days on Alpine, and why? 

They are stored in `/etc/shadow` (to be precise only a kind of hash is stored). This is so the file can be made readable only by root (or parts of the OS that need the file) - normal users can't even see the hashes so they can't upload them to a password cracker. The `/etc/passwd` file contains information everyone needs to be able to read, for example the mapping between user ids and user names, so the passwords themselves or even hashes can't be stored there anymore. 

  - (pipes) Name some principles of "UNIX philosophy". 

Programs should do one thing well, and cooperate to perform larger tasks by transmitting/receiving text streams. 

  - (pipes) What is the point of standard error? 

If you're piping the output of one program into a file or another program, then in case of an error the error message still goes to your terminal rather than to the next program, which might not be able to deal with it. 

  - (pipes) How would you find the alphabetically first 5 programs in /bin whose name starts with a b? 

Lots of correct answers but `ls -1 /bin/b* | head -n 5` would do the trick. Actually the -1 is redundant on most systems because ls switches to one file a line mode automatically if it detects that its standard output is a pipe.  

  - (pipes) What does the -n option to grep do? 

It prints the line number before each matching line. 

  - (pipes) You have a file names.txt with a list of usernames, but some of them appear more than once. How would you produce a file users.txt that contains each username exactly once - they don't have to be in the same order as the original file? 

For example `sort names.txt | uniq > users.txt` or other commands to that effect, e.g. you could use an input redirect instead of calling sort with an argument, or use cat to start the pipeline. You can't just use uniq unless you're sure the names are consecutive, e.g. never "a, b, a", and you're not sure here. 

  - (pipes) What does the `>>` operator do on the command line? 

It redirects the output to the following file, but if the file exists already, then it appends to the file rather than overwriting it. 

  - (pipes) How would you run command and remove all lines sent to standard error (note that this is more often than not a stupid thing to do)? 

`command 2>/dev/null`, the `2>` redirects standard error and the /dev/null is a special file that ignores anything you send to it. 

  - (git) What is the difference between 'fetch' and 'pull'? 

Fetch copies changes from a remote repository to yours, but does not change the working copy, so it is always safe to use and cannot produce a conflict. Pull does a fetch and then tries to apply the changes to your working copy, which can fail with a conflict. 

## POSIX/Git Activity 3

  - (git) What is the HEAD tag/pointer? 

It points to the commit that matches the files in your working copy last time you did a checkout. Typically this is the same as the current branch, except if you manually checked out an older commit ('detached HEAD' state). 

  - (git) What is a merge commit and what is one used for? 

A commit with more than one ancestor (typically 2, but can be more - I think the record in the Linux kernel is 16 or something). It is used for combining work done by different people or at different times into a single commit again. 

  - (git) How does the 'gitflow' workflow make conflicts less of a problem? 

You develop on private feature branches which never cause conflicts, then merge into develop when you're done. This way conflicts can only happen when you're merging into develop, not when you want to make say a quick commit at the end of the day. 

  - (git) What is the command to do a pull request in git? 

There isn't one because pull requests are a feature of providers (such as github), not the git software itself. 

  - (inodes) What is an absolute resp. relative path in POSIX? 

An absolute path starts with a / and always means the same thing on the same machine (unless you move or delete files), namely a path starting from the root. A relative path is one that does not start with a / and is generally interpreted relative to the current working directory, so e.g. `cat README.txt` might print different things depending on what folder you're in. 

  - (inodes) How is a file descriptor implemented from a program's point of view, e.g. in userland? 

It is an integer, which works as an index into a table of open files on the kernel side. (Entries 0-2 are provided by the kernel when the program starts, for standard in/out/error.) 

  - (inodes) How would you find the inode number given a filename? What about the other way round? 

To get the inode number from a filename you can use ls -i on the command line for example (or anything else that calls stat() on the file). There is by design no easy way to go the other way round, you'd have to do something with find that scans the whole file system looking for names (there may be more than one) that match the inode number. 

  - (inodes) If you make a soft link with `ln -s`, it shows up as a special file (type l) in ls -l. Why is there no special symbol for hard links? 

Because a hard link IS a normal file. In POSIX, "names have files" so when you create a file with one name, it has one link; if you add another name then the link count goes up to 2. 

  - (inodes) What does the touch command do on a file that already exists? 

It updates the "last access" time to the current time. (This can be useful when building C programs with make as it forces the file to be recompiled.) 

  - (scripting) What two things do you have to do to a script file called run so that you can run it with ./run on the command line? 

The first line has to start #! and select the interpreter (e.g. /bin/sh), and you have to set the +x bit. 

  - (scripting) Where do you set your PATH variable on Alpine, so that it's available whenever you stop/start the machine and log in again? 

In the `~/.profile` file, which is read by your login shell (but passed to other shells you start from there if you EXPORT the setting). On many systems with bash as the default shell, ~/.bashrc would also work, but not on Alpine (which uses busybox). 

  - (scripting) If you run `one || two` in the shell, under what conditions will two run, and what does this usually mean? 

The or operator will run two if one returns a non-zero exit value (exit is normally an unsigned 8-bit int, so this means exit > 0), which for most POSIX tools is an indication that one failed. On success, most POSIX tools return 0. 

  - (scripting) You want to compile a file with `gcc hello.c -Wall -o hello` and then run it with `./hello`. Explain how to do this in a single line so that the program only runs if compiling was successful, and how this works. 

Combine them with the `&&` operator. This runs the right-hand command if and only if the left-hand one returned zero, which most standard tools (including gcc) use to indicate success. 

  - (scripting) A program that should read a file returns 0 on success, 1 if the file doesn't exist and 2 if the file exists but its contents are not properly formatted. How can you tell in the shell which of these cases happened? 

You can distinguish between 0/>0 with the `&&` and `||` operators, the if command etc. To tell the difference between 1 and 2, you look at the $? variable which holds the return value of the last command to run. 

  - (scripting) What is the equivalent of C's int argv in a shell script? 

This is the `$#` variable, which gives the number of arguments passed to the script. 

  - (scripting) What are the two different uses of the basename command? 

`basename PATH` strips all but the last component, so `basename ~/images/cat.jpg` would return `cat.jpg`. The second use takes an additional file ending like .txt as a second parameter and, if the last component matches this ending, then it strips that too. 

## POSIX/Git Activity 4

  - (tty1) What does the line discipline do? 

It buffers what you type on a terminal and sends it to the program (e.g. shell) one line at a time, so you have a chance to correct with backspace or cancel the whole line with ^U before sending a command off with ENTER. 

  - (tty1) In ASCII, how is a decimal digit encoded and what is the benefit of this encoding? 

A decimal digit has the bit pattern `0011 xxxx` where `xxxx` is the digit encoded in binary. The choice of the leading 4 bits is arbitrary, but the encoding means you can easily convert from decimal to binary and back again (assuming you're not at 10 or more) with a bit-mask and Boolean operations. For example in C, you can Boolean XOR (single `^`) an ASCII digit with the char '0' to get the binary (or Boolean AND with `0x0f`). 

  - (tty1) When you read from standard input in a C program with scanf() and standard input is a terminal, at which two places does buffering happen? 

The first is the kernel's line discipline, the second is that scanf() and the underlying C functions such as fread() implent buffered I/O in the C library. An answer "in the shell" would not be correct as the shell is not involved when your C program is active. 

  - (tty1) You accidentally press `^S` in a terminal (perhaps you wanted to save something but were in the wrong window) and now your terminal is "stuck". What do you do and why? 

You press `^Q`. You have told your terminal to stop sending (XOFF) until you tell it to start again. 

  - (tty1) What control key can you press to log off from e.g. a ssh session, and what does this do? 

`^D`, which sends "end of file" to the receiving program (e.g. shell) standard input. 

  - (tty2) What does PTY stand for, and what is it? 

Pseudo-terminal: a virtual terminal implemented in software in the kernel. (Programs can ask the kernel to set up a PTY for them, for example as a way of interacting with other programs.) 

  - (tty2) What two steps normally happen in POSIX when one program (such as a shell that you've just typed a command into) wants to start another as a subprocess? 

The first is fork() which creates a copy of the first program, with one copy becoming the parent and one the child process. The second step is that the child calls exec() which replaces the current process with a new one. 

  - (tty2) What does readline do and what are three different ways to use it? 

It implements a more advanced version of line discipline, e.g. it lets you use up/down arrows to scroll through previously typed lines. It turns the kernel's line discipline mostly off so that it can handle e.g. BACKSPACE itself. The first use is that in a program such as your shell that already implements it, you can use it directly; the second use is you can use it with the readline() function in your own C programs; the third use is you can use the rlwrap utility to use readline for programs that read from stdin but don't support it. 

  - (tty2) What are some well-known simple and more complex editors that you might find on a POSIX system? 

Simple ones include pico (originally "pine composer" from the pine e-mail client), or nano (a pun on pico, originally a pico clone with a different software licence); complex ones include vi (visual editor, the one with the "modes") and emacs (editor with macros, the one with the built in LISP). micro, although I like it personally, is not "standard" I'm afraid. 

  - (tty3) If you do e.g. `ls | less` then colours like blue for folders don't appear anymore. How does ls know this, and how can you override it? 

By default, ls checks if its output is a tty; if not (in this case it's a pipe) it omits the colours. You can override this with `--color=always`. 

  - (tty3) Explain briefly how ls prints folder names in blue on the terminal? 

It uses ANSI escape codes, which start with the ESC control character (`0001 1011`). For example `ESC [34m` sets the foreground colour to blue. 

  - (tty3) What is the command to make a named pipe, and what does it stand for? 

mkfifo, for "make FIFO" which stands for "first in, first out". 

  - (tty3) What is socat and what could you use it for? 

It is an extended version of cat that can also use network sockets (TCP/IP, TLS etc.) as inputs and outputs. It's useful for debugging web applications and services as you can pretend to be one of the clients or servers yourself, and for security people to snoop on what's going on. 

## Databases Activity 1

  - (create-drop)  What two things do you need to get right in DROP statements so that your create-drop script will always run? 

First, use DROP TABLE IF EXISTS which won't cause an error if the table doesn't exist (for example you've just reinstalled the database). Secondly, DROP statements go in the opposite order to CREATE statements, due to foreign keys (if A has a FK to B then you have to create B before A, but drop A before B). 

  - (create-drop)  How would you add a column to a table that already has data in it? 

Use the `ALTER TABLE <name> ADD COLUMN <coldef>;` statement. 

  - (installation)  Why is the MariaDB command line tool called mysql? 

MariaDB was created by the same person (Monty Widenius) as a clone of mysql, after Oracle bought Sun (which had bought MySQL). 

  - (installation)  How does the MariaDB client connect to its server? 

It uses a special file (a POSIX socket) by default. The answer "port 3306" is partially correct: this is the normal way to connect to a database over a network, but if both client and server are on the same machine then a POSIX socket is both faster and slightly more secure. 

  - (modelling 1)  What are synonyms for "relation" and "attribute" in the context of databases? 

A relation is a table, and an attribute is a column in a table. 

  - (modelling 1)  What is a surrogate key and why might you use one? 

A surrogate key is a primary key that has no direct meaning to users, in particular users don't pick it and can't ask to change it. This gives you as a database administrator one less thing to worry about. For example, your 7-digit student ID is a surrogate key. A phone number however would not be a surrogate key as people sometimes need to change theirs. 

  - (modelling 1)  What are the two conditions for a candidate key? 

It must be unique, that is no two entries in the same table have the same values for the column(s) making up the key, and it must be minimal which means that if it's more than one column, then removing any one column from the candidate key would break the minimality property. 

  - (modelling 1)  In a library database, a book can be loaned to zero or one people (either it's on loan or not). How would you draw this in an ER diagram? 

The foot on the "Person" end of the line from "Book" to "Person" would have a single bar closest to the "Person" box and a circle behind it. 

  - (modelling 1)  Each academic belongs to at most one research group (but maybe none at all), each research group can have any number of academics as long as it's at least one. What kind of relationship is this? 

This is a one-to-many relationship, to be precise one that's optional on the academic side but mandatory on the group side. 

  - (modelling 2)  Every club in the SU has exactly one president (who must be a student). A student can be president of more than one club. Where would you put the foreign key(s) for these relationships when implementing the model in a database? 

The FK goes on the club table as it's one-to-many so the FK goes on the "has one" side. 

  - (modelling 2)  Every club can have many students as members and every student can be part of many clubs. Where would you put the foreign key(s) for these relationships when implementing the model in a database? 

It's many-to-many so you need a join table that has two FKs (student, club). 

  - (modelling 2)  A student can take any number of units (at least as far as the database is concerned), a unit is taken by a number of students, and each student gets a grade for each unit that they take. What tables would you create to model this and where would the "grade" column(s) go? 

Three tables: `Student(username, name, ...)`, `Unit(code, title, ...)` and `Enrol(student, unit, grade)`. The first two columns on Enrol are FKs (and together form a composite PK). The grade column goes on the Enrol join table because there's one per student per unit, so it wouldn't fit on either the student table (a student has more than one grade) or the unit table (same reason). 

  - (select)  In a LIKE query, what special character can you use to search e.g. for all students whose name begins with A? 

The special character here is the `%` (percent) sign. 

## Databases Activity 2 

  - (normalisation)  Why do we normalise relational data? 

The point is that each piece of information in our database is stored only once. This is not so much to save disk space, but to keep our data consistent: think of a database that stores someone's email in several places, they ask to change their email address and you only end up updating some of the relevant database entries. 

  - (normalisation)  Give an example of a 1NF violation. Why is this bad? 

The example in the slides is storing which units someone takes (or teaches) as a comma-separated list in a column "units" in the Person/Student table. This is bad because you lose the ability to efficiently ask queries like "how many people are on COMS10012" or "who is taking COMS10014". 

  - (normalisation)  What are the two conditions for a candidate key? (Question repeated from last time because it's so important.) 

It must be unique, that is no two entries in the same table have the same values for the column(s) making up the key, and it must be minimal which means that if it's more than one column, then removing any one column from the candidate key would break the minimality property. 

  - (normalisation)  What is a non-key column? 

A column that is not part of any candidate key. An answer mentioning _THE_ candidate key would be wrong as there could be more than one, and an answer mentioning the primary key is also wrong. 

  - (normalisation)  In a database for Bristol City Council Covid volunteers, the (join) table tracking which volunteer has been assigned which client(s) contains FKs `volunteer_id`, `client_id` (which together form the PK) but also a column for the volunteer's postcode. Which normal form does this violate? 

This violates 2NF. Postcodes are not unique among volunteers (you might have two in the same street) so postcode is non-key, but depends only on the volunteer which is a partial candidate key (the PK is always a candidate key, so `(volunteer_id, client_id)` is one). 

  - (normalisation)  (hard question!) In a database for Bristol City Council Covid volunteers, the (join) table tracking which volunteer has been assigned which client(s) contains FKs `volunteer_id`, `client_id` (which together form the PK) but also a column for the volunteer's telephone number. Which normal form does this violate? 

This violates BCNF. We can assume telephone numbers are unique among volunteers, so we have two overlapping CKs `(volunteer_id, client_id)` and `(phone, client_id)`. But `{volunteer_id} -> phone` even though the determinant (left-hand side) is not unique in the join table (one volunteer could support more than one client). 

  - (normalisation)  Give your own example (not the one from the slides) of a 3NF violation (that is not a 1NF/2NF violation). 

There are of course many correct answers, but what they all have in common is a chain `A -> B -> C` of FDs where at least B, C are non-key. For example, a table of Premier League footballers, one row per player, with columns `player_id` (candidate key), `club`, `stadium` where the last one is the stadium name/location of the player's home club. The problem is the `club -> stadium` relationship where both are non-key (a club has more than one player). 

  - (normalisation)  Which normal forms can you always achieve (and how), and which ones not? 

You can always achieve 1NF (split off lists into separate tables with an FK back to the table that used to have the lists) and 2NF/3NF (Heath's theorem). However there are degenerate cases where you can't always achieve BCNF, such as a table with three columns where any two are a candidate key. 

  - (normalisation)  Describe briefly how you use Heath's theorem in practice? 

Find a FD that's causing a violation. Call the LHS of the FD A, the RHS B, and everything else C. Split the table into two tables `{AB}` and `{AC}`. Repeat until normalised. 

  - (insert and delete)  What kind of things would you use double quotes for in SQL? 

NOT strings. Names of things in your database (tables, columns etc.) that you can't just write out, either because they contain spaces or because they're a keyword like "count". (This also depends on the database in question, some of them prefer backticks to double quotes.) But _single quotes for strings_ applies pretty much everywhere SQL is used. 

  - (join 1)  What is a NATURAL JOIN and when would you use one? 

A join on all pairs of columns in different tables that have the same name. You'd use it in a schema where the naming convention is that both primary keys of, and foreign keys to, the Person table are named `person_id`. It slightly reduces the amount of typing to do a join and makes it slightly less likely that you join on the wrong column. 

  - (join 2)  If table A has 3 rows and table B has 5 rows, what can we say about the number of rows returned in a query that does a LEFT OUTER JOIN between A and B (with A on the left)? 

It will contain at least 3 rows as the LOJ returns each row of A at least once. It could be more, the maximum you'd get is 7 if all 5 rows of B match one row of A (so you get it 5 times in the result) and then two more rows for the other rows with no match. (All this assumes no other JOINs or clauses that could affect the number of rows returned, e.g. a WHERE clause could kill all rows at the end.) 

  - (order by)  Which statement in C is similar in style to the CASE statement in SQL? 

The SWITCH statement ("if/then/else if/ else" would be partially correct too.) 

## Databases Activity 3 

  - (null)  Explain why "TRUE AND NULL" gives NULL, but "TRUE OR NULL" does not? 

NULL means "unknown value". In "TRUE OR x", the result is going to be true whatever the value of x, but in "TRUE AND x" it depends on x. 

  - (null)  In 3-valued logic, what would the value of "FALSE => NULL" be and why? 

"FALSE => x" is true for any value of x, so it would be TRUE. 

  - (null)  In a Person table, some people's email field is null because they haven't provided an email address yet. Comment on the query `SELECT id, name FROM Person WHERE email = NULL;` that tries to find these people. 

It won't work because the equality operator applied to NULL always returns NULL, which is not "truthy". Instead you should use `WHERE email IS NULL`. 

  - (statistics)  In a table Student(id, name, grade) where grade is the overall grade a student got on their degree, what query would you use to find the student with the highest grade? 

The "full-marks" answer is there might not be THE top student if several students are tied for the top place, so this excludes anything like `ORDER BY grade DESC LIMIT 1`. What you can do is `SELECT name, id FROM Student WHERE grade = (SELECT MAX(grade) FROM Student)`, the inner query is a stats query so it's guaranteed to return exactly one row. Not `WHERE grade = MAX(grade)`, this is (a) a syntax error and (b) in those databases that do allow it anyway, might not do what you want. 

  - (statistics)  Let's be pedantic and look at the following query: `SELECT stuid, AVG(grade) FROM Enrol WHERE stuid = 1000001;` on a table `Enrol(stuid, unitid, grade)` representing students enrolled in units, and their grades on these units. The intention is to look up the average grade of a particular student (assuming all units are equally weighted). Is the query correct? 

No, even though your WHERE clause picks a single student, if you're really unlucky you'll get the average across all students/units instead of the average for this student! (It's unlikely any database will really do this, but the query is technically invalid so you have no promises.) Syntactically, you have a field reference (stuid) in a statistics query which is not allowed unless the field is grouped, so add `GROUP BY stuid` and your query will both be legal and guaranteed to do the right thing. 

  - (statistics)  In a schema `Enrol(student, unit, grade)` you want to find all students with an average grade above 70 (assume all units equally weighted): `SELECT student, AVG(grade) AS a GROUP BY student WHERE a > 70`. This won't work, what should you do instead? 

WHERE runs before grouping/statistics, so it can't refer to these (e.g. `WHERE average > 50`). HAVING does the same thing but after the statistics have run, so it can use these columns - you should use HAVING instead. 

  - (statistics)  In "evaluation order", what is the last thing a database does with a query? 

The last step is removing columns you don't need in the output, part of the SELECT clause. This has to happen last because clauses processed earlier e.g. ORDER BY can refer to columns not in the output. Of course, a real database with a query optimiser can choose not to load some columns in the first place that it will never need in the query. 

  - (subqueries)  What is a subquery and why would you use one? 

In SQL, whenever you need to provide a value (e.g. to compare a field with), you can instead write a query in brackets that returns a value – this is a subquery. You would use one where you have a problem that has an easy solution in two steps, where you can pass the answer from the first step to the second-step query. 

  - (subqueries)  What does an EXISTS clause in a WHERE clause do? 

It takes a query. Imagine that for each row of the main query, it runs this subquery: if the subquery returns at least one row, the row in the main query is kept, if the subquery returns no rows then the row is discarded. The database may optimise the query so it doesn't have to rerun something for every row, if that is possible. 

  - (tips)  What is the difference between UNION and UNION ALL and which one would you use to stick a "totals" row on the end of a table? 

UNION ALL, because its job is "stick the second query rows on the end of the first one" - both queries have to return the same number of columns. Plain UNION takes the rows from both queries, filters out duplicates and then combines, which can cost you a sort of all the rows so you don't want to do this unless you really want duplicates removed. 

## Databases Activity 4 

  - (JDBC)  In programming, what is a Resource (give some examples) and how do you need to work with it? 

Something that you have to clean up nicely when you're done, for example open files, network connections, database connections, and in C also memory (malloc/free). Clean up nicely means call the cleanup function exactly once when you're done with the resource; in Java you should use the try-with-resources abstraction for this. 

  - (JDBC)  How can you write your own Java class that you can use in a try-with-resources pattern? 

It must implement `java.lang.AutoCloseable` which declares a single method `void close()`. 

  - (JDBC)  What is a prepared statement, when and why would you use one? 

A way to call a SQL statement from another program where you first pass the statement with some placeholders for variables, then the actual values later on. You would do this whenever you're taking information from a user query or form fields, for example. This ensures that even if the data contains characters like quotes or words that are "special" in SQL, code and data are kept separate for security reasons (SQL injection). (If you need to execute lots of statements of the same general pattern but with different values, prepared statements can also be more efficient as you only need to compile the statement once.) 

  - (JDBC)  How does the MariaDB client that you've been using so far talk to the server? 

It uses the file `/var/run/mysqld/mysqld.sock`, a special file of type "POSIX socket" (type s in ls -l) that is like a two-way pipe. _Students don't need to know the exact filename but should say at least "socket file"._ 
The answer "network" or "port 3306" is not quite correct, this is the default way to connect to a production database on a different machine, but when you install MariaDB this is turned off by default for security reasons until you configure it (and presumably have set up a firewall first). 

  - (JDBC)  You execute a JDBC query, get a ResultSet that you know will contain data and immediately try to read the id of the first row with `getInt("id")`, but it throws a SQLException. You know there is an id field in the returned table (the same query works fine in the MariaDB client), what have you probably forgotten? 

ResultSets start in a "before the first row" state. The pattern is you have to call `next()` to load the first row (and any further rows), and only when you get a true value back from that function is it safe to read from a row. 

  - (JDBC)  For the prepared query `SELECT id FROM Person WHERE username = ?`, how would you pass the username parameter in JDBC? 

Use `p.setString(1, USERNAME)` where p is the prepared statement object. The 1 parameter means the first occurrence of a ? in the query. 

  - (Hibernate)  What does ORM stand for and what does an ORM do? 

Object-Relational Mapping _(also accept "Relationship" for the R)_. It is a library or framework that lets you work in an OOP language with classes and objects while accessing data stored in a relational database in tables and columns, by mapping/translating between the two "worlds". 

  - (Hibernate)  What does JPA stand for and what does it do? 

Java Persistence Annotations, a set of annotation classes like `(javax.persistence.)@Entity` that you can use to annotate classes that you want your ORM to map to database tables. 

  - (Hibernate)  A common pattern in database applications is loading an object of a given type when you have only its primary key. How do you do this in Hibernate? 

`Something s = session.get(Something.class, ID);` where 'Something' is a mapped entity type and 'session' is the Hibernate session object. 

  - (Hibernate)  When working with Hibernate (as shown in the slides) there are two Resource classes that you need to put in a try-with-resources block, what are they? 

The SessionFactory, which it's fine to create at the start of the program and keep around, and the individual Session (that you can think of as database connections) - you can actually keep these open for a longer time too as Hibernate manages the network/database connections, but you do have to make sure you close them cleanly before you're done. _(In SPE next year you will probably be using the Spring framework to manage a lot of things, including Hibernate sessions, so you'll no longer need to close them yourself.)_

  - (Hibernate)  Explain why you might want to do a JOIN FETCH in a HQL query. 

The example in the slides is that you have a list of candidates and you want to print out their ward names. When you load from the Candidate class in Hibernate, it doesn't automatically join other tables like Ward, instead it returns proxy objects that fetch these on demand, but this is inefficient if you do it in a loop for every object (the N+1 problem). So you JOIN FETCH to say "I'm going to be using these, it's worth doing a JOIN on this table to start with". 

  - (SQLite)  What does it mean when we say SQLite is an embedded database? 

The program using it – command line or library as part of another program e.g. through JDBC – does not connect to a server process, instead the parts that deal with e.g. writing to disk are part of the same program. 

  - (SQLite)  What constant do you have to check for in the return value to see if a SQLite C API call succeeded? 

`SQLITE_OK`. _(This is actually just `#define SQLITE_OK 0` in `sqlite3.h`, so you could use the same `check()` method as for other 0-as-success libraries, but if you're writing out the code explicitly then using the constant name explains why you're doing something as well as what; and it gives a code reviewer a chance to spot a bug e.g. if you're using `SQLITE_OK` to compare against a function from a different library.)_