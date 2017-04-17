# Cossacks 3 Shadow Mod

Cossacks3 uses a very simple technique to accomplish soft shadows.
The biggest problem is the horrible banding effect it produces.

This Mod changes the shadows to use Poisson sampling instead of a simple regular pattern.
The results are better soft shadows with the same performance.

The Mod changes only one file and enables to easily change the softness of the shadows.
In the file there is a variable *spread* which controls the softness.
The higher the value of spread is the harder the shadows get.
You can change it to whatever you like. 
A value of 350 gets you very similar shadows to the original but without the banding effect.

I have also included HardShadows which should give a slight performance boost.

![alt tag](https://raw.githubusercontent.com/Ochrazy/Cossacks-3-Shadow-Mod/master/BetterShadows/LineComparison.png)

## Installation: 
1) Choose one Shadow type (SoftShadows1000, SoftShadows512, SoftShadows350, HardShadows, Original)
2) Extract data folder from that folder to the root directory of the game
3) Agree to replace the file
4) Start Cossacks3 and set Shader Quality to high!
5) (If you want to switch the Shadow type you have to restart Cossacks3)
