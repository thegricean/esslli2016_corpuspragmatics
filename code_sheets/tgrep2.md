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
$ tgrep2 -af "some"
```

In order for the output to not be written to standard out, which doesn't allow us to scroll through in an organized way and clutters the window, we use the pipe ("|") and "more" command in the following way:

```
$ tgrep2 -af "some" | more
```

Scroll down with the arrow or space bar keys. Press `q` to get back to the prompt.

So far, this isn't very exciting -- all that's returned is the word "some". If we're interested in seeing the content around it, we need to make the head node of the match (the left-most node) something that spans "some". For example, if we want to extract the NP that "some" is embedded in, we use regular expression syntax in the following way:

```
$ tgrep2 -af "/^NP/ << some " | more
```

The output looks somewhat messy because tgrep2 by default returns the syntactic structure of the tree. There are two ways of dealing with this. If we want to see the structure in a more appealing way, we use the -l option:

```
$ tgrep2 -afl "/^NP/ << some " | more
```

In words, this pattern states: return all nodes that begin with NP (which will match both nodes labeled simply "NP", but also nodes labeled "NP-SBJ" or "NP-PRD") and that dominate "some".

If we don't want to see the syntactic structure at all, but only the terminals, we can use the -t option instead:

```
$ tgrep2 -aft "/^NP/ << some " | more
``` 

Let's say we want to see the entire sentence that contains the "some"-NP:

```
$ tgrep2 -af "* << some @> *" | more
```

The asterisk stands for a generic node. "@" (in certain environments "!") stands for negation. In words, the pattern states: find all nodes that dominate "some" and that are themselves not dominated by any other node; that is, find the top-level sentence node. 

If we want to see the number of matches instead of the actual output:

```
$ tgrep2 -af "* << some @> *" | wc -l
```

Note that if used in conjunction with the tgrep2 -l option, this won't return the actual number of matches, because wc -l counts lines and the tgrep2 -l option splits a match up into multiple lines to display pretty syntax.



si example

van tiel & doran
