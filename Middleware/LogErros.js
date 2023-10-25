const {TrafficsLogs, LogEvent} = require('./Logevent');

const LogErros = (err, req, res, next) => {
    LogEvent(`${err.name}: ${err.message} : ${req.method} : ${req.headers.origin}`, 'errLog.txt');
    console.error(err.stack)
    res.status(500).send(err.message);

}

module.exports = LogErros;