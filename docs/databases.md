# Databases

The Programme Director has consulted with the School and student representatives on how to mitigate the effects of the strike action, and we have agreed the following.

We will run an extra databases activity alongside the material for Week 19; the workshops in Week 19 will be on both the regular material (HTTP, HTML5) and the databases activity. Since Week 19 was meant to be a gentle start into a new topic, there is enough spare time to insert the extra databases material.

The material described on this page may be assessed in the final exam. The other databases material will not be assessed.

## Videos

Please watch this video alongside the regular material for Week 19.

  - [Introduction to Relational Modelling](https://web.microsoftstream.com/video/b625867d-b140-47ac-835e-4c2d364202de?channelId=793a8a65-ed73-4803-820f-dd7f2c675f46) (30 minutes) ([PDF](https://uob.sharepoint.com/:b:/r/teams/UnitTeams-COMS10012-2021-22-TB-2-A/Shared%20Documents/Documents/Relational%20modelling%201.pdf))

## Exercise 1 - Reading an ER Diagram

Here is an ER diagram for a fictional university database:

![ER diagram](exercises/part1/resources/uni-diagram.png)

Looking at the diagram and the table schemas, answer the following questions for yourself:

  * Which relationships are mandatory or optional? (For example, must every unit have at least one student enrolled?)
  * Which relationships are one-one, one-many or many-many?

## Exercise 2 - Drawing an ER Diagram

Draw an ER diagram for the following scenario.

> The University of Bristol Hoverboard Society (HovSoc) wants to create a database to manage its membership and events. Each member has a name, an optional student number, a contact e-mail address and a hoverboard riding skill level (represented as an integer, minimum 0). We assume that e-mail addresses are unique among members.
> 
> The committee consists of some of the members, each of which has a unique committee role. We assume that committee roles do not change during the year and that each committee role must be filled every year.
>  
> An event has a date, a name, a location, an optional description and an organiser who must be a society member (not necessarily a committee member). An event is attended by a set of members. There is never more than one event at the same location on the same date but event names are not unique.

You can draw the diagram with pen and paper or you can use a free modelling tool like [draw.io](https://draw.io). 

  * For draw.io, open the "Entity Relation" section in the menu on the left and use the "Table" (first item) object for tables. Clicking on it adds a table to your diagram.
  * To add a row to a table, select an existing row and press Control-D (duplicate item). To delete a row, press the delete key.
  * To add a relationship, select a table by clicking its header and drag one of the blue triangles that appear round the edges onto another table. You can change the type of a relationship in the details panel on the right (the "line start" and "line end" boxes).
  * File/Save as lets you download your diagram in an XML-based format, which you can open and edit later. File/Export as lets you download it as an image.

## Exercise 3 - University Database

Using what you have learnt so far about relational modelling, think about and discuss in groups how you would model a university database to store student's academic progress, such as units enrolled on and completed, marks obtained etc. based on your understanding of how the University of Bristol works. For example, a unit can have different assessments with different weights. You will of course also need a Students table, and you can make the model more involved if you like by including that different students are on different degree programmes, and that sometimes students have to resit units.

You should end up with a more detailed version of the model briefly shown at the top of the previous page.

This is also a good point to mention another fact of how marks and credit points work: exam boards. At the end of each academic year around May/June, your unit directors all report their marks for each student to an exam board, which sits and decides on final marks and awarding credit. For example, an exam board can moderate the marks for a unit. This is why you do not get your exam marks until a long time after the exam has happened, even if it's a multiple choice exam that can be marked automatically: the marks still have to go through an exam board. If you want to model this, the idea here is that a student has two marks associated with each unit: the "actual mark" (the input to the exam board) and the "agreed mark" (the one that comes out of the board and goes on your transcript). Of course, for most students most of the time, the two are the same. Your model will need to store "agreed marks" explicitly, but there are ways of doing the model that does not store the "actual mark" directly. Think about how you could recompute it from other information in the database.

The key idea in relational modelling is not to store information more than once if you can avoid it. If you have stored in several places that Fred is taking Introduction to Programming, and then Fred switches his units, you don't want to end up with a situation where this change is only reflected in some parts of the database.
