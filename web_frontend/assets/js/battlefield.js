"use strict";

let checker = [];

function deleteFieldsBeforeRefil(frendlyBattleField){
    for(let i = 0; i < frendlyBattleField.length; i++){
        frendlyBattleField[i].innerHTML = "";
    }
}

function fillBattleFieldPlayer(cards) {
    amountOfCardsOnBattleField = 0;
    let frendlyBattleField = document.querySelectorAll("#yourBattlefield div");
    deleteFieldsBeforeRefil(frendlyBattleField);
    for(let i = 0; i < cards.length; i++){
        if(cards[i] === null){
            addCardToDiv(frendlyBattleField[i], "", i)
        }else{
            addCardToDiv(frendlyBattleField[i], cards[i], i);
            amountOfCardsOnBattleField += 1;
        }
    }
    checkIfPositionIsFree(frendlyBattleField, checker);
}

function addCardToDiv(fieldToAddOn, CardToAdd, i){
    fieldToAddOn.innerHTML = `<img src="${CardToAdd.imgPath}" alt="${CardToAdd.name}" title="${CardToAdd.name}"/><h2>A: ${CardToAdd.attack}</h2><h3>HP: ${CardToAdd.health}</h3><h4>dID= ${i}</h4>`;
}

function fillBattlefieldEnemy(cards) {
    let enemyBattlefield = document.querySelectorAll("#enemyBattlefield div");
    for(let i = 0; i < enemyBattlefield.length; i++){
        enemyBattlefield[i].innerHTML = cardsToHtml(cards, 'enemyCard card');
    }
}

const cardsToHtml = (cardArray, classes) => {
    return cardArray.reduce((result, card, index) => {
        result += `<li class="${classes}"><img src="${card.imgPath}"/><h2>A: ${card.attack}</h2><h3>HP: ${card.health}</h3><h4>dID= ${index}</h4></li>`;
        return result;
        }, '');

};

const cardsToHtmlEnemy = (cardArray, classes) => {
    return cardArray.reduce((result, card, index) => {
        result += `<li class="${classes}"><img src="../../../web_frontend/images/deckBack.jpg" alt="cardBack"/>`;
        return result;
    }, '');

};

function fillEnemyHandWithCards(cards) {
    document.querySelector('#enemyHand .cards').innerHTML = cardsToHtmlEnemy(cards, 'enemyCard card');
}

function fillFriendlyHandWithCards(cards) {
    document.querySelector('#yourHand .cards').innerHTML = cardsToHtml(cards, 'friendlyCard draggable card');
}

function resetIdForCardsInHand(){
    const fields = document.querySelectorAll("#yourHand .cards li");
    for (let i = 0; i < fields.length; i++) {
        fields[i].lastChild.innerHTML = "dID= " + (i);
    }
}

function changeTurn() {
    let friendlyCards = document.getElementsByClassName("turnFriendly");
    for (let i = 0; i < friendlyCards.length; i++) {
        friendlyCards[i].style.backgroundColor = "#2eb82e";
    }
}

function fetchGameObject() {
    fetch('http://localhost:4242/API/battlefield', {
        method: 'GET',
        headers: {
            'Content-type': 'application/json',
            'Accept': 'application/json'
        }
    })
        .then((res) => res.json())
        .then((data) => {
            updateGame(data);
        })
        .catch((err) => console.log(err));

}

function fetchGameStart() {

    fetch('http://localhost:4242/API/battlefield/startGame', {
        method: 'GET',
        headers: {
            'Content-type': 'application/json',
            'Accept': 'application/json'
        }
    })
        .then((res) => res.json())
        .then((data) => {
            updateGame(data);
            isStarted = true;
        })
        .catch((err) => console.log(err));
}

