# 2022 Day 9
I just knew there was going to be a 2-Dimensional walking challenge at some point. I had a `Matrix` class last year and brought most of it over, but I think it's better that I rewrote the concept of the "walker". 

It took a while to figure out why part 2 was having so much trouble. The logic seemed to be correct but things just weren't cascading the way they were supposed to. I had originally kept the logic simple and kept movement to the four cardinal directions (`UP`,`DOWN`,`LEFT`,`RIGHT`).. so if a knot needed to move diagonally, it would just check separately whether it needed to move vertically and horizontally.

The problem was that it was calling the callback function twice in those cases, and it caused certain movements to happen, especially when cascading down the rope.

### Thoughts / Stuff I've Learned:
* I really wanted to use a custom type for the direction in the instructions to be `U | D | L | R`, but couldn't get the linter to accept that my strings weren't going to be outside of that. I'll have to do more reading on it.

### To Do Going Forward:
* I like the state machines and I'll probably play around with them some more.