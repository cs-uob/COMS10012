# Build tools: Python

The Python programming language comes with a package manager called `pip`.  Find the package that provides it and install it (**hint**: how did we find a missing library in the C build tools?).

We are going to practice installing the [mistletoe](https://github.com/miyuchina/mistletoe) module, which renders markdown into HTML.

  - In python, try the line `import mistletoe` and notice that you get `ModuleNotFoundError: No module named 'mistletoe'`. 
  - Quit python again (Control-d) and try `sudo pip3 install mistletoe`. You should get a success message (and possibly a warning, explained below).
  - Open python again and repeat `import mistletoe`. This produces no output, so the module was loaded.

Create a small sample markdown file as follows, called `hello.md` for example:

    # Markdown Example

    Markdown is a *markup* language.

Open python again and type the following. You need to indent the last line (four spaces is usual) and press ENTER twice at the end.

    import mistletoe
    with open('hello.md', 'r') as file:
        mistletoe.markdown(file)

This should print the markdown rendered to HTML, e.g.

    <h1>Markdown Example</h1>\n<p>Markdown is a <em>markup</em> language.</p>


<style>
div.container { padding: 0; background-color: #efefef; }
div.advanced header { background-color: lightskyblue;   padding-left: 0.5ex; }
span.advanced-title::before { content: "Advanced note" }
div.container-content { padding: 1ex; }
div.container-content :first-child { margin-top: 0; }
div.container-content :last-child { margin-bottom: 0; }
</style>
<div class="advanced container">
<header><span class="advanced-title"></span></header>
<div class="container-content">
<p>Python version 3 came out in 2008 and has some syntax changes compared to Python 2; version 2 is now considered deprecated. On most systems, you simply use 'python' and 'pip' for the version 3 commands. Alpine is a bit of an exception here as it still calls the commands 'python3' and 'pip3', in case you are still using programs that require version 2.</p>
<p>When a language comes with its own package manager, sometimes you have a choice between using the OS package manager (e.g. apk) and the language one (e.g. pip) to install modules. Generally speaking, the language one will contain the most up-to-date versions and you should use that unless you have a reason to do otherwise.</p>
<p>At the time of writing for example, the Alpine repos contain pip version 19, but the python distribution itself contains version 21, so you get a warning when you are using the older one - complete with the command you should type to install the newer one, except that on Alpine you actually have to type <code class="language-plaintext">sudo pip3 install --upgrade pip</code>.</p>
<p>
You can in fact use pip without sudo, by passing the <code>--user</code> option which installs packages into a folder in your home directory (<code>~/.local</code>) instead of in /usr which requires root permissions. It is a matter of choice which one to use, except if you are on a machine without root rights (like a lab machine) where you have to use the user install option.
</p>
</div>
</div>

## Scipy

In Maths B, we will be using `scipy` for statistics, so you may as well install that too. Unfortunately, `pip` will complain because scipy depends on a C library for fast linear algebra.  You could go and install all the dependencies (and you might have to do this if you need a specific version of it), but it turns out Debian has it all packaged up as a system package too: if it is at the version you need you could install that instead.  Try searching for it with `apt search scipy`.

The following commands show if it is correctly installed, by sampling 5 times from a Normal distribution with mean 200 and standard deviation 10:

    from scipy.stats import norm
    norm(loc=200, scale=10).rvs(5)

This should print an array of five values that are not too far off 200 (to be precise, with about 95% confidence they will be between 180 and 220 - more on this in Maths B later on).

## Avoiding sudo

If you need to install libraries you might be tempted to install them for all users by using `sudo pip` but this can lead to pain!  If you alter the system libraries and something in the system depends on a specific version of a library then it can lead to horrible breakage and things not working (in particular on OSs like Mac OS which tend to update libraries less often).

Python comes with a mechanism called [venv](https://docs.python.org/3/library/venv.html) which lets you create a virtual python install that is owned by a user: you can alter the libraries in that without `sudo` and without fear of mucking up your host system.  Read the docs and get used to using it---it'll save you a world of pain later!

|||advanced
`pip freeze | tee requirements.txt` will list all the packages your using and what version they are and save them in a file called `requirements.txt`.

`pip install -r requirements.txt` will install them again!

This makes it *super easy* to ensure that someone looking at your code has all the right dependencies without having to reel off a list of _go install these libraries_ (and will make anyone whoever has to mark your code happy and more inclined to give you marks).
|||
