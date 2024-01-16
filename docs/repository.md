# About this repository -- by David Bernhard

Some behind-the-scenes information on how this unit page is set up, in case you ever need something similar for a project of your own.

This page is hosted publicly on github at `cs-uob/COMS10012` so for example the address [https://github.com/cs-uob/COMS10012](https://github.com/cs-uob/COMS10012) (or the ssh equivalent `git@github.com:cs-uob/COMS10012` that you'll learn about in the unit) will let you clone this repository. Opening the link in a browser will let you browse the repository too, or download a ZIP of the latest version.

[Github pages](https://pages.github.com/) lets you host a website from a git repository. The website for this unit is hosted at [https://cs-uob.github.io/COMS10012/](https://cs-uob.github.io/COMS10012/) which is also the link to the unit page that you'll see - Github Pages by default serves the pages under the `USERNAME.github.io` domain. Github pages provides static hosting, so you can put in any combination of HTML/CSS and client-side JS, but not any server-side scripts (e.g. JSP or similar). It also uses the [Jekyll](https://jekyllrb.com/) content management system that turns [markdown](https://www.markdownguide.org/basic-syntax/) into websites. The site is set up to point to the `docs/` folder, so the source for this page for example is [docs/repository.md](https://github.com/cs-uob/COMS10012/blob/master/docs/repository.md) - that link will show you a Github preview, but clicking "raw" shows you the [source file](https://raw.githubusercontent.com/cs-uob/COMS10012/master/docs/repository.md). (The blue bar at the top of this unit page is part of a Jekyll template, configured in `docs/assets/css` and `docs/_layouts`.)

Some code that's referenced in the workbooks is stored in the `code/` folder of the repository, and linked to from the relevant exercises. These exercises will tell you to clone the repository, then switch to e.g. `code/server01/` to work with the example application there.

The workbooks themselves are created with a different content management system called [mdbook](https://rust-lang.github.io/mdBook/) which is written in Rust, but available as an executable so I don't have to build it myself. Like Jekyll, it turns markdown pages into websites but it has a few extra features like the overview bar on the left, different styles that you can switch with a button (if you prefer "dark mode" for example) and it lets me run the markdown through a custom preprocessor that I wrote myself in python to handle custom tags, for example for the "advanced" blocks that you'll see on some pages. The files are organised like this:

  - The sources are in `exercises/part1` (resp. `part2`) in the repository. Since this is not under `docs/`, github pages doesn't touch it.
  - Running `mdbook build` in that folder (assuming the tool is installed) compiles the files to a subfolder `book/`. You won't see this in the repository because it's excluded with the `.gitignore` file.
  - `book.toml` is the `mdbook` configuration file which among other things runs `preprocessor.py` (assuming python 3 is installed). The point of this is that I can make custom blocks e.g. `|||advanced ... |||` which becomes a `<div class="advanced container">` to which I can apply custom styling (at the end of `theme/css/general.css`).

To build the books whenever we make a change to the source files, we use a Github workflow - a script that runs on a virtual machine on Github's servers whenever a commit gets pushed. This is configured in `.github/workflows/mdbook.yaml` and describes the steps to take: check out the repository, install mdbook, build the books, commit the built files back to the repository where they end up in `docs/exercises/`. This folder is under `docs/`, but it contains HTML/CSS files not markdown ones so Github Pages just serves them as is. That is how the URL [https://cs-uob.github.io/COMS10012/exercises/part1/](https://cs-uob.github.io/COMS10012/exercises/part1/) works.

The heart of the build script is the following shell script - you will learn about scripting in this unit:

```sh
for f in exercises/*; do
    cd $f
    mdbook build
    mkdir -p ../../docs/$f
    cp -r book/* ../../docs/$f
    cd ../..
done
```

In this script, `$f` is the variable for the shell for loop, which iterates over the names of the files/folders in `exercises/` namely `part1` and `part2`.
A special thing about variables in the shell is that you use a dollar sign to read the value of a variable, but not to declare a variable: the loop itself can just say `for f` but to use the variable later, you need `$f`.

For all the folders under `exercises/`, it switches to the folder, builds the book and copies the created files (in `book/`) into the folder `docs/exercises/`. To be on the safe side, the script makes sure the folder exists by creating it first if it does not exist yet (`mkdir -p`). Afterwards it goes back to the top folder so that the next `cd` command will land in the right place.

If you want to use a copy of the unit exercises pages on your own computer, for example when you don't have an internet connection, you can just open the copy in `docs/exercises/part1` starting with the file `index.html`. You just need a browser to view it, no extra markdown tools.

The one thing not hosted on Github are the lecture videos and their slides, for bandwidth reasons. The videos are hosted on Microsoft Streams (which is licensed by the university). You will need your university single sign-on to watch the videos, but if you click a video link when you're not logged in you should be redirected to a log-in page rather than just hitting an error as happened with Blackboard videos for Maths A. The slides links also take you to a Sharepoint folder that requires a university log-in, they're all in [this folder](https://uob-my.sharepoint.com/:f:/g/personal/me17847_bristol_ac_uk/EmKiL-crwpNEtwdSrAK1zE4BGn4ep9RjRsrz7RvPEo-l8Q?e=RpYgxz) and they're just PDF exports of the slides - with that folder link you should be able to download a ZIP of all of them at once if you want.
