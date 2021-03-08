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
