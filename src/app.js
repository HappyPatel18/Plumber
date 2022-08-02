require('dotenv').config();
require('express-async-errors');
const Register = require("../model/register")
// const passport = require('passport');
const express = require('express');
const path = require('path');
const app = express();
const connectDB = require('../db/connect')
const tasks =require('../routes/tasks');
const admin =require('../routes/admin');

const hbs= require('hbs');
const cors = require('cors');
const oneDay = 1000 * 60 * 60 *24;
const session = require('express-session');
const cookieParser = require("cookie-parser");


const flash = require('connect-flash');
const notFoundMiddleware = require('../middleware/not-found');
const errorHandlerMiddleware = require('../middleware/error-handler');
const bodyParser = require('body-parser');

const publicDirectoryPath = path.join(__dirname, "./public/");

const viewPath = path.join(__dirname, "./templates/views")  //To customize path of view in hbs
const partialsPath=path.join(__dirname, "./templates/partials")

// function isLoggedIn(req,res,next){
//   req.user ? next():res.render("login");
// }

app.use(cors())
app.use(cookieParser());
app.use(bodyParser.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


app.set("view engine", "hbs"); // This is only needed to setup handlebars
app.set('views',viewPath)
hbs.registerPartials(partialsPath)

app.use(session({
  secret:'keythatwillsignedthecookie',
  saveUninitialized: true,
  resave: false,  // RESAVE Means for every request to the server we need new cookie
  cookie: { maxAge: oneDay },
}));

//Setup static directory to serve
app.use(express.static(publicDirectoryPath));
app.use(flash());

app.use(express.json());
app.use(express.urlencoded({extended: false}))
app.use('/users',tasks);
app.use('/admin',admin);


app.get("/",(req, res) => {
  res.render("login");
});

app.get("/home",(req, res) => {
  res.render("home");
});

app.get("/admin/login", (req, res) => {
  res.render("admin/login",{message:req.flash('message')});
});

app.get("/admin/logout", (req, res) => {
  req.session.destroy((err) => {
    res.redirect('/admin/login') // will always fire after session is destroyed
  })});


app.get("/logout",(req, res) => {
  req.session.destroy((err) => {
    res.redirect('/') // will always fire after session is destroyed
  })
});


app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI)
    app.listen(process.env.PORT || 8080, function(){
      console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
