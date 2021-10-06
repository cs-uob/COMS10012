# Exploring HTTP

## Before you start

To avoid an annoying problem, before we run our own server we are going to check that no-one else is already using the TCP port we want.

Run the command 

```
wget localhost:8000
```

on the machine where you want to run the _server_. It should time out after a couple of seconds (or instantly) with "failed" and some error message.

If it succeeds (shows "Connected" or "200 OK" anywhere), then someone or something else is using port 8000.

Next, run

    netstat -tan
    
and check that there is no line with the value "8000" under Local Address and a state of LISTEN or ESTABLISHED. If you get a lot of lines, `netstat -tan | grep 8000` will help. It does not matter if 8000 appears in the Foreign Address column, but there must be no-one using port 8000 under Local Address.

`netstat` should work on every OS including Windows (Microsoft has written their own version), but `wget` doesn't exist by default on Windows machines although it can be downloaded for free.

If either `wget` or `netstat` suggests port 8000 is in use,

  - If you are on a lab machine, it could be that another student is using port 8000 (maybe they are logged in via SSH).
  - You might have other software (such as a web development package) already using that port.

You can try port numbers 8001, 8002 etc until you get one that is definitely not being used and then replace 8000 with that in all further exercises today, or (on your own machine) you can stop whatever program is using the port first.

Note: if you have vagrant running and set up as described on the last page, and you run `wget localhost:8000` on your own machine (not the VM), then vagrant will be using port 8000 and `wget` might block waiting for a reply. This is the correct behaviour, and this is why I asked you to run `wget` on the machine where you want to run your _server_, not the _client_. If you want to do the following exercises with both server and client on your own machine, then you need to stop the vagrant VM first or remove the 8000 line from your vagrantfile.

## A basic HTTP server and client

Open a terminal on the machine where you want to run the server, and download the file [http-response](../resources/http-response) to the folder where your terminal is open (for example with `wget`). Then run the command

```
nc -l -p 8000 < http-response
```

This calls the tool `nc` ("network cat") and tells it to listen on TCP port 8000 (`-l -p 8000`), e.g. to run a server there. When a client connects, `nc` will by default read from its standard input and write this to the client, so we use a shell redirect to make it read from a file instead. The file contains some standard HTTP:

    HTTP/1.1 200 OK
    Content-type: text/plain
    Content-length: 18
    Connection: close

    Hello over HTTP!


(If you want to type this out yourself or copy-paste, you **must** save the file with CRLF line endings and put two newlines after the hello message.)

`nc` will block until you connect a client. Open another terminal on the machine you want to run your client and run

    wget -q -S -O - localhost:8000

You have now made a HTTP connection from the wget client to the nc server. The server terminal should print out the HTTP request it got from the client (this is built into wget) and the client should print out the response from the server (which comes from the file).

## Connecting with a web browser

Run `nc -l -p 8000 < http-response` again on your server machine (kill the old one with `Control+C` first if it hasn't terminated already).

Ppen a web browser on your client machine (e.g. your own PC/laptop, or a lab machine). If you're using chrome/edge or firefox, open the debug tools (`F12`) and go to the network tab before you open the page.

Navigate to `localhost:8000`. You should see the line "Hello over HTTP!" and `nc` will print the HTTP request from your browser. You can then close it with `Control+C` if it doesn't terminate by itself. In your browser's debug tools, on the network tab you should see a file `localhost`, click this and then select _Headers_ in the details that appear.

This details page shows you the HTTP request details, including the response code (`200 OK` in this case) and all the headers sent in both directions. This screen is one of the first places you should look at when something web-based that you've coded is not working correctly or at all, as HTTP is normally the lowest layer you need to care about.

In particular, the `Content-type` header is a common source of mistakes: if you want to serve e.g. a script or a stylesheet but you don't set the correct type header, your browser may download the file just fine but won't do anything with it. Similarly, whether you send `text/plain` or `text/html` determines whether the browser will interpret a file you navigate to as HTML or not.
