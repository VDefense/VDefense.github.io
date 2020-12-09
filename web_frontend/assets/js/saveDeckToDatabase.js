"use strict";

function getDeckFromMainDeckField(){
    let allImagesOfCardsInDeck = document.querySelectorAll("#deckBuilder div");
    let cardObjects = [];
    for(let i = 0; i < Cards.length; i++){
        for(let j = 0; j < allImagesOfCardsInDeck.length; j++){
            if(allImagesOfCardsInDeck[j].childNodes[0].src === Cards[i].imgPath){
                cardObjects.push(Cards[i])
            }
        }
    }
    postCardsToServer(cardObjects)
}

function postToServer(url, data) {
    return new Promise((reject, resolve) => {
        fetch(url, {
            body: JSON.stringify(data),
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            }
        }).then((data) => console.log(data))
        .then((data) => resolve(data)).catch((err) => reject(err));
    })
}

function postCardsToServer(cardObjects){
    let result = postToServer("http://localhost:4242/API/deckBuilder/getSavedDeck", cardObjects)
        .then(() => {})
        .catch((err) => console.log(err));
}



function init() {
    document.querySelector("#saveDeck").addEventListener("click", getDeckFromMainDeckField)
}

document.addEventListener('DOMContentLoaded', init);