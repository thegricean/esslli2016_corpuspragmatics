This 5-day course is part of [ESSLLI 2016](http://esslli2016.unibz.it/). It aims to introduce students to the use of corpora of naturally occurring language for research in semantics/pragmatics.

In order to make the course as useful as possible to the greatest number of participants, **please fill out [this survey](https://docs.google.com/forms/d/e/1FAIpQLSeEFAbBObNEkY4VoCX4Vbj4D-6NwhCMXoyN3GnVhe6Jv4srtg/viewform) by August 12**!

The course will have a hands-on component in order to provide participants with the opportunity to get their hands dirty with actual data and tools for handling that data. To minimize the amount of software you will need to install on your own laptops, the kind tech support team is providing access to a virtual machine pre-configured with all the necessary software. In order to access the virtual machine, you will only need to install VMWare Horizon (available for most operating systems). If you want to take advantage of this part of the course (recommended!), please follow the [installation instructions](https://wiki.inf.unibz.it/public/vdi_labs#your_pcmacandriodioslinux_device) and bring your laptop to class. You will receive your login credentials upon registration. **If you save files on the virtual machine, make sure to save them into your home directory -- everything not saved in the home directory will be deleted when you log out!**

# Lecturer

[Judith Degen](https://sites.google.com/site/judithdegen/) -- *jdegen@stanford.edu*

# Course description

Traditionally, the primary source of data in pragmatics has been researchers’ intuitions about utterance meanings. However, the small numbers of introspective judgments about examples, hand-selected by researchers who themselves provide these judgments, introduces bias into the  phenomena under investigation.  The recently emerging use of experimental methods for probing linguistically untrained  language users’ interpretations has ameliorated the bias introduced by small numbers of judgments. It cannot, however, remove item bias: researchers  artificially construct the stimuli used in experiments. Fortunately, studying corpora of naturally occurring language can reduce item bias. Corpora provide naturally occurring utterances that can be used in tandem with platforms like Mechanical Turk to provide large-scale crowd-sourced interpretations of these utterances, thereby allowing for constructing large databases of different types of meanings (e.g., implicatures) in context. 

In order to not only introduce course participants to the use of corpora of naturally occurring language for research in semantics/pragmatics but also equip you with practical skills for conducting your own research in this area, the course will contain a substantial hands-on component. We will use tools for searching syntactically parsed corpora ([tgrep2](https://tedlab.mit.edu/~dr/Tgrep2/), [TDTlite](https://github.com/thegricean/TDTlite/)) as well as tools for analyzing and visualizing data ([R](https://www.r-project.org/), in particular the [lme4](https://cran.r-project.org/web/packages/lme4/lme4.pdf) and [ggplot2](http://ggplot2.org/) packages). 

# Prerequisites

The course has no official prerequisites. However, the more programming experience you have, the easier it will be to follow along. Remember to fill out [the survey](https://docs.google.com/forms/d/e/1FAIpQLSeEFAbBObNEkY4VoCX4Vbj4D-6NwhCMXoyN3GnVhe6Jv4srtg/viewform) to increase the probability of the course pace aligning with your needs.
We will be making heavy use of the UNIX terminal for navigating directories and running the corpus search tools. Knowing how to use an editor from the terminal will be important. (I'll be using vim but I won't get in the way of anyone looking to use emacs or something even more outlandish). We'll use R and ggplot later in the course.

If you would like to get caught up on the basics of using these tools, I recommend the following tutorials (in order of priority):

1. [UNIX tutorial for beginners](http://www.ee.surrey.ac.uk/Teaching/Unix/) -- complete at least the first three tutorials
2. [Ryan's vi tutorial](http://ryanstutorials.net/linuxtutorial/vi.php) and a [cheat sheet](http://www.lagmonster.org/docs/vi.html) of useful vi commands
3. [datacamp](https://www.datacamp.com/) for learning R

# Preliminary syllabus

When        | What               | Reading(s) / resources | Slides
---------- | ------------------ | ---------------------- | -------
Monday     | Introduction: utility of corpora for research in semantics/pragmatics; a practical example: variation in scalar implicature strength| [de Marneffe & Potts 2014](http://web.stanford.edu/~cgpotts/papers/demarneffe-potts-lingann.pdf); [Degen 2015](http://semprag.org/article/view/sp.8.11) | [pdf](https://github.com/thegricean/esslli2016_corpuspragmatics/blob/master/slides/day1_corpora.pdf)
Tuesday | TGrep2 tutorial: search corpora for syntactic patterns based on regular expressions | [TGrep2 User Manual](https://tedlab.mit.edu/~dr/Tgrep2/tgrep2.pdf) |
Wednesday | Hands-on project intro (projection behavior of (non-/semi-)factive verbs); develop patterns for extracting factive verbs | [Beaver 2010](https://www.researchgate.net/publication/2840852_Have_you_noticed_that_your_Belly_Button_Lint_colour_is_related_to_the_colour_of_your_clothing); [Simons et al, to appear](http://www.cmu.edu/dietrich/philosophy/docs/simons/BestQuestion-Resubmission-FormattedForPosting-6-8-15.pdf) |
Thursday | TDTlite tutorial: building an annotated database of corpus search results; brainstorming crowd-sourced judgments | [TDTlite User Manual](https://github.com/thegricean/TDTlite/blob/master/docs/tdt_manual.pdf); [Gibson et al 2011](https://github.com/thegricean/esslli2016_corpuspragmatics/blob/master/readings/gibson2011.pdf); [Tonhauser 2016](https://github.com/thegricean/esslli2016_corpuspragmatics/blob/master/readings/tonhauser-salt26.pdf)|
Friday | Analyzing/visualizing corpus data and data from mini-experiment; discussion of results; reflection | |

# Resources

- [TGrep2](https://tedlab.mit.edu/~dr/Tgrep2/) and the [TGrep2 User Manual](https://tedlab.mit.edu/~dr/Tgrep2/tgrep2.pdf)
- [TDTlite](https://github.com/thegricean/TDTlite) on GitHub
- [TDTlite User Manual](https://github.com/thegricean/TDTlite/blob/master/docs/tdt_manual.pdf)
- The [IMS Open Corpus Workbench](http://cwb.sourceforge.net/)
- [Linguistic Data Consortium](https://www.ldc.upenn.edu/language-resources/data)

# Further readings

Beaver, D. 2010. [Have you Noticed that your Belly Button Lint Colour is Related to the Colour of your Clothing?](https://www.researchgate.net/publication/2840852_Have_you_noticed_that_your_Belly_Button_Lint_colour_is_related_to_the_colour_of_your_clothing) In R. Bauerle, U. Reyle, and T. E. Zimmermann (eds.), Presuppositions and Discourse: Essays offered to Hans Kamp, Elsevier, Oxford. (pp. 65–99).

Degen, J. 2015. [Investigating the distribution of some (but not all) implicatures using corpora and web-based methods](http://semprag.org/article/view/sp.8.11). Semantics and Pragmatics, 8 (11), pp. 1-55.

de Marneffe, M.-C., Manning, C., and Potts, C. 2012. [Did it happen? The pragmatic complexity of veridicality assessment](http://aclweb.org/anthology/J/J12/J12-2003.pdf). Computational Linguistics 38(2): 301-333.

de Marneffe, M.-C. and Potts, C. 2014. [Developing linguistic theories using annotated corpora](http://web.stanford.edu/~cgpotts/papers/demarneffe-potts-lingann.pdf). To appear in Nancy Ide and James Pustejovsky, eds., The Handbook of Linguistic Annotation. Berlin: Springer.

Gibson, E., Piantadosi, S. & Fedorenko, K. 2011. [Using Mechanichal Turk to obtain and analyze English acceptability judgments](https://github.com/thegricean/esslli2016_corpuspragmatics/blob/master/readings/gibson2011.pdf). Language and Linguistics Compass, 5(8): 509-524.

Stefan Gries's book [Quantitative Corpus Linguistics with R](https://www.routledge.com/Quantitative-Corpus-Linguistics-with-R-A-Practical-Introduction-2nd-Edition/Gries/p/book/9781138816275)

Potts, C. 2012. [Goal-driven answers in the Cards dialogue corpus](http://www.lingref.com/cpp/wccfl/30/abstract2800.html). In Nathan Arnett and Ryan Bennett, eds., Proceedings of the 30th West Coast Conference on Formal Linguistics, 1-20. Somerville, MA: Cascadilla Press. 

Simons, M., Beaver, D., Roberts, C., and Tonhauser, J. to appear. [The Best Question: Explaining the projection behavior of factive verbs](http://www.cmu.edu/dietrich/philosophy/docs/simons/BestQuestion-Resubmission-FormattedForPosting-6-8-15.pdf). Discourse Processes.

Tonhauser, J., Beaver, D., Roberts, C., and Simons, M. 2013. [Toward a taxonomy of projective content](http://www.ling.ohio-state.edu/~judith/Tonhauser-etal.pdf). Language 89(1): 66-109.