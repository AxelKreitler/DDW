export const createGameURL = `http://localhost:8080/api/game`;
export const playGameURL = `http://localhost:8080/api/game/try`;

export const createGame = (name, age, digits) =>{
    return fetch(createGameURL, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify({
            name: name,
            age: age,
            digits: digits
        })
    });
}

export const playGame = (secretNumber, myNumber, gameId) =>{
    return fetch(playGameURL, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify({
            secretNumber: secretNumber,
            myNumber: myNumber,
            gameId: gameId
        })
    });
}