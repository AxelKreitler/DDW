let router = require('express').Router();

router.get('/game-logs', function (req, res, next) {
    const fs = require('fs') 
    fs.readFile(__dirname+'/../logs/game-logs.log', 'utf-8', (err, data) => { 
        if (err) 
        throw new Error(err); 

        const myGameLogs = [];
        const lines = data.split(/\r?\n/)
        for(let i = 0; i < lines.length - 1; i++){
            const line = JSON.parse(lines[i])
            myGameLogs.push(line);
        }

        res.json(myGameLogs);
    }) 
});

router.get('/tried-amounts', function (req, res, next) {
    const fs = require('fs') 
    fs.readFile(__dirname+'/../logs/game-logs.log', 'utf-8', (err, data) => { 
        if (err) 
        throw new Error(err); 

        const myGameLogs = [];
        const lines = data.split(/\r?\n/)
        for(let i = 0; i < lines.length - 1; i++){
            const line = JSON.parse(lines[i])
            myGameLogs.push(line);
        }

        const amountsTried= [];
        for(let i = 0; i < myGameLogs.length; i++){
            const check = amountsTried.find(elem => elem.id === myGameLogs[i].gameId);
            if(check){
                check['try']++;
                check;
            }
            else{
                amountsTried.push({"id": myGameLogs[i].gameId, "digits": myGameLogs[i].digits, "try": 1})
            }
        }

        res.json(amountsTried)
    }) 
});

router.get('/', function (req, res, next) {
    const fs = require('fs') 
    fs.readFile(__dirname+'/../logs/game-logs.log', 'utf-8', (err, data) => { 
        if (err) 
        throw new Error(err); 

        const myGameLogs = [];
        const lines = data.split(/\r?\n/)
        for(let i = 0; i < lines.length - 1; i++){
            const line = JSON.parse(lines[i])
            myGameLogs.push(line);
        }

        const amountsTried= [];
        for(let i = 0; i < myGameLogs.length; i++){
            const check = amountsTried.find(elem => elem.id === myGameLogs[i].gameId);
            if(check){
                check['try']++;
            }
            else{
                amountsTried.push({"id": myGameLogs[i].gameId, "digits": myGameLogs[i].digits, "try": 1})
            }
        }

        const groupedByDigits = [];

        for(let i = 0; i < amountsTried.length; i++){
            const check = groupedByDigits.find(elem => elem.digits === amountsTried[i].digits);
            if(check){
                check['gamesPlayed']++;
                check['attempts'] += amountsTried[i].try;
                if(check['lowerAttempts'] > amountsTried[i].try)
                    check['lowerAttempts'] = amountsTried[i].try
                if(check['maxAttempts'] < amountsTried[i].try)
                    check['maxAttempts'] = amountsTried[i].try
            }
            else{
                groupedByDigits.push({"digits": amountsTried[i].digits, "attempts": amountsTried[i].try, "gamesPlayed": 1, "lowerAttempts": amountsTried[i].try, "maxAttempts": amountsTried[i].try})
            }
        }

        res.json(groupedByDigits);
    }) 
});

module.exports = router;
