const EventEmitter = require('events');
const {LogEvent} = require('./Middleware/Logevent');

class A extends EventEmitter {

}

let a = new A();

a.on('log', (msg) => LogEvent(msg))

setTimeout(() => {
    a.emit('log', "Hi from immit")
}, 3000)