const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');
var env = require('node-env-file');

env(__dirname+'/.env');
global.__basedir = __dirname;

// loading models
const {
  sequelize
} = require(__basedir+'/api/models')
const config = require(__basedir+'/config')

// user router
const userRoutes = require(__basedir+'/api/routes/users');

//app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json());

// CORS handelers
app.use(cors());

// Routng handelers
app.use('/users', userRoutes);

// error handeling
app.use((req, res, next)=>{
    const error = new Error('Resource not fount');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next)=>{
    res.status(error.status || 500);
    res.json({
        error:{
            message: error.message
        } 
    })
});

sequelize.sync()
.then(() => {
    console.log(`Server started on port ${config.port}`)
})

module.exports = app;