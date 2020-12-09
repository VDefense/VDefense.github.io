"use strict";

function clearBigScreen(){
    document.querySelector("#biggerVersionOfHero").innerHTML = '';
    document.querySelector("#biggerVersionOfHero").style.cssText = "border:none; background-color:none; padding:0;";
}

function showOrHideVideo(){
    if(window.innerWidth <= 1030){
        selector("#myVideo").style.display = "none";
    }else{
        selector("#myVideo").style.display = "relative";
    }
}

function init(){
    showOrHideVideo();
}

document.addEventListener('DOMContentLoaded',init());