function updatePlayerData(names){
    document.querySelector('.playerNameSuccessor').innerHTML = names.player1;
    document.querySelector('.playerName').innerHTML = names.player2;
    document.querySelector('#enemyMana').innerHTML = names.player1Mana;
    document.querySelector('#yourMana').innerHTML = names.player2Mana;
    document.querySelector('#enemyHealth').innerHTML = names.player1Health;
    document.querySelector('#friendlyHealth').innerHTML = names.player2Health;
    document.querySelector('#enemyArmor').innerHTML = names.player1Armor;
    document.querySelector('#friendlyArmor').innerHTML = names.player2Armor;

    document.getElementById("enemyName").innerHTML = names.hero1Name;
    document.getElementById("heroName").innerHTML = names.hero2Name;

}

function updateGame(data) {

    const names = getState(data, 'name');
    updatePlayerData(names);

    const cards = getState(data, 'cards');
    fillFriendlyHandWithCards(cards.player2);

    const cards2 = getState(data,'cards');
    fillEnemyHandWithCards(cards2.player1);


    const cardsBattlefield = getState(data, 'cardsOnBattlefield');
    fillBattlefieldEnemy(cardsBattlefield.player1CardsOnBattlefield);
    fillBattleFieldPlayer(cardsBattlefield.player2CardsOnBattlefield);

    const heros = getState(data, 'hero');
    determineHero(heros);

}


const getState = (data, param) => {
    const [player1, player2] = Object.values(data);
    switch (param) {
        case 'name':
            return {
                player1: player1.name,
                player2: player2.name,
                player1Mana: player1.battlefieldFromPlayer.manaAmountPlayer,
                player2Mana: player2.battlefieldFromPlayer.manaAmountPlayer,
                player1Health:player1.playerHealth,
                player2Health: player2.playerHealth,
                player1Armor: player1.playerArmor,
                player2Armor: player2.playerArmor,
                hero1Name: player1.heroOfPlayer.name,
                hero2Name: player2.heroOfPlayer.name
            };
        case 'deck':
            return {
                player1: player1.battlefieldFromPlayer.deckPlayer.cards,
                player2: player2.battlefieldFromPlayer.deckPlayer.cards
            };
        case 'cards':
            return {
                player1: player1.battlefieldFromPlayer.playerHand.cards,
                player2: player2.battlefieldFromPlayer.playerHand.cards,
            };
        case 'cardsOnBattlefield':
            return {
                player1CardsOnBattlefield: player1.battlefieldFromPlayer.fieldFromPlayer.cards,
                player2CardsOnBattlefield: player2.battlefieldFromPlayer.fieldFromPlayer.cards
            };
        case 'hero':
            return {
                hero1Name: player1.heroOfPlayer.name,
                hero2Name: player2.heroOfPlayer.name,
            };
        default:
            break;
    }
};


function determineHero() {
    let enemySelector = document.querySelector("#charEnemy");
    let friendlySelector =  document.querySelector("#charFriendly");
    let enemySelectorAbility = document.querySelector("#enemyHeroPowerImg");
    let friendlySelectorAbility =  document.querySelector("#yourHeroPowerImg");

    let heroNameFriendly = document.querySelector("#heroName");
    let enemyNameHero = document.querySelector("#enemyName");
    // Nota Bene:  ../../images/Warrior.png geeft geen errors in Intellij,maar dan kan de browser deze images niet  tonen. Er is een Issue Tracker bij webstorm en IntelliJ forums hiervoor geopend (Marking as resources root verwijderd de errors, maar dan kan deze de img's niet vinden)


    let someStr = heroNameFriendly.innerText;
    let noQuotes = someStr.split('"').join('');
    let someStr2 = enemyNameHero.innerText;
    let noQuotes2 = someStr2.split('"').join('');


    if (noQuotes2 === "warrior") {
       enemySelector.innerHTML = `<img src='../../../../HoweststoneGroep17/web_frontend/images/Warrior.png' alt='warrior'/>`;
        enemySelectorAbility.innerHTML = `<img src='../../../../HoweststoneGroep17/web_frontend/images/warriorAbility.png' alt='warriorAbility'/>`//
    } else if (noQuotes2=== "priest") {
       enemySelector.innerHTML = `<img src='../../../../HoweststoneGroep17/web_frontend/images/Priest.png' alt='priest'/>`;
        enemySelectorAbility.innerHTML = `<img src='../../../../HoweststoneGroep17/web_frontend/images/priestAbility.png' alt='warriorAbility'/>`
    }

    if (noQuotes === "warrior") {
        friendlySelector.innerHTML = `<img src='../../../../HoweststoneGroep17/web_frontend/images/Warrior.png' alt='warrior'/>`;
        friendlySelectorAbility.innerHTML = `<img src='../../../../HoweststoneGroep17/web_frontend/images/warriorAbility.png' alt='warriorAbility'/>`
    } else if (noQuotes === "priest") {
       friendlySelector.innerHTML = `<img src='../../../../HoweststoneGroep17/web_frontend/images/Priest.png' alt='priest'/>`;
        friendlySelectorAbility.innerHTML = `<img src='../../../../HoweststoneGroep17/web_frontend/images/priestAbility.png' alt='warriorAbility'/>`
    }

}

