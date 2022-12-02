# 2022 Day 2
I'm still spending more time sorting out my Typescript types than the solution itself. I know that it will pay off in some of the later, more complicated scenarios, but it's frustrating now to intentionally slow down and get those nitpicks figured out.

After all, that's one of the main reasons that I wanted to do this in TypeScript this year. I need to get the "muscle memory" and experience that comes with actually using typed JavaScript.

### Thoughts / Stuff I've Learned:
* This is the first attempt at using the TypeScript generator. There are still a few kinks to work out, but I think it fell solidly in the 80/20 rule.
* When I first thought about this problem, I was thinking about how to programmatically decide winners and losers based on the choice, but the more I thought about it, the more I realized that we were looking at an extremely small set of options. That's why I went for a key-lookup pattern more than an algorithm. If it were much larger, I probably would have gone the other way but in retrospect, it made part2 really straightforward.

### To Do Going Forward:
* Fix the templates (clean out the unit test, ensure we're loading the right file)
* Replace the `getinput.sh` with a typescript solution
* Do I replace the `run.sh` and `test.sh` or does it make sense to keep them as bash scripts? Is it overkill to replace them with Typescript?