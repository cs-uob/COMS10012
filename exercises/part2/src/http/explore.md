# Exploring HTTP

## Before you start

To avoid an annoying problem, before we run our own server we are going to check that no-one else is using the TCP port we want.

Run the command 

```
wget localhost:8000
```

on the machine where you want to run the server. It should time out after a couple of seconds with "failed" and some error message.

If it succeeds (shows "Connected" or "200 OK" anywhere), then someone or something else is using port 8000.

  - If you are on a lab machine, it could be that another student is using port 8000 (maybe they are logged in via SSH).
  - You might have other software (such as a web development package) already using that port.

You can try port numbers 8001, 8002 etc until you get one that is definitely not being used and then replace 8000 with that in all further exercises today, or (on your own machine) you can stop whatever program is using the port first.

Note: if you have vagrant running and set up as described on the last page, and you run `wget localhost:8000` on your own machine, then vagrant will be using port 8000 and `wget` might block waiting for a reply. This is why I asked you to run `wget` on the machine where you want to run your _server_, not the _client_.

## A basic HTTP server

Open a terminal on the machine where you want to run the server, and download the file [http-response](../resources/http-response) to the folder where your terminal is open (for example with `wget`). Then run the command

```
nc -v -l -p 8000 < http-response
```

This calls the tool `nc` ("network cat") and tells it to be verbose (`-v`) and to listen on TCP port 8000 (`-l -p 8000`), e.g. to run a server there. When a client connects, `nc` will by default read from its standard input and write this to the client, so we use a shell redirect to make it read from a file instead. The file contains some standard HTTP:

    HTTP/1.1 200 OK
    Content-type: text/plain
    Content-length: 18
    Connection: close

    Hello over HTTP!


`nc` will block until you connect a client, so open a web browser on your machine. If you're using chrome/edge or firefox, open the debug tools (`F12`) and go to the network tab before you open the page.

Go to `localhost:8000`. You should see the line "Hello over HTTP!" and `nc` will print some details of the connection. You can then close it with `Control+C` if it doesn't terminate by itself. In your debug tools, you will see the HTTP headers that the browser sent, and the ones it received (from the file).

## HTTP on the command line

Run the `nc` command from above again on your server machine. On your client machine, open a different terminal and run the command

```
wget -q -S -O - localhost:8000
```

`wget` makes HTTP connections, normally to download files from a terminal. In this case we tell it to be "quiet" (`-q`) to suppress status information, to show headers (`-S`), to output to standard output instead of a file (`-O -`, note this is a capital O then a plain dash as the next argument) and to connect to port 8000 on the local machine.

`wget` should output the server's headers and the "hello" line, whereas the server terminal should show the headers that `wget` sent as the client.