# Set-up

From this point on we will be running web servers on our development environment, and connecting to them with web browsers. To get this to work we need to set some things up first, so please follow the instructions for your environment:

## Lab machine, native

These instructions apply if you are working directly on a lab machine (not using a Vagrant VM).

You do not need to set up anything special. As you are not root, you can only serve from TCP ports 1024 or above, but that is not a problem - we will use port 8000 by default.

Proceed directly to [exploring HTTP](explore.md).

## Lab machine, with vagrant

If you are using vagrant on a lab machine directly (e.g. not over ssh) then you will need to tell vagrant which ports to forward, that is which ports within the VM to make available outside the VM. Open your vagrantfile and add the line

    config.vm.network "forwarded_port", guest: 8000, host: 8000

in the main block (just before the `config.vm.provision` line will do), then restart your VM if it is already running. This tells vagrant to open a server on port 8000 on the host, and forward any traffic to port 8000 on the VM.

You can now start the VM, run a server in the VM, and connect to it from the browser on the lab machine.

Proceed to [exploring HTTP](explore.md) and run the server (the `nc` command) inside the VM, but use the browser on the lab machine directly. Note that the `http-response` file mentioned on that page needs to go in the correct folder on the VM, where you started the server.

## Your own machine, without vagrant

If you have a system that supports the `nc` and `wget` commands (Mac OS, Linux or WSL should all offer the option to install them) then you can proceed directly to [exploring HTTP](explore.md).

You might get one or more firewall warning pop-ups, which you will have to "allow".

## Your own machine, with vagrant

Configure vagrant as in the section "Lab machine, with vagrant" above, that is add the line

    config.vm.network "forwarded_port", guest: 8000, host: 8000

to the vagrantfile and restart vagrant. You can now run servers in the VM and clients (such as your favourite browser) on your own machine, but you can also run clients (such as `wget`) in the VM itself. To do this, either log in to Vagrant and then use tmux to get multiple terminals, or log in to the VM twice from two different terminals, then use one for the server and one for the client.

You might get firewall warning pop-ups, which you will have to "allow".

## Over SSH

If you SSH into a lab machine and run a server there, then you need a way for your own machine to be able to connect to that server: this is called port forwarding, and ssh supports it if you ask for it.

However, it comes with some drawbacks:

  1. Port forwarding can be abused in many ways, some of which count as "hacking" and some of which put you at risk of getting hacked. Don't experiment with it unless you understand what you're doing (more on that, maybe, in 2nd year Computer Systems B).


The command

    ssh 