# File permissions

Log in to your VM for the following exercises.

If you need a reminder your `Vagrantfile` should look something like:

```ruby
Vagrant.configure("2") do |config|
    config.vm.box = "generic/debian12"
    config.vm.provision :shell, inline: <<-SRC
       apt-get update -y
       apt-get install -y git git-man apt-file
       apt-file update
    SRC
end
```

## Show the current user in the prompt

First, use the command `whoami` to see the current user name: it should be `vagrant`.

For this exercise it will be useful to display the user in the prompt. We want this setting to apply to all users, so we need to set it in a system-wide configuration file namely `/etc/profile` which is read by the shell when it starts up.

Try `echo $PS1` on the terminal to show the current value of this variable, it should be something like `\h:\w\$ `. The `PS1` (prompt level 1) controls your shell prompt. Here `\h` means the hostname, `\w` the working directory and `\$` is the appropriate prompt symbol (`$` for normal users, `#` for root). This gets you a default prompt that looks like `debian12:~$ ` (note the space after the dollar sign, which is also in the PS1).  You can find a complete list of _escape characters_ (the letters starting with a backslash) in `man 1 bash` under **PROMPTING**.

The general syntax for setting a variable is `export NAME=VALUE`, where the `export` tells the shell to keep this value around when the script setting it has finished. Without exporting, you would be creating a local variable instead.

Open the configuration file with `sudo nano /etc/profile`. You need sudo as only root can edit this system-wide configuration file.

The file is a just another shellscript and variables and commands can be added as the system administrator likes:

    export CHARSET=UTF-8
    export LANG=C.UTF-8
    export PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin
    export PAGER=less
    export PS1='\h:\w\$ '
    umask 022

You may also see a section `source`-ing (with the `.` or `source` commands) everything in the `/etc/profile.d` folder that ends with a `.sh`.  This lets an administrator split the shell profile up into different files, and packages add to the the shell profile without modifying the top-level config file.

Go to the end of the file, and add the following lines. Note that there are single quotes around the value of the PS1, and there is a space before the closing single quote.

    export PS1='\u@\h:\w\$ '
    export EDITOR=nano
    
The `\u` in the PS1 is the current user. Save the file (Control+X in nano), log out and in again and your prompt should now be `vagrant@alpine314:~$ `. The `EDITOR` one will come in useful later as it means that if you try a `git commit` without a message, you end up in nano instead of vi (another editor that is better but less beginner-friendly).

|||advanced
If you are running a vagrant VM on a lab machine, then next time you log in to a lab machine your changes to `/etc/profile` will be gone. One way to fix this would be to add the following to your Vagrantfile inside the `config.vm.provision` block:

    echo "export PS1='\\u@\\h:\\w\\$ '" >> /etc/profile

This runs as root (so no sudo needed) and it runs when the machine is created, before you log in with `vagrant ssh` so the shell will pick it up correctly. Note that you need to _double_ the backslashes here, because the Vagrantfile is read by the Ruby language interpreter and that has its own conventions for backslashes. By doubling them, we tell Ruby that these characters are not meant for it, and Ruby will pass a single backslash on to the shell that runs the code.

