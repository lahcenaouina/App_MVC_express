const fs = require('fs');
const fsPromises = require('fs').promises;
const path = require('path');
const date = require('date-fns');
const {v4: uuid} = require('uuid');

const LogEvent = async (message , logName) => {
    const date = new Date();
    const Log = `LOG : TIME : ${date.getTime()} \t UUID : ${uuid()} \t ${message} \n`;

    try {
        if (!fs.existsSync(path.join(__dirname,'..','log'))) {
            await fsPromises.mkdir(path.join(__dirname ,'..', 'log'))
        }
        await fsPromises.appendFile(path.join(__dirname,'..', 'log', logName), Log);

    } catch (e) {
        console.log(e)
    }

}

const TrafficsLogs = (req , res , next ) => {
    LogEvent(`-> ${req.method}\t${req.headers.origin}\t${req.url}` , 'traffics.txt')
    next()
}

module.exports = {TrafficsLogs, LogEvent}