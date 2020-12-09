"use strict";

function selector(selectedItem){
    return document.querySelector(selectedItem);
}

function getHeroClassesToSwitchToBuilder(){
    let classes = document.querySelectorAll('.heroClass');
    for(let i = 0; i < classes.length; i++){
        classes[i].addEventListener('click', switchToBuilder);
    }
}

function switchToBuilder(e){
    let heroClass = e.target.valueOf().title.toLowerCase();
    localStorage.setItem("hero", heroClass);

}

function checkToCatchTouch(){
    if(window.innerWidth <= 1030){
        catchTouch();
    }
}

function catchTouch() {
    let classes = document.querySelectorAll('.heroClass');
    for(let i = 0; i < classes.length; i++){
        classes[i].addEventListener('touchstart', heroClassGrowth);
    }
}

function heroClassGrowth(e){
    e.preventDefault();
    selector("#biggerVersionOfHero").innerHTML = this.innerHTML;
    if(window.innerWidth <= 1030){
        localStorage.setItem("hero", selector("#biggerVersionOfHero").innerText.toLowerCase());
    }
    selector("#biggerVersionOfHero").style.cssText = "border:double darkgoldenrod; background-color:black; padding:25px;";
    selector("#biggerVersionOfHero").innerHTML += "<button onclick='clearBigScreen()'>close</button>"
}

function init(){
    if(window.innerWidth > 1030){
        getHeroClassesToSwitchToBuilder();
    }
    checkToCatchTouch();



}

document.addEventListener("DOMContentLoaded", init());