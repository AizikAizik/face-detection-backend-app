const express = require("express");
const bodyparser = require("body-parser")
const bcrypt = require("bcrypt")
const cors = require("cors")

const knex = require('knex');

// contollers
const register = require("./controllers/register")
const signIn = require("./controllers/signIn")
const profile = require("./controllers/profile")
const image = require("./controllers/image")

const DB = knex({
        client : "pg",
        connection : {
                host : "127.0.0.1",
                user : "postgres",
                password : "aizik",
                database : "smart-brainDB"
        }
})

DB.select("*").from('users').then(data => {
        console.log(data)
})

const app = express();

app.use(bodyparser.json())
app.use(cors())

const PORT  = process.env.PORT || 3000;

app.get("/", (req, res)=>{
        res.send("client connected succesfully")
})

// Sign in Route
app.post("/signin",  signIn.handleSignIn( DB, bcrypt))

//Register route
app.post("/register", (req, res) => register.handleRegister(req,res,DB,bcrypt))

// get user profile route
app.get("/profile/:id", (req, res) => profile.handleProfile(req, res, DB))

app.put("/image", (req, res) => image.handleImage(req, res, DB))

app.post("/imageURL", (req, res) => image.handleAPICall(req, res))

app.listen(PORT, () =>{
        console.log(`app is running on port : ${port}`);
})

