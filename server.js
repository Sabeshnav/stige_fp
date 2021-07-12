const express = require('express');
const app = express();
var bodyParser = require('body-parser');
const connectDB = require('./DB/connection');
const path = require('path');
const router = express.Router();

const port = process.env.PORT || 3000;
app.use(express.static(path.join(__dirname, 'public')));
connectDB();
app.use(express.json({extended: false}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/user/', require('./API/user'));

router.get('/',function(req, res){
    res.sendFile(path.join(__dirname+'/auth.html'));
});

router.get('/dashboard',function(req, res){
    res.sendFile(path.join(__dirname+'/dashboard.html'));
});

app.use('/', router);
app.listen(port);

console.log('ff');