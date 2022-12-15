# 2022 Day 13
Man, with this one, my unit tests both helped me immensely AND got tremendously in my way. There are always some of these challenges (I'm convinced he does this on purpose) that I mostly understand the requirements on the first read-through, but are easy to misinterpret or make assumptions. Most of my unit tests were coming along nicely, but something wasn't working toward the end of the testing. There seemed to be two requirements that were working against each other. I couldn't get both cases to agree.

Then I re-read the instructions more closely. I had assumed that fewer elements meant lesser and totally glossed over that any non-equal values would result in an answer.

Then, in part 2, my tests did me dirty. Okay, so they didn't actually do me dirty. I did me dirty.. but then it also gave me the way to troubleshoot so I guess there's that. I had mistyped one of the functions so I was pulling in Part1 stuff instead of Part2, but of course that was going to break my unit tests. At least I knew that it was a problem there and didn't go rewriting the whole thing.

### Thoughts / Stuff I've Learned:
* Immutability is key. For lots of these array or object functions, you need to be super careful not to mutate your original object. In the real world case, it wouldn't have really mattered, but within the unit tests, you would start to see some REALLY weird stuff.

### To Do Going Forward:
* 