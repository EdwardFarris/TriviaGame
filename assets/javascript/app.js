
var questions = [{
    ques: "What is the name of Jon Snow's direwolf?",
    ans: ["Spirit", "Goul", "Ghost", "Goblin"],
    name: "direwolf",
    correct: "Ghost",
    divClass: ".direwolf"
},
{
    ques: "What is animal is represented on the Lannister House Sygil?",
    ans: ["A Stag", "An Owl", "A Fish", "A Lion"],
    name: "sigil",
    correct: "A Lion",
    divClass: ".sigil"
},
{
    ques: "How many children do Ned and Catelyn Stark actually have by blood?",
    ans: ["Five", "Four", "Three", "Two"],
    name: "children",
    correct: "Five",
    divClass: ".children"
},
{
    ques: "What island is Sir Jorah Mormont originally from?",
    ans: ["Squirrel Island", "Bear Island", "Iron Island", "Saphire Island"],
    name: "jorah",
    correct: "Bear Island",
    divClass: ".jorah"
},
{
    ques: "Riverrun is home to which house?",
    ans: ["Stark", "Lannister", "Targaryn", "Tully"],
    name: "home",
    correct: "Tully",
    divClass: ".home"
},
{
    ques: "Joffrey Baratheon is actually the son of which two people?",
    ans: ["Robert and Cersei", "Jaime and Cersei", "Robert and Lyanna", "Jamie and Brienne"],
    name: "son",
    correct: "Jaime and Cersei",
    divClass: ".son"
},
{
    ques: "Jon Snow originally ventures north of the wall to try and find?",
    ans: ["His parents", "His uncle", "His direwolf", "His horse"],
    name: "snow",
    correct: "His uncle",
    divClass: ".snow"
},
{
    ques: "Daenerys Targaryn is also known as this",
    ans: ["Mother of Dragons", "The Unburnt", "Breaker of Chains", "All of these"],
    name: "dany",
    correct: "All of these",
    divClass: ".dany"
},
{
    ques: "what is the name of the sword that commander Mormont gives to Jon Snow?",
    ans: ["Heartsbane", "Longclaw", "Oathkeeper", "Needle"],
    name: "sword",
    correct: "Longclaw",
    divClass: ".sword"
},
{
    ques: "The correct motto of house Stark is?",
    ans: ["Ours is the Fury", "Family, Duty, Honor", "Winter is Coming", "Unbowed, Unbent, Unbroken"],
    name: "motto",
    correct: "Winter is Coming",
    divClass: ".motto"
}
] //end of questions object

//labels for answers
var labels = ["first", "second", "third", "fourth"];

//click button to start and display questions

var startGame = $("#startButton").on('click', function() {
    $('#introScreen').hide();
    $('.questionBox').show();
    countdown(100);
    questionDisplay();
});

//function to display questions

var questionDisplay = function() {
    $(".questions :not('#submitButton')").empty();

    //loops through the 12 questions
    for (var j = 0; j < 10; j++) {
        $('.questions').prepend('<div class ="' + questions[j].name + '"></div>');
        $(questions[j].divClass).append('<div class="ques-title">' + questions[j].ques + '</div>');

    //looping through answers for each radio button
        for (var i = 0; i <= 3; i++) {
            $(questions[j].divClass).append('<br><input type="radio" name="' + questions[j].name + '" value="' + questions[j].ans[i] + '"/><label for="' + labels[i] + '">' + questions[j].ans[i] + '</label');
        }
        $('.questions').prepend('<hr />');
    }
}

//function for countdown timer
var countdown = function(seconds) {
    
    var timer = setInterval(function() {
        seconds = seconds - 1;
        $("#time-remain").html(seconds);

        if (seconds <= 0) {
            $('.questionBox').fadeOut(500);
            var correctAnswers = 0;
            var incorrectAnswers = 0;
            var unAnswered = 0;

            //loop through correct array and radio button name to match html elements and answers
            for (var i = 0; i < 10; i++) {
                if ($('input:radio[name="' + questions[i].name + '"]:checked').val() === questions[i].correct) {

                    correctAnswers++;
                    console.log("this is correct! number:" + i)
                 
            } else if (!$('input:radio[name="' + questions[i].name + '"]:checked').val()) {
                unAnswered++;
            } else {
                incorrectAnswers++;
            };
        };
                
            //display correct answers
            $('#correctUp').append(correctAnswers);
            
            //display incorrect answers
            $('#incorrectUp').append(incorrectAnswers);
            
            
            
            //dsiplay that time is up
            $('#timeUp').fadeIn(1000).show();
            clearInterval(timer);
            return;
        }
    }, 1000);

    //stop timer when submit button is clicked
    $('#submitButton').on('click', function() {
        clearInterval(timer);
    })
}; // end of countdown

//function for grading quiz once submit button is clicked
var quizGrade = $('#submitButton').on('click', function() {
    
    var correctAnswers = 0;
    var incorrectAnswers = 0;
    var unAnswered = 0;
    
//loops through correct array and button names to match html element and answers
for (var i = 0; i < 10; i++) {
    if ($('input:radio[name="' + questions[i].name + '"]:checked').val() === questions[i].correct) {

        correctAnswers++;
        
    } else if (!$('input:radio[name="' + questions[i].name + '"]:checked').val()) {
        unAnswered++;
    } else {
        incorrectAnswers++;
    };
};

//once submit button is clicked, the following needs to happen...

//stop timer
    countdown();

//fade out questions
    $('.questionBox').fadeOut(500);

//show progress screen
    $('#progressScreen').show();

//display correct answers
    $('#correct').append(correctAnswers);

//display incorrect answers
    $('#incorrect').append(incorrectAnswers);

//dsiplay unanswered questions
    $('#unanswered').append(unAnswered);

}); //end of quizGrade function

