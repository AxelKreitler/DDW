let router = require('express').Router();
const winstonLogger = require('../utils/winston-logger')

router.get('/', function (req, res, next) {
    res.json({
        status: 'API Its Working',
        message: 'Game starting'
    });
});

router.post('/', function (req, res, next) {
    try{
        if(!req.body.name)
            throw new Error('Please insert your name');
        if(!req.body.age)
            throw new Error('Please insert your age');
        if(!req.body.digits)
            throw new Error('Please insert the digits pf the game');
        if(req.body.digits <= 3 || req.body.digits >= 9)
            throw new Error('Please insert between 4 & 8 digits')

        const yearOfBirth = new Date().getFullYear() - req.body.age;
        const uuidv4 = require('uuid/v4');
        const gameId = uuidv4();
        const powOfMathRandom = Math.pow(10, req.body.digits);
        let secretNumber = Math.floor((Math.random()*powOfMathRandom))+'';
        while(secretNumber.length != req.body.digits){
            secretNumber = '0'+secretNumber;
        }

        res.json({
            name: req.body.name,
            yearOfBirth,
            gameId,
            secretNumber
        })

    }
    catch(err){
        res.status(400).json({
            Error: err.message
        })
    }
});

router.post('/try', function (req, res, next) {
    try{
        if(!req.body.secretNumber)
            throw new Error('Please insert your name');
        if(!req.body.myNumber)
            throw new Error('Please insert your age');
        if(!req.body.gameId)
            throw new Error('Please insert the digits pf the game');

        const myNumber = req.body.myNumber.toString();
        const secretNumber = req.body.secretNumber.toString();
        let message = '';
        let resolved = false;

        if(myNumber == secretNumber){
            message = `Congratulations you guessed correctly`;
            resolved = true;
            
        }else{
            let cows = 0; // correct digit in the correct spot
            let chickens = 0; // correct digit in the wrong spot
            for(let i = 0; myNumber.length > i; i++){
                if(myNumber[i] == secretNumber[i])
                    cows = cows+1;
                else{
                    for(let j = 0; myNumber.length > j; j++){
                        if(j != i){
                            if(myNumber[j] == secretNumber[i]){
                                chickens = chickens+1;
                                j = myNumber.length;
                            }
                                
                        }
                    }
                }
            } 
            message = `You had ${cows} cows and ${chickens} chikens`;
            resolved = false;
        }
        winstonLogger.info(`{"message": "${message}", "resolved": ${resolved}}, "gameId": "${req.body.gameId}", "digits": ${myNumber.length}`);
        res.json({
            message: message,
            resolved: resolved
        })
    }
    catch(err){
        res.json({
            Error: err.message
        })
    }
});

module.exports = router;