//defining the elements to use within the functions
let highscorespage = document.getElementById("highscores")
let clear = document.getElementById("clear")

// function to display the high scores from local storage
function displayhighscores(){
    let stringofhighs = localStorage.getItem("highscores")
    let listofhighs = JSON.parse(stringofhighs)
    console.log(listofhighs)
    for (i=0;i<listofhighs.length;i++){
        const ahighscoreinit = document.createElement("li")
        ahighscoreinit.textContent = listofhighs[i][0]+" - "+listofhighs[i][1]
        highscorespage.appendChild(ahighscoreinit)
}}

//function to clear the high scores from local storage which then reloads the page
function clearhighscores(){
    var highscores = []
    localStorage.setItem("highscores",JSON.stringify(highscores))
    location.reload()
}

//event listener for the clearing high scores button
clear.addEventListener("click",function(event){clearhighscores(event)})

//calling the function which displays the high scores
displayhighscores()