const express = require('express');
const app = express();
const sql = require('mysql2');
require('dotenv').config();
const path = require('path')
const port = 3000;
app.set("view engine","ejs");
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.set("views",path.join(__dirname,"views"));


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
    console.log(`app running at localhost:${3000}`)
})

app.get("/" , (req,res) => {
    res.render("index");
})

app.get("/signup",(req,res) => {
    res.render("signup");
})

app.post("/signup",(req,res) => {
    console.log(req.body);
    let data = req.body;
    let username = data.username;
    let email = data.email;
    let password = data.password;
    console.log(username,password,email);

    pool.query(`INSERT INTO users (username,email,password) VALUES(?,?,?)`,[username,email,password], (err,result) => {
      if(err) throw err
      else console.log("data inserted succefully");
    })
    res.redirect("/")
})

app.get("/login" , (req,res) => {
    res.render("login");
})

app.post("/login" , (req,res) => {
    console.log(req.body);
    let data = req.body;
    let username = data.username;
    let password = data.password;
    console.log(username,password,email);
})