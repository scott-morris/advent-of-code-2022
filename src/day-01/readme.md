# 2022 Day 1

I started this repo a month ago, and I feel like it still wasn't quite enough time. I may have neglected it for too long, only coming back to it yesterday.

It's been an adventure trying to get these old helper functions from last year to work with strong typing. Perhaps it was a mistake to try to bring in these functions prematurely. I'll likely purge some of the remaining files down and only bring in things that I need once I need them.

> Don't try to solve problems that aren't problems yet. Focus on what is in front of you.

I'm glad that I didn't spend too much time working on the template just yet. I'm learning a lot about what feels good in TS by doing it with a loose scaffold that I'll incorporate into a stronger template as time goes on.

### Thoughts / Stuff I've Learned:
* There are a bunch of ways to declare types, interfaces, etc in TS. I'm not sure yet which I prefer.
* VSCode has a Deno test runner that can run tests and has a really nice interface. Unfortunately, it only works with the `Deno.test()` and not the bdd pattern that I prefer.
    * Is it worth it to change testing methods?
* There doesn't seem to be a good way to debug in deno while running tests. This was very useful last year to be able to run a JavaScript environment and put breakpoints into my functions in VSCode.
    * `console.log()` still works, but it's clunky.
    * To future readers, I apologize if I accidentally forget to take out any stray `console.log()` statements.

### To Do Going Forward:
* Make a `test.sh` script to accept a day and run just the deno tests for that day. There is a lot of noise that comes along when I run all of the tests, even if they run quickly.
* Make sure that the template updates the number on the data import. I got stuck thinking that there was a problem with the function when it was just that I forgot to change the `-1` to `1`.
* Consider replacing the bash scripts with deno executables.
    * Is that even feasible, given that they will be reading files, and deno requires file access as a flag?