If you want to do more elaborate setup, such as copying config files every time you recreate the machine, note that the folder containing the Vagrantfile is available as `/vagrant` inside the VM, files in here persist across sessions on different lab machines (since they're stored on the network file system) and you can copy files from `/vagrant` to the places you want them in a provisioning block.
|||

## Create a user and a group

Create a new user with `sudo adduser NAME` - I'm going to be using `brian` as an example name in these notes. When it asks for a password, you can just use `brian` or something; it will complain about the password being too short but it will create the user anyway.  You can skip the GECOS information asking for a full name and phone number---it's just to help an admin contact you if needed.

Check the user and group files with `tail /etc/passwd` and `tail /etc/group` to check that the new user has been created - `tail` displays the last 10 lines of a file by default; `tail -n N FILE` would display the last N lines. Your new user `brian` (or whatever you called them) should appear in both files. Also check with `ls -l /home` that the home directory for Brian exists and is set to the correct user and group.

Time to change user: `su brian` and enter the password. Notice that the prompt has changed to `brian@debian12:/home/vagrant$` (at least if you started off in that folder). So the user has changed, and because `/home/vagrant` is no longer the current user's home directory, it gets written out in full. Run `cd` to go home followed by `pwd` and check that you are now in `/home/brian` or whatever you called your new user.

Next, create a user `nigel` (or some other name) add both your two new users, but not `vagrant`, to the group `users` (which already exists) using the command `sudo addgroup USERNAME GROUPNAME`, where group and username are changed accordingly. Note: `brian` cannot use sudo, so you have to exit his terminal to get back to one running as vagrant for this.

## Explore file permissions

As user `brian` (or whatever you called your first new user), set up your home directory using what you learnt in the videos so that

  * You can do everything (rwx).
  * Members of the `users` group can list files and change to your home directory, but not add/remove files. You will need to change the group of your home directory to `users` for this, using the command `chgrp -R GROUPNAME DIRECTORY`.
  * Everyone else cannot do anything with your home directory.

Create a file in your home directory, e.g. `nano readme.txt` then add some content.

Check, by using `su USERNAME` to log in as the different users, that:
  * `nigel` can view Brian's home directory but not create files there; 
  * `nigel` can view but not edit Brian's readme file; 
  * `vagrant` cannot list files in or enter Brian's home directory at all. What happens when you try?

_Of course, vagrant can use sudo to get around all these restrictions. Permissions do not protect you from anyone who can become root._

Also as `brian`, make a `private` subdirectory in your home folder that no-one but you can access (read, write or execute). Create a file `secret.txt` in there with `nano private/secret.txt` as user `brian` from Brian's home directory, and put something in it. Do not change any permissions on `secret.txt` itself.

Check as Nigel that you can see the folder itself, but not cd into it nor list the file. Check that even knowing the file name (`cat /home/brian/private/secret.txt`) as Nigel doesn't work.

Using `ls -l` as Brian in both `~` and `~/private`, compare the entries for the files `~/readme.txt`, `~/private/secret.txt` and the folder `~/private`. Why do the groups of the two files differ?

Note that, even though the secret file has read permissions for everyone by default, Nigel cannot read it. The rule is that you need permissions on the whole path from `/` to a file to be able to access it.

_This is another reminder that if you want to store private files on a lab machine, then put it in a folder that is only accessible to you. Other students can read your home directory by default, and they would be able to look at your work. This has led to plagarism problems in the past, but good news: we keep logs and can usually figure out what happened! `:-)`._

_Altenatively you could remove permissions from everyone else on your home directory there, but this prevents you from being able to share files in specific folders that you do want to share with other students._

## Setuid

We are going to create a file to let Nigel (and others in the users group) send Brian messages which go in a file in his home directory.

As Brian, create a file `message-brian.c` in your home directory and add the following lines:

```C
#include <stdio.h>
#include <stdlib.h>

const char *filename ="/home/brian/messages.txt";

int main(int argc, char **argv) {
  if (argc != 2) {
    puts("Usage: message-brian MESSAGE");
    return 1;
  }
  FILE *file = fopen(filename, "a");
  if (file == NULL) {
    puts("Error opening file");
    return 2;
  }
  int r = fputs(argv[1], file);
  if (r == EOF) {
    puts("Error writing message");
    return 2;
  }
  r = fputc('\n', file);
  if (r == EOF) {
    puts("Error writing newline");
    return 2;
  }
  fclose(file);
  return 0;
}
```

Compile it with `cc -Wall message-brian.c -o message-brian` (you should not get any warnings) and check with `ls -l`, you will see a line like

    -rwxr-xr-x    1 brian     brian         19984 Oct 28 13:26 message-brian

These are the default permissions for a newly created executable file; note that gcc has set the three `+x` bits for you. Still as Brian, run `chmod u+s message-brian` and check the file again: you should now see `-rwsr-xr-x` for the file permissions. The `s` is the setuid bit.

As Nigel (`su nigel`), go into Brian's home directory and run `./message-brian "Hi from Nigel!"`. The quotes are needed here because the program accepts only a single argument.

Now run `ls -l` and notice that a `messages.txt` has appeared with owner and group `brian`. Check the contents with `cat messages.txt`. Although Nigel cannot create and edit files in Brian's home directory himself (he can't edit `messages.txt` for example, although he can read it), the program `message-brian` ran as Brian, which let it create the file. Nigel can send another message like this (`./message-brian "Hi again!"`), which gets appended to the file: try this out.

