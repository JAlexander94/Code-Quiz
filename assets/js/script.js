//define the question and answers in arrays so that can be used with a for loop to append them to the HTML
let questionsarr = ["Commonly used data types do not include:","The condition in an IF/ELSE statement is enclosed within _","Arrays in javascript can be used to store _","String values must be enclosed within _ when being assigned to variables.","A very useful tool used during development and debugging for printing content to the debugger is"]
let answersarr = ["3. alerts","3. parentheses","4. all of the above","3. quotation marks","4. console log"]
let allanswersarr = [["strings","booleans","alerts","numbers"],["quotes","curly brackets","parentheses","square brackets"],["numbers and strings","other arrays","booleans","all of the above"],["commas","curly brackets","quotation marks","parentheses"],["javascript","terminal/bash","for loops","console log"]]

let startscreen = document.getElementById("start-screen")
let questions = document.getElementById("questions")
let endscreen = document.getElementById("end-screen")
let questiontitle = document.getElementById("question-title")
let choices = document.getElementById("choices")
let finalscore = document.getElementById("final-score")
let highscorespage= document.getElementById("high-scores")
let time = document.getElementById("time")
let initials

var numquestions = 0
var highscores = []

function init(){
    startscreen.setAttribute("class","start")
    questions.setAttribute("class","hide")
    endscreen.setAttribute("class","hide")
    time.textContent = 0
    numquestions = 0
    var buttons = document.querySelectorAll(".button")
    if(buttons){for (var i = 0;i<buttons.length;i++){buttons[i].remove()}}
    console.log(numquestions)
}


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

function displayhighscores(){
    let stringofhighs = localStorage.getItem("highscores")
    let listofhighs = JSON.parse(stringofhighs)
    console.log(listofhighs)
    for (i=0;i<listofhighs.length;i++){
        const ahighscoreinit = document.createElement("li")
        const ahighscore = document.createElement("li")
        ahighscoreinit.textContent = listofhighs[i][0]
        ahighscore.textContent = listofhighs[i][1]
        highscorespage.appendChild(ahighscoreinit)
        highscorespage.appendChild(ahighscore)
}}

document.getElementById("start").onclick = function(){firstquestion()}

document.getElementById("submit").onclick = function(){highscore()}
