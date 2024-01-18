# Debugging exercise

Clone the repository `git@github.com:cs-uob/COMS10012` if you have not done so
already and open the folder `code/debugging`.

There is a program `stackcalc.c` that attempts to implement the specification
in `stackcalc.txt` for a Reverse Polish Notation calculator, but it does not
work correctly. For example, `1 2 +` should produce `3.0000` but produces
`Error, operator on empty stack`. 

Your exercise is to debug and fix the program, making as few changes to the
general structure as possible (so don't just rewrite the whole thing from
scratch).

If I were you I'd start by writing a Makefile, getting the code building, and
fixing the compiler warnings…
