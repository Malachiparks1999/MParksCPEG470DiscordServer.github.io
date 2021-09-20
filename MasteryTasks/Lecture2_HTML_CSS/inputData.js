/*
Tasks: Write a website that asks someone their name, favorite color, and birthday. 
Change the background of the web page to match their favorite color and display their birthday and name. 
Try this with several types of events (blur, change, or clicking a button)
*/

function changeBGColor(){
    let color = document.getElementById("favColor").value;
    document.body.style.backgroundColor = color;
}

function displayName(){
    let name = document.getElementById("name").value;
    document.querySelector("#userName").innerHTML = "Hello " + name;
}

function displayBday(){
    let birthday = document.getElementById("bday").value;
    document.querySelector("#userBday").innerHTML = "DOB:" + birthday;
}

function clickHandler(){
    changeBGColor();
    displayBday();
    displayName();
}

// click listner to change color
document.querySelector("#submitButton").addEventListener("click", clickHandler);
