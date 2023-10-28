const SessionOptions = {
  secret: 'your-secret-key',
  resave : false, 
  saveUninitialized: false,
  cookie: {
    maxAge: 3600000,
  },
}


module.exports = SessionOptions;
