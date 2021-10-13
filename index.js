//TODO: CONFIG EXPRESS SERVER
const express = require('express');
require('dotenv').config();

const { dbConnection } = require('./database/config');

const app = express();

//database
dbConnection();

//public dir
app.use( express.static('public') );

//json parser
app.use( express.json() );

//routes
app.use( '/api/auth', require('./routes/auth') );

app.listen( process.env.PORT, () => {
    console.log(`server running on: ${ process.env.PORT }`);
});

