---
title: "Bot Emmett Brown"
categories:
  - Bots
tags:
  - bot twitter back to the future bttf dr emmet brown
last_modified_at: 2017-12-09T21:33:37-04:00
---
{% twitter https://twitter.com/BotEmmettBrown/status/938891636632846336 %}

Bot Emmett Brown is a very smart bot, he inveted time traveling back in 1955 through a small device calle the Flux Capacitor. He is also a good conversation and enjoys to print it's thoughts in his official Twitter account.

In brief, is a bot that generates text according to the Doc's dialogues in the 3 Back to the Future movies.

### Let's discuss how we can reproduce this if you ever feel like building your own.
We won't be doing real coding here, but you can follow the [repo](http://github.com/ollin18/Bot_Emmett_Brown).
The first thing we have to do is to download the scripts which are available at [The Daily Script](http://www.dailyscript.com)
```
wget http://www.dailyscript.com/scripts/bttf4th.pdf
```

Later we have to convert this files into a readable format i.e. plain text. There are several tools that allow you to do that, the one I used is a Python one called ```pdf2text```.

Now with plain text we can use our weapon of choice to clean the screen play and keep only Doc Emmett Brown's dialogues. For example, I really like ```sed``` because it is like using ```vim``` right in the tty. So, for example we need to keep those lines that starts with *Doc:* but also the subsequent ones that aren't from another character (multiline dialogues), then delete the string "Doc:" and line breaks '\n'.
```
sed -n /^Doc:/,/^$/p 1_screen_play.txt | sed s/Doc:'\s'//g | sed '/^\s*$/d' | tr '\n' ' ' > 1_Doc.txt
```
Then we paste all the 3 movies together with ```cat``` and we're ready to train our model.

This bot was trained with a type of neural network called Long Short Term Memory (LSTM) wich is very well explained in [this blog](http://colah.github.io/posts/2015-08-Understanding-LSTMs/), what is special about these networks is that they take into account the past and not only the current state like a Markov Chain would. That property gives us the oportunity to generate text using previous words (or even characters like [this post](https://machinelearningmastery.com/text-generation-lstm-recurrent-neural-networks-python-keras/) does). I for example trained the model using chains of 5 words, so when the bot is generating a new tweet it adds a word by the likelihood of that one being preceded by the previous 5.

The model was scriped in Python using Keras with Tensorflow as the kernel, I have a CUDA installation in my computer which I recommend if you are planning to train your own model since it amazingly reduces the time taken.

{% twitter https://twitter.com/BotEmmettBrown/status/939258300511735808 %}

**Docker** is by far one of my favorite tools because it shortlist the dependencies to one if your want to share your code or running it on different computers and as the main porpose of this bot is to be a Twitter bot it has to be hosted in a computer that is on all of the time and since obviously it is not going to be my PC, using Docker makes the code transition far smoother. Bot Emmett Brown is currently living in a Google Cloud Platform VM.

A crontab job and a multiplexor like Screen, Tmux or Byobu is fundamental because we want to run the script(s) every certain time (randomly between 8am and 11pm like a regular human) and forget about everything but to read the amusing quotes that comes up to it.

[Here's the code!](http://github.com/ollin18/Bot_Emmett_Brown)

{% twitter https://twitter.com/BotEmmettBrown maxwidth=500 limit=5 %}
