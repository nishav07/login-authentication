const express = require('express');
const app = express();
const path = require('path')
const port = 3000;

app.set("view engine","ejs");
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.set("views",path.join(__dirname,"views"));

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
    res.redirect("/")
})

app.get("/login" , (req,res) => {
    res.render("login");
})