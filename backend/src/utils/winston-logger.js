const { createLogger, format, transports} = require('winston');

module.exports = createLogger({
    format: format.combine(format.combine(
        format.simple(),
        format.timestamp(),
        format.printf(info => `{"game": ${info.message}, "timestamp": "${info.timestamp}" }`)
    )),
    transports:[
        new transports.File({
            maxsize: 5120000,
            filename: __dirname+'/../logs/game-logs.log' 
        }),
        new transports.Console({
            level: 'debug'
        })
    ]
})