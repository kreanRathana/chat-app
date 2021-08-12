require('dotenv').config();
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());




/* ROUTES HANDLER */
const indexRouter = require('./routes/index');
const authRouter = require('./routes/auth');

/* SET BASE DIR TO UPLOAD FILE */
// global.__basedir = __dirname;

/* VIEW ENGINE SETUP */ 
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

/* USER JWT AUTH TO SECURE APIs */
/* CHECK AUTH FOR ONLY START WITH /api */

/* MIDDLEWARES CONFIGURATION */
// app.use(cors());
// app.use(cookieParser());
// app.use(logger('dev'));
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// app.use(express.static(path.join(__dirname, 'public')));

/* ROUTES */
app.use('/', indexRouter);
app.use('/api/user',authRouter);



/* CATCH 404 AND FORWARD TO ERRORS HANDLER */
app.use(function (req, res, next) {
    next(createError(404));
});

/* ERRORS HANDLER */
app.use(function (err, req, res, next) {
    // set locals, only providing error in development  
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});


// data base mongodb connection
mongoose.connect(process.env.DB_URL, { useNewUrlParser: true ,useUnifiedTopology:true })

//listen on connection event
mongoose.connection
        .once("open", ()=> console.log('db connected successfull!!'))
        .on('err',(err)=> console.log(err))

module.exports = app;
