function hideButton() {
    document.getElementById("buttons").style.display= "none";
    document.getElementById("start").style.visibility = "visible";
}

function hideOptions() {
    document.getElementById("options").style.display= "none";
}

function revealData(){
    document.getElementById("game-data").removeAttribute("hidden");
}