//define the question and answers in arrays so that can be used with a for loop to append them to the HTML
let questionsarr = ["Commonly used data types do not include:","The condition in an IF/ELSE statement is enclosed within _","Arrays in javascript can be used to store _","String values must be enclosed within _ when being assigned to variables.","A very useful tool used during development and debugging for printing content to the debugger is"]
let answersarr = ["3. alerts","3. parentheses","4. all of the above","3. quotation marks","4. console log"]
let allanswersarr = [["strings","booleans","alerts","numbers"],["quotes","curly brackets","parentheses","square brackets"],["numbers and strings","other arrays","booleans","all of the above"],["commas","curly brackets","quotation marks","parentheses"],["javascript","terminal/bash","for loops","console log"]]

// define the elemenst to be used within the functions
let startscreen = document.getElementById("start-screen")
let questions = document.getElementById("questions")
let endscreen = document.getElementById("end-screen")
let questiontitle = document.getElementById("question-title")
let choices = document.getElementById("choices")
let finalscore = document.getElementById("final-score")
let highscorespage = document.getElementById("highscores")
let time = document.getElementById("time")
let start = document.getElementById("start")
let initials

//set the numbers and arrays
var numquestions = 0
var highscores = []

//initialisation function to show the start screen and make sure no questions are showing
function init(){
    var buttons = document.querySelectorAll(".button")
    if(buttons){for (var i = 0;i<buttons.length;i++){buttons[i].remove()}}
    start.addEventListener("click",function(event){firstquestion(event)})
    console.log(numquestions)
}

// function which provides the first question to answer and sets off the chain for new questions
function firstquestion(){
    startscreen.setAttribute("class","hide")
    questions.setAttribute("class","visible")
    secondsLeft = 100
    setTime()
    questiontitle.innerHTML = questionsarr[numquestions]
    for (i=0;i<4;i++){
        const button = document.createElement("button")
        button.setAttribute("class","button")
        button.setAttribute("id",i)
        button.textContent = (i+1)+". "+allanswersarr[numquestions][i]
        choices.appendChild(button)
    }
    numquestions++
    questions.addEventListener("click",function(event){newquestion(event)})
}

// function for a new question and the high score add page if the questions are over
function newquestion(event){
    event.stopPropagation()
    event.preventDefault()
    const isButton = event.target.nodeName === "BUTTON"
    if(!isButton){return}
    const answer = event.target.textContent
    if(answer!==answersarr[(numquestions-1)]){secondsLeft=secondsLeft-10}
        if(numquestions === 5 ){
            finalscore.textContent = secondsLeft
            questions.setAttribute("class","hide")
            endscreen.setAttribute("class","visible")
            time.textContent = secondsLeft
            document.getElementById("submit").onclick = function(){highscore()}
            return
        }else{        
            questiontitle.textContent = questionsarr[numquestions]
            for (i=0;i<4;i++){
            const button = document.getElementById(i)
            button.textContent = (i+1)+". "+allanswersarr[numquestions][i]
            }
        }
    numquestions++
    console.log(numquestions)
}

// a function to set the timer when the first question shows
function setTime(){
    var timerInterval = setInterval(function(){
        secondsLeft--
        time.textContent = secondsLeft
        if(secondsLeft === 0){
            clearInterval(timerInterval)
            questions.setAttribute("class","hide")
            endscreen.setAttribute("class","visible")
        }
        if(numquestions===5){
            clearInterval(timerInterval)
            return}
    },1000)
}

//functiopn to set highscores when they are submitted
function highscore(){
    const storedhighscores = JSON.parse(localStorage.getItem("highscores"))
    if(storedhighscores !== null){highscores=storedhighscores}
    const highscore = finalscore.textContent
    const initials = document.getElementById("initials").value
    const newhighscore = [initials,highscore]
    highscores.push(newhighscore)
    console.log(highscores)
    localStorage.setItem("highscores",JSON.stringify(highscores))
}

//calling the initialistaion function
init()