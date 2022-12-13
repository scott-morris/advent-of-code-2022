# 2022 Day 10
I should have known better. I was having trouble figuring out why my unit tests weren't passing while using the example data. I thought for a second that maybe I could run it anyways and see if there was a problem. As I said, I should have known better. There's something going on here that I don't quite know yet.

*later:* Ah, it was an index and timing issue. I knew it was going to be something trivial but hard to pin down.

Part 2 was a fun exercise and, mostly thanks to the issues in the first part, I pounced on the timing issue about checking the pixel value *before* processing the action issue.. of course I had it wrong at first.

### Thoughts / Stuff I've Learned:
* This was the first `class Something extends SomethingElse` I've done in Typescript and the linting and type checking did very well. I'm not surprised, but I am pleased.

### To Do Going Forward:
* I still haven't replaced that `/getinput.sh` file with a Typescript one. Maybe if I can catch up (or if I need a mental break), I'll revisit that one.
* I also still need to add the pre-commit hook to stop me from committing broken code.