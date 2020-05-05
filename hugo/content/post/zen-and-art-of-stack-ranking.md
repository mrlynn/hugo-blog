+++
author = "Michael Lynn"
categories = ["excel", "analytics"]
date = 2018-10-13T20:43:19Z
description = ""
draft = false
image = "/images/2018/10/photo-1528981194590-6af05c5c7d58.jpeg"
slug = "zen-and-art-of-stack-ranking"
tags = ["excel", "analytics"]
title = "Zen and Art of Stack Ranking with Excel"

+++

## Background

Stack Ranking as the name implies is the process of stacking things or people up and applying a 1 to n rating to each.  Unlike a standard performance rating, a ranking implies that no two employees should have the same assigned rank and that when you’re finished, someone will be number one and someone will be on the bottom of the pile.

Stack Ranking the members of your team can be a loathsome task.  Especially when you consider the fact that many companies use this tool as a way to identify and carry out targeted reductions in force.  The issue that many managers face when it comes to stack ranking is that even if you have a solid team of super hero performers, someone will be on the bottom of the list.

Some have argued that there are many problems with the stack ranking system.  And I must admit the arguments against are valid.

Nevertheless, the stack ranking system, when used effectively can provide great insight into the performance of your team and can highlight important focus areas for enablement and development.  One key to ensuring that you are getting an accurate representation of your team and the rank each member assumes is by including the critical data elements by which you will evaluate them.  This means having some good reference material about what each team member’s job description or role entails.  This will be especially helpful when communicating results to employees as well as superiors.

## Implementing a Ranking System

Any ranking system should have a core set of components that will enable you to record the scores of your team members as they relate to criteria or attributes.  I’ve chosen Microsoft Excel as the system I’ll use, but there are many systems available that will work.

Below, I have included an image with various highlighted sections.  The following section of this article will explain the various components and offer suggestions for implementing your own ranking system.

## Core components

## A – Success Criteria

Every job has a success profile or a set of criterion upon which success will be judged.  If this has not been communicated properly, you should exit this article here and get that done ASAP.  There is no point in attempting to apply a ranking when your team has no idea about what you consider critical success criteria.  For our implementation, we’re going to start with a two-tiered categorization of success criteria.  This just makes communicating the results easier.

To make things easier to communicate, I’ve enabled a two tiered categorization leveraging the ‘merge and center’ feature of Excel to consolidate the second tier of criteria under the first.

## B – Criteria Weighting

I am a huge proponent of incorporating a method of expressing weights to each of the criteria upon which you will rank your staff.  Let’s face it, not every attribute is going to be of equal importance.   Is punctuality as important as follow-through or proactivity?  I won’t debate these here but I will argue that they are of differing levels of importance so any tool used to record your teams’ performance should give you the ability to reflect this.

The weights recorded in this section are used to populate a section of the results summary.   The weighted scores and ranking are calculated by multiplying the score entered by the weight for this criteria divided by the maximum possible weight (10 in my example.)  The function for the weighted score is as follows:


`=IF(B5>"",SUM(($E5*$E$4)/10,($F5*$F$4)/10,($G5*$G$4)/10,($H5*$H$4)/10,($I5*$I$4)/10,($J5*$J$4)/10,($K5*$K$4)/10,($L5*$L$4)/10,($M5*$M$4)/10,($N5*$N$4)/10,($O5*$O$4)/10,($P5*$P$4)/10,($Q5*$Q$4)/10,($R5*$R$4)/10,($S5*$S$4)/10),"")`

If you’re new to Excel, this will probably look like gibberish. Just understand that the letters and numbers refer to cell locations in the worksheet. Where you see a cell letter or number prefaced with a dollar sign ($), that’s used to harden the reference so that as we iterate through the various cells to perform the calculation, we don’t increment that cell reference.

There’s probably a better or more efficient way to calculate this, but I couldn’t figure one out so I did it the hard way by manually copying and pasting the calculation across all of the various criteria columns.

### C – Employees

Ok, now we’re getting to some data entry.  Column B contains a list of your employees, or the members of the team you’re going to be reviewing.

### D – Title

Entering a title for each team member under review enables us to gain further insight into performance of the team.  With this, we can answer questions such as “How are Sr. Hero’s doing across our criteria in comparison to Heros?”

### E – Discipline

Recording a discipline for each employee is optional.  I view it as essential, however because it will give you even more insight into how your team is performing.  Think of discipline as a specialization within your team.  To determine if you’ll find a discipline useful, examine the differentiation between the roles performed by the members of your team.  Are some focusing on a completely separate project or set of customers?  If so, use this to further differentiate them.

