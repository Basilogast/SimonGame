var gamePattern = [];
var userClickedPattern = [];
var buttonColors = ["red", "blue", "green", "yellow"];
var randomNumber;
var started = false;
var level = 0;
function random03() {
    var result = Math.floor(Math.random()*4);
    return result;
}

var randomChosenColor;
function nextSequence() {
    userClickedPattern = [];
    level = level + 1;
    $("h1").text("Level " + level);
    randomNumber = random03();
    randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    $("#" + randomChosenColor).fadeOut(100);
    $("#" + randomChosenColor).fadeIn(100);
    playSound(randomChosenColor);
}
$(document).keydown(function(event){
    if(!started)
    {
        nextSequence();
        started = true;
    }
});

function pressAnimate(currentColor){
    $("#" + currentColor).addClass("pressed");
    setTimeout(function(){
        $("#" + currentColor).removeClass("pressed");
    },100);
}

function checkAnswer(currentLevel){
    console.log(userClickedPattern[currentLevel]);
    console.log(gamePattern[currentLevel]);
    if(userClickedPattern[currentLevel] === gamePattern[currentLevel])
    {
        if(userClickedPattern.length === gamePattern.length)
        {
            setTimeout(function(){
                nextSequence();
            },1000);
        }
    }
    else
    {
        playSound("wrong");
        $("body").addClass("game-over");
        $("h1").text("Game Over, Press Any Key to Restart");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);
        startOver();
    }
}

function playSound(name){
    var audio = new Audio ("sounds/" + name + ".mp3");
    audio.play();
}

function startOver(){
    started = false;
    level = 0;
}

$(".btn").click(function(){
    var userChosenColor = this.id;
    playSound(userChosenColor);
    userClickedPattern.push(userChosenColor);
    pressAnimate(userChosenColor);
    checkAnswer(userClickedPattern.length - 1);
});