# TGrep2 tutorial

## Getting started

Open VMWare. Log on to the virtual lab by following the instructions [here](http://esslli2016.unibz.it/?page_id=2228). Open a terminal -- under the Applications menu, select Accessories > Terminal.

Make sure your environment variables are properly set. If they are, the output of the `echo` command should match the output below. In the terminal, type:

```
$ echo $TGREP2ABLE
/home/shared/esslli/corpus_pragmatics/corpora
```

```
$ echo $TDTlite
/usr/local/TDTlite
```

```
$ echo $TDT_DATABASES
/home/shared/esslli/corpus_pragmatics/corpora/databases
```

Create a directory for saving tgrep2 output to and name it tgrep2_playground (or anything else you like). Check that it exists. Change into it. Check your current path (location).

```
$ mkdir tgrep2_playground
$ ls
$ cd tgrep2_playground
$ pwd
/home/others/esslliXXX/tgrep2_playground
```

Find out what corpora can be used with TGrep2. All files that contain 't2c' in their name are tgrep2able corpora.

```
$ ls $TGREP2ABLE
```

If there is a particular corpus that you want to use as a default, set a default `TGREP2_CORPUS`. Currently, the Switchboard is set to be the default corpus. This allows you to not have to use the '-c' option and specify a corpus directly in the tgrep2 command.

## Basic TGrep2 queries

Let's find all the instances of "some". We use the options -a and -f so that all subtrees matching one or more patterns will be reported, but each subtree will only be reported once.

```
$ tgrep2 -af "PP"
```

In order for the output to not be written to standard out, which doesn't allow us to scroll through in an organized way and clutters the window, we use the pipe ("|") and "more" command in the following way:

```
$ tgrep2 -af "PP" | more
```

Scroll down with the arrow or space bar keys. Press `q` to get back to the prompt.

The output looks a little messy because tgrep2 by default returns the syntactic structure of the tree. There are two ways of dealing with this. If we want to see the structure in a more appealing way, we use the -l option:

```
$ tgrep2 -afl "PP" | more
```

If we don't want to see the syntactic structure at all, but only the terminals, we can use the -t option instead:

```
$ tgrep2 -aft "PP" | more
``` 
If we want to save any output to a file, we use ">" followed by the filename. For example:

```
$ tgrep2 -aft "PP" > pp.txt
``` 

We can now look into this file directly (with less or more):

```
$ less pp.txt
``` 

Let's say we want to see the entire sentence that contains the PP:

```
$ tgrep2 -aft "* << PP @> *" | more
```

The asterisk stands for a generic node. "@" (in certain environments "!") stands for negation. In words, the pattern states: find all nodes that dominate a VP and that are themselves not dominated by any other node; that is, find the top-level sentence node. 

If we want to see the number of matches instead of the actual output:

```
$ tgrep2 -aft "PP" | wc -l
```

There are 39,058 nodes marked as PP. Note that if used in conjunction with the tgrep2 -l option, this won't return the actual number of matches, because wc -l counts lines and the tgrep2 -l option splits a match up into multiple lines to display pretty syntax.

This pattern doesn't recover all PPs. Some PPs have additional annotation in their node label -- a handful of semantic roles are distinguished: direction, location, manner, purpose, and time.

We get around this by searching for all nodes that *start* with PP:

```
$ tgrep2 -aft "/^PP/" | wc -l
```

You can see that this returns 57,385 PPs. Let's look more closely at their syntax.

```
$ tgrep2 -afl "/^PP/" | more
```

This returns things like PP-UNF, PP-LOC, PP-DIR, etc. 

Say that instead of returning the actual PP, we want to see each prepositional head:

```
$ tgrep2 -afl "IN > /^PP/" | more
```

Let's get to some more complex patterns. Let's find VPs that dominate two PPs that immediately follow each other. Here's a start:

```
$ tgrep2 -afl "/^VP/ << /^PP/ . /^PP/" | more
``` 

There are many issues with this pattern. The first is: relations always link the following node to the first node. So, if we want to group the two PPs together, we use parentheses:

```
$ tgrep2 -afl "/^VP/ << (/^PP/ . /^PP/)" | more
``` 
Second, we don't want it to retrieve intermediate sub-trees, so we restrict the pattern to force the VP to directly dominate the PP.

```
$ tgrep2 -afl "/^VP/ < (/^PP/ . /^PP/)" | more
``` 

This is starting to look good! Say we want to limit ourselves to cases where the first PP is headed only by either "on" or "in":

```
$ tgrep2 -afl "/^VP/ < (/^PP/ < (IN [< over | < for]) . /^PP/)" | more
``` 

We can write this differently by putting the disjunction directly in the preposition node (make sure there are no spaces!):
```
$ tgrep2 -afl "/^VP/ < (/^PP/ < (IN < over|for) . /^PP/)" | more
``` 

What if we want to restrict ourselves to there really only being two PPs? Here is where node labeling becomes useful:

```
$ tgrep2 -afl "/^VP/ < (/^PP/=pp1 . (/^PP/ @$ (/^PP/ @= =pp1)))" | more
``` 

An important issue that can cause huge headaches: crossing links. A crossing link extends from a node to a subtree on its left. The problem with crossing links is that they can make matching a pattern to a tree an extremely slow and complicated computational process. Therefore, TGrep2 does not permit crossing links. If a link to a labeled node forms a crossing link, then a copy is made of the whole subtree in the pattern pointed to by the link. For example:

```
$ tgrep2 -afl "/^VP/ < (/^PP/=pp1 < (IN < on)) | < (/^VP/ < =pp1)" | more
```

Use the -z option to show the search pattern that tgrep2 operates on.

```
$ tgrep2 -aflz "/^VP/ < (/^PP/=pp1 < (IN < on)) | < (/^VP/ < =pp1)" | more
```

A final useful feature are macros. For patterns we use over and over again, it might get cumbersome to keep typing them out, so we can build shortcuts. You can generate a file of macros that you can then use directly in your patterns simply by passing the macros file to tgrep2 as the last argument before the pattern. For example, we may want to define NP and VP macros so we don't have to keep typing all the slashes. Generate a macros file and call it MACROS.ptn by opening it in vi:

```
vi MACROS.ptn
```

Add the following content to it (press "i" to insert text; press "Esc" to get out of edit mode; enter ":wq" to save and exit):
```
@ PP    /^PP/;
@ VP    /^VP/;
```

Now we can run our VP dominating two PPs pattern using macros:

```
$ tgrep2 -afl MACROS.ptn "@VP < (@PP=pp1 . (@PP @$ (@PP @= =pp1)))" | more
``` 




## Resources

For information about the Switchboard corpus, look [here](http://groups.inf.ed.ac.uk/switchboard/index.html).

For information about the Penn Treebank (including POS and syntactic tagsets), look [here](http://citeseerx.ist.psu.edu/viewdoc/download?doi=10.1.1.9.8216&rep=rep1&type=pdf).