### F – Scores

Here’s where the tough work begins.  You  must record a score for each employee as to their performance against the specific criteria.  I’m suggesting a straight integer score from 0 to 10.  To enforce accuracy and eliminate errors in reporting results, I’ve created data validation rules that force users to enter a whole number between 0 and 10.


## Conditional Formatting Rules for Scores

As you enter the scores, you will notice that there are special conditional formatting rules applied to the data entry area for scores.  These rules give the data entry area additional readability by color coding high scores in green and low scores in red.  As you complete the process of evaluating and recording scores, the summary results and rankings can be viewed in columns T through Y or sections G through L respectively.

Note, that in columns V and Y, you can sort the data in ascending score or rank by weighted or raw values using the up arrow and down arrow buttons.

### G – Score

Section G contains the computed raw score values for each of the values you entered in section F (columns E through S.)  Note that this section does not take into consideration the weightings that you applied in section B.  I have implemented another set of conditional formatting rules to help identify the top and bottom performers by score.  The remainder of the computed sections apply these same conditional formatting rules.

The value for this section is computed by simply summing each of the score columns.

`=IF(B5>"",SUM(E5:S5),"")`

### H – Percentage

Section H contains the percentage of total points scored out of the total possible points.  This field is calculated by dividing the total points scored by the total points available from all of the criteria columns.

`=IF(B5>"",T5/150,"")`

### I – Rank
Section I shows the ranking of the employee based on the unweighted, or raw total score. This is a tricky calculation due to the fact that you may encounter multiple employees with the same exact score. A proper ranking system will never provide the same rank for multiple items or employees. We start with Excel’s built-in RANK() function which will provide a numeric ranking of a series or range of data. However, to ensure that we never present multiple similar ranks, we implement a simple test to add a value to any ranks where duplicate scores in column T may appear. This ensures that no duplicates appear in our ranking system.

`=IF(B5>"",RANK(T5,T$5:T$24)+COUNTIF($T$5:T5,T5)-1,"")`

### J – Weighted Score

Section J gives us an opportunity to leverage the weights you specified in section B for each of the criteria. Here, we’re calculating the total score offset by the individual weights for the separate criteria. This is where is gets a bit tricky. Each score gets multiplied by the weight and then divided by total possible points or 10 in this example.

`=IF(B5>"",SUM(($E5*$E$4)/10,($F5*$F$4)/10,($G5*$G$4)/10,($H5*$H$4)/10,($I5*$I$4)/10,($J5*$J$4)/10,($K5*$K$4)/10,($L5*$L$4)/10,($M5*$M$4)/10,($N5*$N$4)/10,($O5*$O$4)/10,($P5*$P$4)/10,($Q5*$Q$4)/10,($R5*$R$4)/10,($S5*$S$4)/10),"")`

Be sure to utilize the Up Arrows and Down Arrows in sections M and N to sort the employee data by rankings as you complete the data entry.

### K – Weighted Percentage

Section K presents the total percentage of weighted score points achieved versus possible. This is the same calculation that we used for the raw percentage but uses the weighted score in column W instead of the raw score.

`=IF(B5>"",W5/$W$4,"")`

### L – Weighted Rank

Section L gives us a view into the weighted ranking of the employee. Obviously, if you weighted each of the criteria the same, the weighted value and the raw values will be the same and thus so too will the rankings be the same.

### M – Raw Rank Sort Buttons

The Up Arrow will enable you to sort the employees by ascending rank based on the raw scores and data whereas the Down Arrow will sort by descending rank.  To enable this sorting feature, I’ve created a button and an associated macro.

```
Sub btnSortUWAscending()
'
' btnSortUWAscending Macro
'
 Range("alldata").Select
 ActiveWorkbook.Worksheets("Sheet1").Sort.SortFields.Clear
 ActiveWorkbook.Worksheets("Sheet1").Sort.SortFields.Add Key:=Range("uwrank") _
 , SortOn:=xlSortOnValues, Order:=xlAscending, DataOption:=xlSortNormal
 With ActiveWorkbook.Worksheets("Sheet1").Sort
 .SetRange Range("alldata")
 .Header = xlGuess
 .MatchCase = False
 .Orientation = xlTopToBottom
 .SortMethod = xlPinYin
 .Apply
 End With
End Sub
```

You will notice the use of several named ranges.  For example, “alldata” is a named range which refers to =Sheet1!$A$5:$Y$24.  “uwrank” is a named range which refers to all of the values in the raw ranking calculated column.

You can use the Excel Name Manager to modify this if you should modify the spreadsheet significantly.
