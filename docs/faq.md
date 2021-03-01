# Technical FAQ

This page contains problems that several students have run into, and suggested solutions.

## SSH

  * I get a message `WARNING: REMOTE HOST IDENTIFICATION HAS CHANGED!`.

The first time you ssh into a machine (like seis), ssh stores a copy of the remote machine's puplic key in `~/.ssh/known_hosts`. The next time you connect to the same machine, ssh expects the remote public key to be the same and complains if not. This is because if someone is trying to impersonate the remote machine, then they will not have the same key. However, you will also see this message if you are connecting to the genuine machine but they've changed the key, for example they've reinstalled the OS.

The practical solution is to edit the `known_hosts` file and delete the offending line (the one with the name of the host you're trying to connect to) but in a production system in industry, you would check with the administrator whether they've really changed the key before doing this.

  * Instead of asking for my password when I try and copy a key, I just get a `>` prompt.

The `>` means you're inside a string, because you've typed an opening double quote but forgot the closing one. Cancel with Ctrl+C, press UP to get your command back and add the closing quote.

## Setting up Vagrant

  * I'm Chinese and I get an error about `incompatible character encodings: GBK and UTF-8` when trying to start vagrant.

The full answer is [here](https://stackoverflow.com/questions/26086424/vagrant-windows-1251-encoding-error) but basically vagrant doesn't like its program files being installed under a folder that contains characters in a different encoding (e.g. GBK for Chinese) than the encoding it uses in its own scripts. Try reinstalling vagrant in `c:\hashicorp\vagrant` as recommended by the installer, and if that doesn't help then follow the steps in the linked article.

  * I get a `Not in a hypervisor partition: VERR_NEM_NOT_AVAILABLE` error on Windows 10.

This means that either
  1. Your processor does not support virtualisation (unlikely, but if so you'll need to use a lab machine over ssh instead).
  2. Your processor's virtualisation has been disabled in the BIOS. This seems to be the case for Windows 10 Pro machines from some PC manufacturers.

If you trust yourself and know what you are doing, then in case 2 you can look online for instructions to change BIOS settings for your PC manufacturer and model. Otherwise, you'll need to use vagrant over ssh on a lab machine.

  * I'm using Windows subsystem for Linux and I get a message that `Vagrant failed to initialize at a very early stage ...`

If you try and use Vagrant from WSL, there are three operating systems involved: Windows, WSL and the guest (Alpine). That gets complicated - you can follow the instructions on the linked page [http://vagrantup.com/docs/other/wsl.html](http://vagrantup.com/docs/other/wsl.html) if you want to, but there's no guarantee that shared folders will work nicely, especially on Alpine which already is a bit non-standard here.

The easiest solution is to install the Windows version of vagrant and just run `vagrant up` and similar commands from a Windows terminal. Once you're in the VM, the difference won't really matter - you can install [the new Windows Terminal](https://www.microsoft.com/en-us/p/windows-terminal/9n0dx20hk701?activetab=pivot:overviewtab) if you want a slightly better terminal experience, e.g. for copy-pasting.

  * I get an error message `OpenSSL SSL_read: Connection was reset` when vagrant tries to download the VM, often preceded by `An error occurred while downloading ...`

Something (your internet provider, firewall, VPN) is blocking the file download. It might also be that the website hosting the file is temporarily having problems.

I seem to hear this one particularly from Chinese students, and I can't do anything about it. I would suggest that you keep on trying on different days in case you get through, and if not, then use vagrant on the lab machines via ssh instead.

  * I'm on Mac OS and I get an `NS_ERROR_FAILURE` error.

This could mean three things:

  1. Virtualbox is not installed correctly - try reinstalling (especially if you installed a while ago and are not on the latest version).
  2. Mac's security features are blocking parts of VirtualBox. Go to your system settings, Security and Privacy, and if there's a message that "System software from Oracle ... was blocked" then click "Allow" (Oracle owns VirtualBox).
  3. A recent Mac OS update has broken VirtualBox on Mac. This seems to have happened more than once in the past according to user reports - you have to wait for the developers to bring out a patch, and use the lab machines until then.

## Git

  * I'm making a git repo somewhere under `/vagrant` and I get `insufficient permission for adding an object to repository database`.

Your `/vagrant` folder on the guest OS (alpine) is mapped to the folder on the host OS containing your Vagrantfile. This error happens because for git to create and "lock" its database, both the guest and host OS permissions have to allow this, and in this case the host is most likely the problem.

I would recommend you create your git repos under `/home/vagrant` not `/vagrant`, as the former is not mapped to the host. Although this means you files are not backed up if you have to delete and recreate the VM, these are git repos we're talking about - you can back them up on github and just clone them again after rebuilding the VM.

  * SSH into github is not working.

Here's how to debug this. First, from the machine or VM with your keys, try `ssh git@github.com` and see what you get. If you get _You've successfully authenticated, but GitHub does not provide shell access._ then the public key you're using is registered properly with a github account. If you're trying to clone someone else's repository and it doesn't work, then you need to ask them to give you access, and you need to click the link in the e-mail invitation github will send you.

If you get an error about not finding github.com, first check you're online, then try `ssh git@ssh.github.com`. If that works, then use `ssh.github.com` instead of `github.com` from now on. (The main github site tries to redirect you to the ssh subdomain anyway when you connect via SSH, but not all software/OS combinations pick this up properly.) If that doesn't work either, then you may not be online, or something (firewall, ISP, VPN ...) may be blocking the connection.

If you get `Permission denied (publickey)`, the first thing you want to do is check that your public key is enrolled on github: go to github then _Settings / SSH and GPG keys_ in a browser and see whether your key is listed there. The page shows the SHA256 hashes of the keys rather than the keys itself, so do `ssh-keygen -l -f ~/.ssh/id_ed25519.pub` to get the hash of your own key file and make sure that matches one on github. The only part of the string that has to match is the part starting `SHA256:` until the next space following that.

Next, run `ssh -vv git@ssh.github.com` to turn on two levels of debugging information. You want to look for the lines _Trying private key_, a successful authentication should have `debug1: Offering public key: PATH ...` shortly followed by `Server accepts key`. This should tell you whether it's the server not accepting your key (for example you have several ssh keys set up and you're using the wrong one) or it's ssh refusing to use your key, for example because other people have read permissions on it (see the ssh and permissions videos for how to fix this).

## Compiling etc.

  * Weird things happen when I try and compile or run programs under `/vagrant`.

If your host file system is not POSIX (e.g. Windows), then because `/vagrant` is mapped to a folder on the host, it shares file system characteristics (such as permission bits) with the host OS. The main difference is that Windows does not have an `x` bit to mark a file as executable, so when the compiler finishes off the executable file with a system call that does the equivalent of `chmod +x PROGRAM`, this does nothing. Then when you try and run `./PROGRAM`, your shell complains because the executable bit is not set. If you try and configure/make a C program (like sqlite) under `/vagrant` then the configure script will hit the same problem and complain that the C compiler can't produce executable files.

The solution is to move the files from `/vagrant` or a subfolder of that into `/home/vagrant` or somewhere else that's not mapped to the host, then it should work absolutely fine. This is, by the way, why the VM is not set up to map your home directory to the host.
