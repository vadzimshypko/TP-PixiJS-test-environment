## Description

**Layout**

Slot consists of 5 columns of symbols and a spin button. Falling symbols should be cut by a mask on top
and bottom.

**Flow**

1. Spin button click initiates symbols fall from the top of the screen, spin button disables;
2. Symbols fall from the top of the screen row by row with a small delay in landing (in a row and
   between rows);
3. When all symbols landed start button enables;
4. Spin button click initiates a new fall, previously displayed symbols on the screen should fall and
   disappear and everything starts with p.1 in a loop.

**Extra tasks for additional points**

1. Random symbols should drop down each spin;
2. Add sounds: Start_Button.mp3 for spin button click, Reel_Stop_{n}.mp3 for each symbol when it
   stops falling. (use Howler (https://github.com/goldfire/howler.js));
3. Spin Button should have label “Spin” on it and 4 states: normal, hover, pressed, disabled;
4. Anything else which will show your skills.

## Get Started

Use the following command to run the application: `gulp serve`
