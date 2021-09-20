function changeBGColor(){
    let color = document.getElementById("favColor").value;
    document.body.style.backgroundColor = color;
}

document.querySelector("#submitButton").addEventListener("click", changeBGColor);