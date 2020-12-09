"use strict";


function alertInfo() {
    createAlert("Coming soon!", "info", 2000)
}

function alert() {
    createAlert("Stay tuned for ranked gatherings!", "warning", 4000)
}

function alertDanger() {
    createAlert("This feature will be available soon", "success", 2000)
}

function postToServer(url, data) {
    return new Promise((reject, resolve) => {
        fetch(url, {
            body: JSON.stringify(data),
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            }
        }).then((data) => resolve(data)).catch((err) => reject(err));
    })
}
function setPlayer(string) {
    let result = postToServer("http://localhost:4242/API/battlefield/setPlayerHero", JSON.stringify(string))
        .then(() => {
        }).catch((err) => console.log(err));
}

function setEnemy(string) {
    let result = postToServer("http://localhost:4242/API/battlefield/setEnemyHero", JSON.stringify(string))
        .then(() => {
        }).catch((err) => console.log(err));
}

document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("prem").addEventListener("click", alertInfo);
    document.getElementById("successor").addEventListener("click", alertInfo);
    document.querySelector(".col .frame .border").addEventListener("click", alert);
    document.querySelector(".load").addEventListener("click", alertDanger);
    document.querySelector(".set").addEventListener("click", alertDanger);
    document.getElementById("play").style.display = "none";

    document.getElementById("sendPlayer").addEventListener("click", function () {
        let dropDown = document.getElementById("classPlayer");
        let classPlayer = dropDown.options[dropDown.selectedIndex].innerText;
        setPlayer(classPlayer);
    });

    document.getElementById("sendEnemy").addEventListener("click", function () {
        let dropDown = document.getElementById("classEnemy");
        let classEnemy = dropDown.options[dropDown.selectedIndex].innerText;
        setEnemy(classEnemy);
        document.getElementById("play").style.display = "block";
    });

});
