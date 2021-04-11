const express = require('express')
const path = require('path')
const exphbs = require('express-handlebars')
const morgan = require('morgan')
const override = require('method-override')
const flash = require('connect-flash')
const session = require('express-session')
const passport = require('passport')


//inicializaciones
const app = express();
require('./config/passport.js')

// configuraciones
app.set('port',process.env.PORT || 4000);
app.set('views',path.join(__dirname,'views'))
app.engine('.hbs', exphbs({
    extname:'.hbs', 
    defaultLayout:'main',
    layoutsDir: path.join(app.get('views'),'layouts'),
    partialsDir: path.join(app.get('views'),'partials'),
}));  

app.set('view engine','.hbs')

//middleware
app.use(express.urlencoded({extended:false}));
app.use(morgan('dev'));
app.use(override('_method'));
app.use(session({
    secret:"secret",
    resave:true,
    saveUninitialized:true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());


// variables globales
app.use(function(req, res,next){
    res.locals.success_msg= req.flash('success_msg');
    res.locals.update_msg= req.flash('update_msg');
    res.locals.delete_msg= req.flash('delete_msg');
    res.locals.error= req.flash('error');
    res.locals.user = req.user || null;
    next();
})

// routes

app.use(require('./routes/index.routes.js'))
app.use(require('./routes/notes.routes.js'))
app.use(require('./routes/users.routes.js'))

// archivos estaticos 
app.use(express.static(path.join(__dirname,'public')));

module.exports = app;