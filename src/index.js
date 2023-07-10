const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const methodOverride = require('method-override');
const session = require('express-session');
const { allowInsecurePrototypeAccess } = require('@handlebars/allow-prototype-access');
const flash=require('connect-flash')

// Initialization
const app = express();
require('./database');

// Settings
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));

// Configure the view engine
const hbs = exphbs.create({
  defaultLayout: "main",
  layoutsDir: path.join(app.get("views"), "layouts"),
  partialsDir: path.join(app.get("views"), "partials"),
  extname: ".hbs",
});
app.engine(".hbs", hbs.engine);
app.set("view engine", ".hbs");

// Middlewares
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method')); //used for PUT requests
app.use(session({
    secret: 'mysecretapp',
    resave: true,
    saveUninitialized: true,
  })
);
app.use(flash());

//Global Variables
app.use((req,res,next) =>{ //Almacenar mensajes flash para guardar mensajes mostrados
  res.locals.success_msg=req.flash('success_msg') //Storage globally the messages sent through flash with the name success_msg
  res.locals.error_msg=req.flash('error_msg')
  next();

});

// Routes
app.use(require('./routes/index'));
app.use(require('./routes/notes'));
app.use(require('./routes/users'));

// Static Files
app.use(express.static(path.join(__dirname, 'public')));

// Server is listening
app.listen(app.get('port'), () => {
  console.log('Server on port', app.get('port'));
});
