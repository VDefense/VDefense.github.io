"use strict";

function getValueOfCardType(){
    let cardType = selector('#cardType').value;
    if(cardType === "minion"){
        selector('#minionAbility').style.display = "block";
        if(window.innerWidth <= 1030) {
            selector('input#submit').style.marginLeft = "5%";
        }else{
            selector('input#submit').style.marginLeft = "35%";
        }
    }else{
        selector('input#submit').style.marginLeft = "5%";
        selector('#minionAbility').style.display = "none";
        selector('nav label').style.top = '11%';
    }
}

function selector(selectedItem){
    return document.querySelector(selectedItem);
}

function start(){
    showActualCardsInDeck();
    selector(".next").style.display = "none";
    selector(".previous").style.display = "none";
}

let arraytje = ['#showCards', '#showCardsToPutInDeck', '#deckBuilder', '#showDeckBuilder'];
let arraytje2 = [];


function showActualCardsInDeck(){
    arraytje2 = ["display:none;","background-color: #E6B34B; color: black; border-color: black", "display:block;", "background-color: black; color: #E6B34B; border-color: #E6B34B"];
    selector(".next").style.display = "none";
    selector(".previous").style.display = "none";
    for(let i = 0; i < arraytje.length; i++){
        selector(arraytje[i]).setAttribute("style", arraytje2[i]);
    }
}

function showCardsLibrary() {
    arraytje2 = ["display:block;", "background-color: black; color: #E6B34B; border-color: #E6B34B", "display:none;", "background-color: #E6B34B; color: black; border-color: black"];
    selector(".next").style.display = "block";
    selector(".previous").style.display = "block";
    for(let i = 0; i< arraytje.length; i++){
        selector(arraytje[i]).setAttribute("style", arraytje2[i]);
    }
}

let next = 0;
let amountOfUls = 0;

function nextPage(){
    if(next >= amountOfUls -1) {
        next = -1;
    }
    next += 1;
    showHideUls(next)
}

function previousPage(){
    if(next <= 0){
        next = amountOfUls;
    }
    next-=1;
    showHideUls(next)
}

function showHideUls(next) {
    let allUlsInShowCards = document.querySelectorAll("#showCards ul");
    amountOfUls = allUlsInShowCards.length;
    for(let i = 0; i < allUlsInShowCards.length; i++){
        allUlsInShowCards[i].style.display = "none"
    }
    if(allUlsInShowCards[next] !== undefined){
        allUlsInShowCards[next].style.display = "inline-flex"
    }else{
        if(allUlsInShowCards !== null){
            allUlsInShowCards[0].style.display = "inline-flex";
        }
    }

}

function triggerCardField(){
    let ul = document.querySelectorAll(".loadedImages");
    for(let i = 0; i < ul.length; i++){
        ul[i].addEventListener('click', openCardsField);

    }
}

function openCardsField(e){
    e.preventDefault();

    selector("#navigationSearch").childNodes.display = "none";
    selector("#cardsShallBeDecked").childNodes.display = "none";
    selector("#showBiggerPicture").innerHTML = e.target.parentNode.innerHTML;
    selector("#showBiggerPicture").innerHTML += '<button class="returnFromBiggerPicture"></button>';
    selector("#showBiggerPicture").innerHTML += '<button class="addToMainDeck">add to deck</button>';
    selector("#showBiggerPicture").style.cssText = "border:5px solid black; background-color:#E6B34B; display:block;";
    selector("#showBiggerPicture").addEventListener('click', returnFromBigPicture);
    let adds = document.querySelectorAll('.addToMainDeck');
    for(let i = 0; i < adds.length; i++){
        selector('.addToMainDeck').addEventListener('click', addToDeck);
    }
}

function returnFromBigPicture() {
    selector("#showBiggerPicture").innerHTML = '';
    selector("#showBiggerPicture").style.cssText = "border:none; background-color:none; display:none;";
}

function addToDeck(){
    selector("#deckBuilder section#deck").innerHTML += '<div><img src="' + selector("#showBiggerPicture img").src + '" title="' + selector("#showBiggerPicture img").title + '" alt="' + selector("#showBiggerPicture img").alt + '"/><button class="removeFromDeck">remove from deck</button></div>';
    selector("#showBiggerPicture").addEventListener('click', returnFromBigPicture);
    checkRemoveFromDeck();
}

function checkRemoveFromDeck(){
    let cards = document.querySelectorAll("section#deck .removeFromDeck");
    for(let i = 0; i < cards.length; i++){
        cards[i].addEventListener('click', removeCardFromDeck);
    }
}

function removeCardFromDeck(e){
    e.preventDefault();
    e.target.parentNode.remove()
}

function init(){
    start();
    getValueOfCardType();
    selector('#deckClass strong').innerHTML = localStorage.getItem("hero");
    selector('#showDeckBuilder').addEventListener('click', showActualCardsInDeck);
    selector('#showCardsToPutInDeck').addEventListener('click', showHideUls);
    selector('.next').addEventListener('click', nextPage);
    selector('.previous').addEventListener('click', previousPage);
    selector('#showCardsToPutInDeck').addEventListener('click', showCardsLibrary);
    searchMinionByName(selector('#deckClass strong').innerHTML);
    selector('#submit').addEventListener('click', filterOnParams);
}

document.addEventListener("DOMContentLoaded", init());