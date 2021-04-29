# Unit contents

This website is hosted on github at [github.com/cs-uob/COMS10012](https://github.com/cs-uob/COMS10012). You can clone the repository (you'll learn what this means in week 13) to have an offline copy if you prefer, and then "git pull" (you'll learn this too) to see if there have been any updates. The main page for the website is `docs/README.md`, and the subpages for different parts are fully built HTML/CSS websites. Of course, you can also just use the website online.

Videos are hosted externally on the university systems, but we are using a trick that allows you (at the moment) to access the raw mp4 files. You can download them for offline watching if you like, but you may not share them with non-students or reupload them anywhere else online as it's not your intellectual property.

## Weeks 13 and 14 - An introduction to POSIX and Git

Here you will learn how to administer a Linux/POSIX system. We will be using Alpine linux.

The material for these weeks is hosted on [exercises/posix](./exercises/posix). This includes both video links and workshop content.

  * [Activity 1](./exercises/posix/act1/index.html) is for the Tuesday workshop in Week 13 (9-11am, 2 February). Ideally you have watched the videos for activity 1 on Monday, but you can catch up later if you like as it's the first week of term.
  * [Activity 2](./exercises/posix/act2/index.html) is for the Friday workshop in Week 13 (11am-1pm, 5 February).
  * [Activity 3](./exercises/posix/act3/index.html) is for the Tuesday workshop in Week 14.
  * [Activity 4](./exercises/posix/act4/index.html) is for the Friday workshop in Week 14.

## Week 15 - Consolidation week

In Week 15, there will be no new material. You can use this week to revise or catch up on material from Weeks 13-14. The workshops become drop-in sessions which are optional to attend, and do not count towards your attendance target.

## Week 16

On Tuesday, we had a live lecture on debugging that you can find here on [Microsoft Streams](https://web.microsoftstream.com/video/b920571e-e55c-4dbc-b29c-162c5a565486?list=studio) (uni login required). We then did some debugging exercises that you can find here:

  * Text: [text.c](/COMS10012/resources/debugging/text.c) and [text.h](/COMS10012/resources/debugging/text.h). Compile with `gcc -Dtest_text -g text.c -o text`.
  * Stackcalc: [stackcalc.c](/COMS10012/resources/debugging/stackcalc.c) and [stackcalc.txt](/COMS10012/resources/debugging/stackcalc.txt). You need to `sudo apk add readline-dev` then compile with
  `gcc -g stackcalc.c -o stackcalc -l readline`.

For Friday, please watch the following videos:

  * [Build Tools part 1](https://ams-hsta-ims-ond.mediasite.com/MediasiteDeliver/vol01/bristoluniversity/MP4Video/e4cdcf68-e1e3-4e01-8eba-bf22a48a2f5f.mp4/QualityLevels(698000)) (25 minutes) [slides](https://cs-uob.github.io/COMS10012/slides/Build%20Tools%201.pdf)
  * [Build Tools part 2](https://ams-hsta-ims-ond.mediasite.com/MediasiteDeliver/vol01/bristoluniversity/MP4Video/7aa9e7bf-de38-42bf-8fef-11585ca85f72.mp4/QualityLevels(698000)) (18 minutes) [slides](https://cs-uob.github.io/COMS10012/slides/Build%20Tools%202.pdf)

The exercises for the Friday workshop start [here](buildtools/c.md).

## Week 17 - Reading week

In Week 17, there will be no new material. The workshops become drop-in sessions which are optional to attend, and do not count towards your attendance target.

## Weeks 18 and 19 - Databases

In these weeks you will be learning SQL and the MariaDB database. Instructions to install it on Alpine linux are provided; you can also install it on your host OS if you want to, but we will not provide technical support for this.

The videos and activities for these weeks can be found under [exercises/databases](https://cs-uob.github.io/COMS10012/exercises/databases/databases/1/sql-introduction.html).

## Week 20 - Databases catch-up week

In this week the workshops become drop-ins: they are optional, attendance is not taken and this week doesn't count for your 75% attendance hurdle.

There is no new material - you can work on any of the previous material you haven't finished yet, and ask questions in Ask a TA or on the padlet or in the drop-ins.

## Easter break

Make sure you all take at least one full week off over Easter!

## Weeks 21 and 22 - An introduction to web technologies

Tuesday Week 21

Videos, slides and activity sheet

* [Introduction to the web and HTTP](https://mediasite.bris.ac.uk/Mediasite/Play/15d48070d3b24991a7b6fee432c6f95e1d) (28 minutes) [slides](./slides/IntroductionToTheWebAndHTTP.pdf)

* [Introduction to HTML](https://mediasite.bris.ac.uk/Mediasite/Play/7c3f70ca5d754a8b998bfadcac2207271d) (27 minutes) [slides](./slides/HTMLIntroduction.pdf)

* [Introduction to CSS](https://mediasite.bris.ac.uk/Mediasite/Play/e6ef7bb5b20349f5923f063dc4a106141d) (22 minutes) [slides](./slides/CSSIntroduction.pdf)

* [Activity sheet](./exercises/web/ActivitySheet_Week21_Tuesday.pdf)

Friday Week 21

Videos, slides and activity sheet

* [Introduction to JavaScript, the HTML DOM and JSON](https://mediasite.bris.ac.uk/Mediasite/Play/2bfce318d4b84c12b9ee12dd9f2729a51d) (27 minutes) [slides](./slides/JavaScript_DOM_JSON.pdf)

* [Activity sheet](./exercises/web/ActivitySheet_Week21_Friday.pdf)

Tuesday Week 22

There are no lectures for this session. The activity sheet gives a series of coding exercises that involve accessing Web APIs and dynamically loading data into an HTML page. This builds on the activity from Friday Week 21 and introduces you to a number of different Web APIs and also the fetch function. Here are three files to get you started:

* [index.html](./resources/week22/index.txt)

* [style.css](./resources/week22/style.css)

* [script.js](./resources/week22/script.js)

* [Activity sheet](./resources/week22/ActivitySheetTuesdayWeek22.pdf)

Friday Week 22

There are no lectures for this session. The activity involves modifying a sample Spring web application that displays information about UK geography, which you hopefully already know from your databases exercises. On Tuesday the activity will build on this Spring web application and focus on using React to display the county information.

* [Activity sheet](./exercises/web/censusexplorer.html)

## Week 23: The Cloud

We have selected a subset of lectures from a later-year unit on _Cloud Computing_ to give you an introduction to the topic.

The Tuesday workshop will be a continuation of the Week 22 activities, but we still suggest that you watch the first cloud lectures before Tuesday week 23.

**For Tuesday**:

  - [Introduction](https://mediasite.bris.ac.uk/Mediasite/Play/0ad3ecd639aa4f67a9b0d1d162c5f7a21d) (19 minutes)
  - [Economics](https://mediasite.bris.ac.uk/Mediasite/Play/135444aa12ff4c26b8a9c7ad693e1fa61d) (16 minutes)
  - [As A Service](https://mediasite.bris.ac.uk/Mediasite/Play/ff04fe5695bf4604bf478405fc9266f81d) (6 minutes)
  - [Amazon Web Services examples](https://mediasite.bris.ac.uk/Mediasite/Play/3d1ac0e5b012470f9be58c40e000c7c01d) (7 minutes)
  - [Amazon Web Services: IaaS](https://mediasite.bris.ac.uk/Mediasite/Play/ea34704392794239b5ecc9517de691771d) (10 minutes)
  - [Google App Engine / PaaS](https://mediasite.bris.ac.uk/Mediasite/Play/7874354926e846ec8cbfb206d6c6047f1d) (8 minutes)
  - [Other providers](https://mediasite.bris.ac.uk/Mediasite/Play/c4eb1e2b73c544d7bed5a6df828de4281d) (6 minutes)

**For Friday**:

  - [Introduction](https://mediasite.bris.ac.uk/Mediasite/Play/06ceda3dd34c49b9b802a6f2e8cb9a6c1d) (10 minutes)
  - [Key-Value Databases](https://mediasite.bris.ac.uk/Mediasite/Play/9b125a5499554316be6cb73449e7aaf71d) (16 minutes)
  - [Document Databases](https://mediasite.bris.ac.uk/Mediasite/Play/4a9cece0618a429295d6d5254202c8f61d)  (7 minutes)
  - [Column-Family Databases](https://mediasite.bris.ac.uk/Mediasite/Play/785791610bb54851b7b3a347b448f4181d) (9 minutes)
  - [Graph Databases](https://mediasite.bris.ac.uk/Mediasite/Play/cf8bf402b10546e9af85ea1b502929811d) (13 minutes)
  - [Choosing a Database](https://mediasite.bris.ac.uk/Mediasite/Play/2f523af23cdf470c8a612ca8277985011d) (9 minutes) 

## Week 24

Week 24 is revision week. The workshops become drop-ins, they are not mandatory and also do not count towards your attendance. There is no new content this week.
