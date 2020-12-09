"use strict";

let Cards = [];

function searchMinionByName(classOfHero){
    fetch("http://localhost:4242/API/getCards/" + classOfHero, {
        headers: new Headers({
            "Accept":"application/json"
        })
    }).then((res) => res.json())
        .then((data) => {
            for (let i = 0; i < data.length; i++) {
                if (!data[i].imgPath.match("http://wow.zamimg.com/images/hearthstone/cards/enus/original/GAME_005.png")) {
                    Cards.push((data[i]));
                }
            }
            showCardsInDeckBuilder(Cards);
        })
}

function getParams(){
    let allParams = [];

    let manaAmount = document.querySelector('#mana').value;
    let cardType = document.querySelector("#cardType").value;
    let minionAbility = document.querySelector("#minionAbility").value;
    let name = document.querySelector("#name").value;

    allParams.push(manaAmount, cardType, minionAbility, name);
    return allParams;
}

function filterOnParams(){
    event.preventDefault();
    let parameters = getParams();
    let cardsToShow = [];
    let cardsToShow2 = [];
    let cardsToShow3 = [];
    let cardsToShowFinal = [];

    if(parameters[0] !== ""){
        cardsToShow = searchByManaAmount(Cards, parameters[0]);
    }else{
        for(let i = 0; i < Cards.length; i++){
            if (!Cards[i].imgPath.match("http://wow.zamimg.com/images/hearthstone/cards/enus/original/GAME_005.png")) {
                cardsToShow.push(Cards[i])
            }
        }
    }
    if(parameters[1] === "minion"){
        cardsToShow2 = searchByCardType(cardsToShow, parameters[1]);
        cardsToShow3 = searchByMinionAbility(cardsToShow2, parameters[2]);
    }else{
        cardsToShow2 = searchByCardType(cardsToShow, parameters[1]);
        for(let i = 0; i < cardsToShow2.length; i++){
            cardsToShow3.push(cardsToShow2[i])
        }
    }

    if(parameters[3] !== ""){
        cardsToShowFinal = searchByCardName(cardsToShow3, parameters[3]);
    }else{
        for(let i = 0; i < cardsToShow3.length; i++){
            cardsToShowFinal.push(cardsToShow3[i])
        }
    }

    showCardsInDeckBuilder(cardsToShowFinal);

}

function showCardsInDeckBuilder(data){
    selector("#showCards").innerHTML = "";
    if(data.length === 0){
        selector("#showCards").innerHTML += "<p>There where no cards found</p>"
    }else{
        let amountOfUls = 0;
        selector("#showCards").innerHTML += "<ul></ul>";
        for (let i = 0; i < data.length; i++) {
            if (i % 7 === 0) {
                selector("#showCards").innerHTML += "<ul></ul>";
                amountOfUls += 1;
            }
            selector("#showCards ul:nth-child(" + (amountOfUls + 1) + ")").innerHTML += "<li class='loadedImages'><img src='" + data[i].imgPath + "'</li>";
        }
        if (selector("#showCards ul:nth-child(1)").innerHTML === "") {
            let child = selector("#showCards ul:nth-child(1)");
            child.parentNode.removeChild(child);
        }
        showHideUls(0);
        triggerCardField()
    }
}

function searchByManaAmount(data, amount) {
    let cardsToShow = [];
    for(let i = 0; i < data.length; i++) {
        if (data[i].cost === parseInt(amount)) {
            cardsToShow.push(data[i])
        }
    }
    return cardsToShow;
}

function searchByCardType(data, type) {
    let cardsToShow = [];
    for(let i = 0; i < data.length; i++) {
        if (data[i].type.toLowerCase() === type) {
            cardsToShow.push(data[i])
        }
    }

    return cardsToShow;
}

function searchByMinionAbility(data, ability){
    let cardsToShow = [];
    for(let i = 0; i < data.length; i++) {
        for(let j = 0; j < data[i].mechanics.length; j++){
            if (data[i].mechanics[j].name.toLowerCase() === ability) {
                cardsToShow.push(data[i])
            }
        }
        if((data[i].mechanics.length === 0) && ability === "none"){
            cardsToShow.push(data[i])
        }
    }

    return cardsToShow;
}

function searchByCardName(data, name) {
    let cardsToShow = [];
    name = name.toLowerCase();
    if(name !== null){
        for(let i = 0; i < data.length; i++) {
            if (data[i].name.toLowerCase().includes(name)){
                cardsToShow.push(data[i]);
            }
        }
    }else{
        cardsToShow = data;
    }

    return cardsToShow;
}

