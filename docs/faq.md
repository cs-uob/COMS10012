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