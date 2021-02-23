# Unit contents

This website is hosted on github at [github.com/cs-uob/COMS10012](https://github.com/cs-uob/COMS10012). You can clone the repository (you'll learn what this means in week 13) to have an offline copy if you prefer, and then "git pull" (you'll learn this too) to see if there have been any updates. The main page for the website is `docs/README.md`, and the subpages for different parts are fully built HTML/CSS websites. Of course, you can also just use the website online.

Videos are hosted externally on the university systems, but we are using a trick that allows you (at the moment) to access the raw mp4 files. You can download them for offline watching if you like, but you may not share them with non-students or reupload them anywhere else online as it's not your intellectual property.

## Weeks 13 and 14 - and introduction to POSIX and Git

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
  * Stackcalc: [stackcalc.c](/COMS10012/resources/debugging/stackcalc.c) and [stackcalc.txt](/COMS10012/resources/debugging/stackcalc.txt). You need to `sudo apk add readline-dev` then compile with `gcc -g stackcalc.c -o stackcalc -l readline`.

_I am still working on material for Friday ..._

## Week 17 - Reading week

In Week 15, there will be no new material. The workshops become drop-in sessions which are optional to attend, and do not count towards your attendance target.
