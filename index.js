const express = require('express');
const app = express();
const sql = require('mysql2');
const session = require('express-session');
require('dotenv').config();
const path = require('path')
const port = 3000;
app.set("view engine","ejs");
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.set("views",path.join(__dirname,"views"));

function isLoggedIn(req, res, next) {
  if (req.session && req.session.user) {
    next();
  } else {
    res.render("login",{err:"please login first"});
  }
}

app.use(session(
  {
  secret:process.env.SECRET_KEY,        
  resave: false,                   
  saveUninitialized: false,         
  cookie: { maxAge: 1000 * 60 * 60 } 
  }))

const pool = sql.createPool({
  host:process.env.DB_HOST,
  user:process.env.DB_USER,
  password:process.env.DB_PASSWORD,
  database:process.env.DB_NAME,
  port:process.env.DB_PORT
})

pool.query("SELECT 1 + 1 AS result", (err, results) => {
  if (err) {
    console.error("❌ Error connecting:", err.message);
  } else {
    console.log("✅ Connected! Result:", results[0].result);
  }
});


app.listen(port,() => {
    console.log(`app running at http://localhost:${port}/`)
})

app.get("/" , (req,res) => {
    res.render("index");
})

app.get("/signup",(req,res) => {
    res.render("signup",{ err: null });
})

app.post("/signup",(req,res) => {
    console.log(req.body);
    let data = req.body;
    let username = data.username;
    let email = data.email;
    let password = data.password;
    console.log(username,password,email);

    pool.query(`INSERT INTO users (username,email,password) VALUES(?,?,?)`,[username,email,password], (err,result) => {
      if(err){
        res.render("signup",{err:"database error"})
      } else {
        console.log("data inserted succefully")
        res.redirect("/")
      }
    })
})

app.get("/login" , (req,res) => {
    res.render("login",{ err: null });
})

app.post("/login" , (req,res) => {
    console.log(req.body);
    let data = req.body;
    let username = data.username;
    let password = data.password;
    console.log(username,password);
    pool.query(`SELECT * FROM users WHERE username = ? AND password = ?`,[username,password],(err,data) => {
      
      if(err){
        res.render("login",{err:"database error"})
      } else if(data.length > 0){
        console.log(data[0])
        req.session.user = data[0];
        // res.render("userdash.ejs",{user:data[0]})
        res.redirect("/dashboard")
      } else {
        res.render("login",{err:"invalid username or password"})
      }
    })
})

app.get("/dashboard",(req,res) => {
  if(req.session.user){
    const user = req.session.user;
    res.render("userdash",{ user })
  } else {
    res.render("login",{err:"please login first"})
  }
})