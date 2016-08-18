# TDTlite tutorial

Download the factives project into your home directory by cloning it from github:

```
$ git clone https://github.com/thegricean/esslli2016_corpuspragmatics.git
```

Navigate to the factives project and list the contents:
```
$ cd esslli2016_corpuspragmatics/factives
$ ls
MACROS.ptn options ptn
```
You should see that there are two files (MACROS.ptn and options) and one directory (ptn). To run a project, we'll need to add two more directories: one which will hold the data and one which will hold the resulting database. Go ahead and create these directories. Note: these directories **must** be called 'data' and 'results'.

```
$ mkdir data
$ mkdir results
```

MACROS.ptn contains macros that TDTlite will use automatically in running tgrep2 patterns. The ptn directory holds all the tgrep2 patterns that we want to run and combine into a database. See the [TDT manual](https://github.com/thegricean/TDTlite/blob/master/docs/tdt_manual.pdf) for specifications of what the different directory names mean.

To run all search patterns on the Switchboard, use run with the -e option. You have to specify which corpus to use with the -c option. On the virtual machine:
swbd "pretty" Switchboard
swbdext Switchboard with extended node labels (Nite IDs to extract prosodic information)
bncs	spoken BNC

```
run -c swbd -e
```

You should see that there are now .t2o files in the data/swbd directory -- these are the results of the tgrep2 searches. In order to combine all the results into one database:

```
run -c swbd -o
```

This will create a swbd.tab file in the results directory. All the variables that you specify in the options file will be included.

You can also run tgrep2 searches and build the database in one go:

```
run -c swbd -e -o
```

## Try it yourself

1. Modify the options file:
	1. Add the length of the complement in a new column.
	2. Add the frequency of the verb in a new column.