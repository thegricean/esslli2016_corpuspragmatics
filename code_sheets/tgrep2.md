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

## Basic TGrep2 queries