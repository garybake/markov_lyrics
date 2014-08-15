# https://realpython.com/blog/python/lyricize-a-flask-app-to-create-lyrics-using-markov-chains/

from random import choice
import sys

def generateModel(text, order):
    model = {}
    for i in range(0, len(text) - order):
        fragment = text[i:i+order]
        next_letter = text[i+order]
        if fragment not in model:
            model[fragment] = {}
        if next_letter not in model[fragment]:
            model[fragment][next_letter] = 1
        else:
            model[fragment][next_letter] += 1
    return model

def getNextCharacter(model, fragment):
    letters = []
    for letter in model[fragment].keys():
        for times in range(0, model[fragment][letter]):
            letters.append(letter)
    return choice(letters)

def generateText(text, order, length):
    model = generateModel(text, order)
    currentFragment = text[0:order]
    output = ""
    for i in range(0, length-order):
        newCharacter = getNextCharacter(model, currentFragment)
        output += newCharacter
        currentFragment = currentFragment[1:] + newCharacter
    print output

text = "some sample text"
text = """
An old man turned ninety-eight
He won the lottery and died the next day
It's a black fly in your Chardonnay
It's a death row pardon two minutes too late
And isn't it ironic... don't you think

It's like rain on your wedding day
It's a free ride when you've already paid
It's the good advice that you just didn't take
Who would've thought... it figures

Mr. Play It Safe was afraid to fly
He packed his suitcase and kissed his kids goodbye
He waited his whole damn life to take that flight
And as the plane crashed down he thought
"Well isn't this nice..."
And isn't it ironic... don't you think

It's like rain on your wedding day
It's a free ride when you've already paid
It's the good advice that you just didn't take
Who would've thought... it figures

Well life has a funny way of sneaking up on you
When you think everything's okay and everything's going right
And life has a funny way of helping you out when
You think everything's gone wrong and everything blows up
In your face

A traffic jam when you're already late
A no-smoking sign on your cigarette break
It's like ten thousand spoons when all you need is a knife
It's meeting the man of my dreams
And then meeting his beautiful wife
And isn't it ironic...don't you think
A little too ironic...and, yeah, I really do think...

It's like rain on your wedding day
It's a free ride when you've already paid
It's the good advice that you just didn't take
Who would've thought... it figures

Life has a funny way of sneaking up on you
Life has a funny, funny way of helping you out
Helping you out

I recommend getting your heart trampled on to anyone
I recommend walking around naked in your living room
Swallow it down (what a jagged little pill)
It feels so good (swimming in your stomach)
Wait until the dust settles

You live you learn
You love you learn
You cry you learn
You lose you learn
You bleed you learn
You scream you learn

I recommend biting off more then you can chew to anyone
I certainly do
I recommend sticking your foot in your mouth at any time
Feel free
Throw it down (the caution blocks you from the wind)
Hold it up (to the rays)
You wait and see when the smoke clears

You live you learn
You love you learn
You cry you learn
You lose you learn
You bleed you learn
You scream you learn

Wear it out (the way a three-year-old would do)
Melt it down (you're gonna have to eventually anyway)
The fire trucks are coming up around the bend

You live you learn
You love you learn
You cry you learn
You lose you learn
You bleed you learn
You scream you learn

You grieve you learn
You choke you learn
You laugh you learn
You choose you learn
You pray you learn
You ask you learn
You live you learn
"""
# text = "For now, well generate sample text via the very scientific method of throwing a string directly into the code based on some copied & pasted Alanis Morisette lyrics."
if __name__ == "__main__":
    generateText(text, int(sys.argv[1]), int(sys.argv[2]))