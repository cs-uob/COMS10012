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

Videos and slides

* [Introduction to the web and HTTP](https://mediasite.bris.ac.uk/Mediasite/Play/15d48070d3b24991a7b6fee432c6f95e1d) (28 minutes) [slides](./slides/IntroductionToTheWebAndHTTP.pdf)

* [Introduction to HTML](https://mediasite.bris.ac.uk/Mediasite/Play/7c3f70ca5d754a8b998bfadcac2207271d) (27 minutes) [slides](./slides/HTMLIntroduction.pdf)

* [Introduction to CSS](https://mediasite.bris.ac.uk/Mediasite/Play/e6ef7bb5b20349f5923f063dc4a106141d) (22 minutes) [slides](./slides/CSSIntroduction.pdf)

* [Activity sheet] (./slides/ActivitySheet.pdf)