function fillFriendlyBattlefieldWithFields() {
    let yourBattleField = document.getElementById("yourBattlefield");

    for (let i = 0; i < 7; i++) {
        yourBattleField.innerHTML += "<div class='field'></div>";
    }
    giveIdsToFields();
}

function giveIdsToFields() {
    const fields = document.querySelectorAll("#yourBattlefield .field");
    for (let i = 0; i < fields.length; i++) {
        fields[i].id = i
    }
}

let amountOfCardsOnBattleField = 0;

function placeCardOnBattlefield(cardOutOfHand) {
    let result = postToServer("http://localhost:4242/API/battlefield/placeCardOnBattlefield", JSON.stringify(cardOutOfHand))
        .then(() => {
            fetchGameObject();
        }).catch((err) => console.log(err));
    let cardsInField = document.querySelectorAll("#yourBattlefield div");

    let children = document.querySelector("#yourHand .cards").children;
    checkIfPositionIsFree(cardsInField, checker);
    if(checker[amountOfCardsOnBattleField] === false){
        document.querySelector("#yourBattlefield").children[amountOfCardsOnBattleField].innerHTML = children[cardOutOfHand].innerHTML;
        document.querySelector("#yourHand .cards").removeChild(children[cardOutOfHand]);
        checker[amountOfCardsOnBattleField] = true;
        amountOfCardsOnBattleField += 1;
    }else{
        amountOfCardsOnBattleField += 1;
    }
    resetIdForCardsInHand()
}

function checkIfPositionIsFree(cardsInField, checker) {
    for(let j = 0; j < cardsInField.length; j++) {
        checker[j] = cardsInField[j].children.length !== 0;
    }
}

function getFieldPosition(){
    let allFields = document.querySelectorAll("#yourBattlefield div");
    for(let i = 0; i < allFields.length; i++){
        if(allFields[i].innerHTML === ""){
            return i
        }
    }
    return -1;
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

document.addEventListener('DOMContentLoaded', init);

let isStarted = false;

function init() {

    fetchGameStart();
    document.getElementById("buttonEnd").addEventListener("click", changeTurn);
    document.querySelector(".sticky").style.display = "none";
    fillFriendlyBattlefieldWithFields();


    document.getElementById("yourHand").addEventListener("click", function () {
        let cardsInHand = document.querySelectorAll(".friendlyCard");
        let intPositionOnField = [];

        for (let i = 0; i < cardsInHand.length; i++) {
            if (!(cardsInHand[i].classList.contains("draggable"))) {
                intPositionOnField.push(i);
            }
        }
        placeCardOnBattlefield(intPositionOnField);
    });

    document.querySelector("#buttonEnd").addEventListener('click', fetchGameObject)



}

