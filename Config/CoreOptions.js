require('dotenv').config()


const PORT = process.env.PORT
const whitelist = ['https://www.yoursite.com', `http://127.0.0.1:${PORT}`, `http://localhost:${PORT}`];
const CoreOptions = {
    origin: (origin, callback) => {
        if (whitelist.indexOf(origin) !== -1 || !origin) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    optionsSuccessStatus: 200
}

module.exports = CoreOptions;