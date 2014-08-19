$(function() {
/*
/ Converted from python code
/ https://realpython.com/blog/python/lyricize-a-flask-app-to-create-lyrics-using-markov-chains/
*/
    var generateModel = function(txt, order){
        model = {};
        for (i = 0; i < (txt.length - order); i++) {
            var fragment = txt.slice(i,i+order);
            var idx = i + order;
            var next_letter = txt.slice(idx, idx+1);
            if (!model.hasOwnProperty(fragment)){
                model[fragment] = {};
            }
            if (!model[fragment].hasOwnProperty(next_letter)){
                model[fragment][next_letter] = 1;
            } else {
                model[fragment][next_letter] += 1;
            }
        }
        return model;
    };

    var randomChoice = function(arr) {
        return arr[Math.floor(arr.length * Math.random())];
    };

    var getNextCharacter = function(model, fragment){
        var letters = [];
        for (var letter in model[fragment]) {
            if (model[fragment].hasOwnProperty(letter)) {
                for (var times=0; times <= model[fragment][letter]; times++){
                    letters.push(letter);
                }
            }
        }
        var ch = randomChoice(letters);
        return ch;
    };

    var generateText = function(text, order, length){
        var model = generateModel(text, order);
        // console.log(model);
        var currentFragment = text.slice(0, order);

        var output = "";
        for (var i=0; i < length-order; i++){
            var newCharacter = getNextCharacter(model, currentFragment);
            output = output + newCharacter;
            currentFragment = currentFragment.slice(1) + newCharacter;
        }
        return output;
    };

    var runGenerator = function(){
        if (!text.length){
           $.get('./data/alanis.txt', function (response) {
                text = response;
                var out = generateText(text, 5, 100);
                $('.txtMe').text(out);
                return out;
            }); 
        } else {
            return generateText(text, 5, 100);
        }
    };

    $("#generateBtn").click(function (e) {
        $('.txtMe').text(runGenerator());
    });

    var text = "";
    $('.txtMe').text(runGenerator());
});
