# TGrep2 tutorial

Based on the manual by Rohde 2005.

The "T" in TGrep2 stands for "tree"; the "grep" for the Unix command-line utility that does regular expression search. Together, this allows us to search syntactic trees with regular expressions. TGrep2 operates on syntactically parsed corpora encoded especially for it — see manual for info on how to encode (pretty easy).

General usage:

```
tgrep2 [options] [macrofile] <pattern>
```

If you ever need to see the help page and don't have the manual handy: 
```
tgrep2 -h
```

The help page will list formatting options and available relations between nodes. TGrep2 patterns consist of node names and relationships between those nodes. A node name consists of a string or a regular expressions (if the latter, enclosed in slashes).

TGrep2 performs depth-first search. For example, A >> B will try to find the lowest B that is an ancestor of A, starting with A’s parent and working up towards the root of the tree. Similarly, A .. B will find the next B, in depth-first search order, following A. 

## Getting started

Open VMWare. Log on to the virtual lab by following the instructions [here](http://esslli2016.unibz.it/?page_id=2228). Open a terminal -- under the Applications menu, select Accessories > Terminal. **If you save files on the virtual machine, make sure to save them into your home directory -- everything not saved in the home directory will be deleted when you log out!**

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

Set a default `TGREP2_CORPUS`. If you want to use the Switchboard with pretty tags (i.e., no IDs in the node labels), set it as follows:

```
$ export TGREP2_CORPUS=/home/shared/esslli/corpus_pragmatics/corpora/swbd.t2c.gz
```

If you instead want to use the Switchboard that will allow for prosodic information to be extracted, set it instead to:

```
$ export TGREP2_CORPUS=/home/shared/esslli/corpus_pragmatics/corpora/sw.backtrans_011410.t2c.gz
```

This version of Switchboard will allow you to extract prosodic information (so we'll use it on Thursday when we start adding extra information to our database of factive verbs), but for the purpose of trying out different TGrep2 commands and iterating on patterns, the basic version with pretty tags will be more useful. The numbers reported throughout this tutorial are based on using the basic version without prosodic information. Only the basic version will return output with a pattern like "PP" instead of "/^PP/", because it does not contain additional IDs in its node labels. You can always switch the default corpus you are working with by re-setting (with the export commands specified above) the $TGREP2_CORPUS variable. If you want to know what the variable is currently set to:

```
$ echo $TGREP2_CORPUS
```

## Basic TGrep2 queries

Let's find all the prepositional phrases in the corpus. We use the options -a and -f so that all subtrees matching one or more patterns will be reported, but each subtree will only be reported once.

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

Macros are useful. For patterns we use over and over again, it might get cumbersome to keep typing them out, so we can build shortcuts. You can generate a file of macros that you can then use directly in your patterns simply by passing the macros file to tgrep2 as the last argument before the pattern. For example, we may want to define NP and VP macros so we don't have to keep typing all the slashes. Generate a macros file and call it MACROS.ptn by opening it in vi:

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

Finally, we can control the output. So far, we've seen the -t (terminals) and -l (long-form syntax) options. Using the -w option will print the whole sentence. -x will print only the subtree ID, and -u will print the node label. 

```
$ tgrep2 -afx MACROS.ptn "@VP < (@PP=pp1 . (@PP @$ (@PP @= =pp1)))" | more
$ tgrep2 -afu MACROS.ptn "@VP < (@PP=pp1 . (@PP @$ (@PP @= =pp1)))" | more
``` 

But we can exert more control over what exactly is displayed using the -m option. Sometimes we don't want the head node to be displayed. The following patterns display:

- the first PP
- the first and second PP, separated by a tab
- the second and first PP, separated by a tab
- the VP match ID followed by the first and second PP, tab-separated

...we're starting to get something that looks like a database!

```
$ tgrep2 -afm "%t=pp1=\n" MACROS.ptn "@VP < (@PP=pp1 . (@PP @$ (@PP @= =pp1)))" | more
$ tgrep2 -afm "%t=pp1=\t%t=pp2=\n" MACROS.ptn "@VP < (@PP=pp1 . (@PP=pp2 @$ (@PP @= =pp1)))" | more
$ tgrep2 -afm "%t=pp2=\t%t=pp1=\n" MACROS.ptn "@VP < (@PP=pp1 . (@PP=pp2 @$ (@PP @= =pp1)))" | more
$ tgrep2 -afm "%x=vp=\t%t=pp1=\t%t=pp2=\n" MACROS.ptn "@VP=vp < (@PP=pp1 . (@PP=pp2 @$ (@PP @= =pp1)))" | more
``` 

## Extracting factive verbs and their context

### Background info

#### Factive verbs from Beaver 2010

*Cognitive factives*: know, realize, discover, notice, recognize, find out, remember, forget, be aware that, be unaware that, admit, intuit

*Sensory factives*: sense, see, smell, hear, detect, observe

Should we also include clearly non-factives as a control? E.g., "believe", "think".

### Search

When creating and refining your patterns, it's useful to store them somewhere so you don't lose them or have to re-write them from scratch every time. For example, you might want to open a text editor and save them there, or have your email program open and write yourself an email that contains all the patterns. **If you save files on the virtual machine, make sure to save them into your home directory -- everything not saved in the home directory will be deleted when you log out!**

1. Create a pattern that extracts all sentences that contain an instance of the above listed verbs. Hint: start with just one verb and refine your pattern incrementally in the following way:
	1. Create a pattern that extracts a VP headed by one of the verbs.
		1. Use the -l option to inspect the syntactic structure of the output.
			
			<!---
			tgrep2 -afl "/^VP/ <<, /^know/" | more
			-->		
		
		2. Peruse the data. Which cases look like the kinds of cases we're interested in (verbs with sentential complements)? Which don't? Make one list of "good" structures and one list of "bad" structures.

			<!---
			Good structures:
			```
			(SBAR (-NONE- 0)
				  (S (NP-SBJ
			(SBAR (-NONE- 0)
	  			  (S (SBAR-TMP
			(SBAR (-NONE- 0)
	  			  (S (ADVP
			(SBAR (IN that
	  			  (S (NP-SBJ
			(SBAR (SBAR (IN that
	  			  		(S (NP-SBJ	
	  		(SBAR (IN that)
	  			  (, ,)
	  			  (INTJ (UH uh))
	  			  (, ,)
	  			  (S (NP
			(SBAR (-NONE- 0)
	  			  (S (ADVP-LOC	  			  
	  		```

			Bad structures:
			```
			(SBAR (WHADVP
			(SBAR (WHNP
			(SBAR (WHADJP
			(SBARQ (WHADVP-2
			(SBAR-PRP
			(SBAR-UNF
			(SBAR (SBAR (WHNP
	  		```	  		
			-->

	2. Extend the pattern so it only picks out VPs with sentential complements. Use the information from 1. to extend your pattern by placing constraints on the inner structure of the VP.

		<!---
		Make sure there's a sentential complement:
		```
		tgrep2 -afl "/^VP/ <<, /^know/ <2 /^SBAR/" | more
		```
		Negative definition of constraints:
		```
		tgrep2 -afl "/^VP/ <<, /^know/=verb @< /^SBAR-UNF|^SBAR-PRP/ < (/^SBAR/ , =verb @< /^WH/ @< (/^SBAR/ < /^WH/))" | more
		```
		Positive definition of constraints:
		```
		tgrep2 -afl "/^VP/ <<, /^know/=verb < (/^SBAR/ , =verb [<1 /^-NONE/ | <1 (/^IN/ < that)] < /^S/)" | more
		```
		Check the number of matches of each pattern:
		```
		tgrep2 -aft "/^VP/ <<, /^know/=verb @< /^SBAR-UNF|^SBAR-PRP/ < (/^SBAR/ , =verb @< /^WH/ @< (/^SBAR/ < /^WH/))" | wc -l
		tgrep2 -aft "/^VP/ <<, /^know/=verb < (/^SBAR/ , =verb [<1 /^-NONE/ | <1 (/^IN/ < that)] < /^S/)" | wc -l
		```
		The positive pattern retrieves fewer cases -- is it too restrictive or is the negative pattern to permissive?
		-->

	3. Extend the pattern so it picks out the verb in all its different forms (e.g., "know", "knows", "knowing", "knew", "known").
	4. Extend the pattern so it captures all verbs.
	5. Save the pattern in a macro called @FACTIVE (see above for how to create and use macros).
	6. Create a directory called "factives" in your home directory. Save the output of the pattern to a file factives.txt in the factives directory. How many matches did you generate?


2. Extend your pattern from 1. to retrieve various additional pieces of information about the syntactic context of the verb. Hint: use node labeling and the -m formatting option to output exactly the part of the match that you want.
	1. Output the head verb of the VP.	
	2. Output the complement of the verb.
	3. Output the subject (for classification as first, second, or third person).
	4. Output only those matches where the verb is embedded
		1. under negation.
		2. in a question.
		3. in the antecedent of a conditional.



## Resources

For information about the Switchboard corpus, look [here](http://groups.inf.ed.ac.uk/switchboard/index.html).

For information about the Penn Treebank (including POS and syntactic tagsets), look [here](http://citeseerx.ist.psu.edu/viewdoc/download?doi=10.1.1.9.8216&rep=rep1&type=pdf).

Access the TGrep2 manual [here](https://tedlab.mit.edu/~dr/Tgrep2/tgrep2.pdf).
























