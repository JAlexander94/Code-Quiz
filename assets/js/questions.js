//define the question and answers in arrays so that can be used with a for loop to append them to the HTML
let questionsarr = ["Commonly used data types do not include:","The condition in an IF/ELSE statement is enclosed within _","Arrays in javascript can be used to store _","String values must be enclosed within _ when being assigned to variables.","A very useful tool used during development and debugging for printing content to the debugger is"]
let answersarr = ["alerts","parentheses","all of the above","quotation marks","console log"]
let allanswersarr = [["strings","booleans","alerts","numbers"],["quotes","curly brackets","parentheses","square brackets"],["numbers and strings","other arrays","booleans","all of the above"],["commas","curly brackets","quotation marks","parentheses"],["javascript","terminal/bash","for loops","console log"]]

let startscreen = document.getElementById("start-screen")
let questions = document.getElementById("questions")
let endscreen = document.getElementById("end-screen")
let questiontitle = document.getElementById("question-title")
let choices = document.getElementById("choices")
let finalscore = document.getElementById("final-score")
let time = document.getElementById("time")

var numquestions = 0

function firstquestion(){
    startscreen.setAttribute("class","hide")
    questions.setAttribute("class","visible")
    secondsLeft = 100
    setTime()
    questiontitle.innerHTML = questionsarr[numquestions]
    const questionsshell = document.createElement("ol")
    for (i=0;i<4;i++){
        const button = document.createElement("button")
        button.setAttribute("id",i)
        button.textContent = (i+1)+". "+allanswersarr[numquestions][i]
        questionsshell.appendChild(button)
    }
    choices.appendChild(questionsshell)
    numquestions++
    questions.addEventListener("click",function(event){
        const isButton = event.target.nodeName === "BUTTON"
        if(!isButton){return}
        const answer = event.target.textContent
        if(answer!==answersarr[(numquestions-1)]){secondsLeft=secondsLeft-10}
            if(numquestions === 5 ){
                finalscore.textContent = secondsLeft
                questions.setAttribute("class","hide")
                endscreen.setAttribute("class","visible")
            }else{        
                questiontitle.textContent = questionsarr[numquestions]
                for (i=0;i<4;i++){
                const button = document.getElementById(i)
                button.textContent = (i+1)+". "+allanswersarr[numquestions][i]
                }
            }
        numquestions++
})
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
    },1000)
}

document.getElementById("start").onclick = function(){firstquestion()}
