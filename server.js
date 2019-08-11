const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const keys = require('./config/keys');

require('./models/User');
require('./models/Folder');
require('./models/File');

// creates temp user and root folder
require('./models/init');

mongoose.Promise = global.Promise;
mongoose.connect(keys.mongoURI,{ useNewUrlParser: true });

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.use('/api',require('./routes'));
const PORT = process.env.PORT || 5000;
app.listen(PORT,()=>{
    console.log(`Listening on port ${PORT}`);
})
