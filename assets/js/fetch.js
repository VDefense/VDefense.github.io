"use strict";

function getText(e){
    e.preventDefault();

    fetch('sample.txt')
    //returns a promise, placeholder for response that we're gonna get asynchrounesly. Don't use a semicolon after the first fetch('')
        .then((response)=>response.text())
.then((data) => {
    document.getElementById("output").innerHTML = data;
})
.catch((err) => console.log(err))
}

function getUsers(){
    fetch('users.json')
        .then((res)=>res.json())
.then((data)=>{
        let output = '<h2>Users:</h2>';
    data.forEach(function (user) {
        //backticks for multiple lines  (output is hier variabele)
        output += `
                    <ul>
                    <li>ID: ${user.id}</li>
                    <li>Name: ${user.name}</li>
                    <li>Email: ${user.email}</li>
                    </ul>
                    `;
    });
    document.getElementById('output').innerHTML = output;
})
.catch((err) => console.log(err))
}

function getKlasse (){
    const klasseInput = document.getElementById('klasseInput').value;
    return klasseInput;
}

function getSpecificCards(klasse){
    fetch('https://omgvamp-hearthstone-v1.p.mashape.com/cards/classes/'+klasse, {
        method: 'GET',
        headers: {
            'X-Mashape-Key': 'hnoH70vwM0msh059R6A7RLXVRmLhp1eYbqFjsngR8enEYRcwWF',
            'Content-type': 'application/json',
            'Accept': 'application/json'
        }
    })
        .then((res) => res.json())
.then((data) =>{
        let outputSpecificCards ="<h2>Specific Cards:</h2>";

    data.forEach(function (card)
    {
        outputSpecificCards += `
                    <li><div><img src="${card.img}"/> <p>Name: ${card.name}, type: ${card.type}, text: ${card.text}</p></div></li>
                    `;
    });
    document.getElementById('specificCardAppend').innerHTML = outputSpecificCards;
})
.catch((err) => console.log(err))
}

function getCards() {
    fetch('https://omgvamp-hearthstone-v1.p.mashape.com/cards', {
        method: 'GET',
        headers: {
            'X-Mashape-Key': 'hnoH70vwM0msh059R6A7RLXVRmLhp1eYbqFjsngR8enEYRcwWF',
            'Content-type': 'application/json',
            'Accept': 'application/json'
        }
    })
        .then((res =>res.json()))
.then((data)=>{
        let outputCards ="<h2>All Cards</h2>";

    let cards = flattenCards(data);

    cards.forEach(function (card)
    {
        outputCards += `

                    <li><img src="${card.img}"/></li> `;

    });
    document.getElementById('cardAppend').innerHTML = outputCards;
})
.catch((err) => console.log(err))

}
function flattenCards(data){
    // Flatten the object as cahttp://hearthstoneapi.com/rds are stored in sets
    const result = [];
    for (let set in data) {
        for (let i = 0; i < data[set].length; i++) {            //check concat
            result.push(data[set][i]);
        }
    }
    return result;
}

document.addEventListener("DOMContentLoaded", function()
{
    document.getElementById('getText').addEventListener('click', getText);
    document.getElementById('getUsers').addEventListener('click', getUsers);
    document.getElementById('getCards').addEventListener('click',getCards);
    document.getElementById('showCards').addEventListener('click',showCards);
    document.getElementById('submit').addEventListener('click', function (e) {
        e.preventDefault();
        let klasse = getKlasse();
        getSpecificCards(klasse);
    });

});
