$(function() {
/*
/ Converted from python code
/ https://realpython.com/blog/python/lyricize-a-flask-app-to-create-lyrics-using-markov-chains/
*/
    function generateModel(txt, order){
        model = {};
        txt = txt.toLowerCase();
        txtArray = txt.replace(".", " .").match(/\S+/g);
        for (i = 0; i < (txtArray.length - order); i++) {
            var fragment = txtArray.slice(i,i+order);
            var idx = i + order;
            var next_word = txtArray.slice(idx, idx+1);
            if (!model.hasOwnProperty(fragment)){
                model[fragment] = {};
            }
            if (!model[fragment].hasOwnProperty(next_word)){
                model[fragment][next_word] = 1;
            } else {
                model[fragment][next_word] += 1;
            }
        }
        return model;
    }

    function randomChoice(arr) {
        return arr[Math.floor(arr.length * Math.random())];
    }

    function getNextWord(model, fragment){
        var words = [];
        for (var word in model[fragment]) {
            if (model[fragment].hasOwnProperty(word)) {
                for (var times=0; times <= model[fragment][word]; times++){
                    words.push(word);
                }
            }
        }
        var ch = randomChoice(words);
        return ch;
    }

    function generateText(text, order, length){
        var model = generateModel(text, order);
        // console.log(model);
        var currentFragment = text.slice(0, order);

        var output = [];
        for (var i=0; i < length-order; i++){
            var newWord = getNextWord(model, currentFragment);
            output.push(newWord);
            currentFragment = newWord;
        }
        return output.join(" ").replace(/\./g, '.<br />');
    }

    function runGenerator(){
        if (!text.length){
           $.get('./resources/data/alanis.txt', function (response) {
                text = response;
                text = text.toLowerCase();
                var wrds = generateText(text, 1, 40);
                $('.txtMe').html(wrds);
                // console.log(wrds);
                return(wrds);
            }); 
        } else {
            var wrds = generateText(text, 1, 40);
            return(wrds);
        }
    }

    $("#generateBtn").click(function (e) {
        $('.txtMe').html(runGenerator());
    });

    var text = "";
    runGenerator();
});
