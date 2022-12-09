# 2022 Day 8
Ok, this was the first one this year that I'm using a class. It's fun - I think if I were to do this again, I might extend the `Matrix` class and just put these other functions on it.

It bothers me in retrospect that some of the functions in `part2.ts` have the parameters in both the `(selectWhat, selectFrom)` and `(selectFrom, selectWhat)` orders, but I don't feel like going back and fixing it.. yet.

I think it was really TypeScript that saved me from making the mistake of calling them incorrectly so maybe I'll leave it in there after all as a reminder of the benefit.

### Thoughts / Stuff I've Learned:
* I went all out with TDD on this one. Returning a static value until I got to a use case that failed, etc.
* I don't know that I would do that all too often, but for rudimentary functions, it was kinda nice.

### To Do Going Forward:
* Fix the template to import the types by name.
* Add some copy-pasta to send to Mastodon
* Add a pre-commit hook to ensure that all unit tests pass