This shows how setuid programs can be used to allow other users to selectively perform specific tasks under a different user account.

**Warning**: writing your own setuid programs is extremely dangerous if you don't know the basics of secure coding and hacking C programs, because a bug in such a program could let someone take over your user account. The absolute minimum you should know is the contents of our security units up to and including 4th year.

A general task for a security analyst might be finding all files with the setuid bit set on a system. You can try this yourself, but return to a vagrant shell first so that you're allowed to use sudo:

    sudo find / -perm /4000

You might get some errors relating to `/proc` files, which you can ignore: these are subprocesses that find uses to look at individual files.

Apart from `message-brian`, you'll find a few files by default: `sudo`, `mount`, `umount` and `su`. The first one you already know; look up what the next two do and think about why they are setuid. Specifically, what kinds of (un)mounting are non-root users allowed to do according to the manual pages?

Look up the `passwd` program in the manual pages.  Why might that program need to be setuid?

## Sudo

Make sure your terminal is running as `brian` and try a `sudo ls`. You will see a general message, you will be asked for your password, and then you will get the error `brian is not in the sudoers file.  This incident will be reported.` (This means that an entry has been logged in `/var/log/messages`.)

So, `brian` can currently not use sudo. Switch back to `vagrant` and run the command `sudo cat /etc/sudoers`. Everything is commented out except `root ALL=(ALL) ALL` and the last line `#includedir /etc/sudoers.d` (this is not a comment!) which contains a single file `vagrant` with the line `vagrant ALL=(ALL) NOPASSWD: ALL` which is why vagrant can use sudo in the first place.

However, note the commented lines such as

    # %wheel ALL=(ALL) NOPASSWD: ALL
    # %sudo ALL=(ALL) ALL

If uncommented, the first one would let everyone in group wheel run commands using sudo (this is the default on some other linux distributions), whereas the second one would allow everyone in the group `sudo` to do this, but would prompt for their own password beforehand.

Let's allow people in the users group to reboot the machine. Open a root shell with `sudo su` as vagrant; this is so we don't get locked out if we break sudo.

Edit the sudoers file with `visudo` as root, and add the following line:

    %users ALL=(ALL) /sbin/reboot

and save the sudoers file.

**Warning:**: Never edit `/etc/sudoers` directly and *always* use `visudo` instead.  If you make a mistake and add a syntax error to the file then `sudo` will refuse to work.  If your root account doesn't have a password (some people don't like that as a security precaution) then you'll have to spend the next half-hour figuring out how to break into your own computer and wrestle back control.  There is almost always a command to check a config file before replacing the current one: the same advice also applies to the ssh config files.  If you break them you might have to travel to wherever the server is with a keyboard and a monitor.


You can now switch back to `brian` (check the prompt to make sure you are Brian) and do `sudo reboot`. After asking for Brian's password, the virtual machine will now reboot, which you notice because you get kicked out of your ssh connection. Another `vagrant ssh` after a few seconds will get you back in again.

|||advanced
After rebooting, your `/vagrant` shared folder might not work. In this case, log out and do `vagrant halt` then `vagrant up` and `vagrant ssh` again on the host machine.

When vagrant boots your VM, it automatically sets up the shared folder, but this doesn't always work if you reboot the VM yourself.
|||


