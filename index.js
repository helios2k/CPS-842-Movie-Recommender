// Express Server 

"use strict";

// Import Modules
const express = require('express');
const compression = require('compression');
const cookieParser = require('cookie-parser');
const path = require('path');
const fs = require('fs');

var availableUsers = JSON.parse(fs.readFileSync("./data/availableUsers.json")),
    movieData = JSON.parse(fs.readFileSync('./data/filteredData.json'));


const app = express();
app.use(compression());
app.use(express.json());
app.use(cookieParser());
const PORT = 8888;

app.listen(PORT, () => {
    console.log(`Server Setup Listening on Port ${PORT}`);
});

app.post("/create-user", async (req, res) => {
    try {
        let tempUserID = getRandomID();
        availableUsers[tempUserID] = req.body.username;
        saveData();
        res.cookie('userID', tempUserID);
        res.redirect(`http://localhost:${PORT}/`);
    } catch (e) {
        console.log(e);
        res.status(500).end();
    }
});

app.post('/login', async (req, res) => {
    if (req.body.username) return res.status(403).end();
    try {
        if (!availableUsers[req.body.username]) return res.status(403).end();
        res.cookie('userID', availableUsers[req.body.username]);
        res.redirect(`http://localhost:${PORT}/`);
    } catch (e) {
        console.log(e);
        res.status(500).end();
    }
})

app.post("/add-rating", async (req, res) => {
    if (req.cookies.userID || req.body.movieID) return res.status(403).end();
    try {
        movieData[req.body.movieID].ratings[req.cookies.userID] = req.body.rating;
        saveData();
        res.status(200).end();
    } catch (e) {
        console.log(e);
        res.status(500).end();
    }
});

app.get("/public/*", async (req, res) => {
    return res.sendFile(path.join(__dirname, decodeURIComponent(req.path)));
})

app.get("/", async (req, res) => {
    return res.sendFile(path.join(__dirname, "public/landing-page.html"));
});

app.get("/login", async (req, res) => {
    return res.sendFile(path.join(__dirname, "public/login-page.html"));
});


app.get("/movie/*", async (req, res) => {
    try {
        const movieID = req.path.split("/movie/")[1],
            tempMovieData = movieData[movieID];
        if (!tempMovieData) return res.status(404).send("Invalid Movie ID");
        // Do calculations here

        let formattedHTML = fs.readFileSync("./public/movie-page.html").toString();

        // Update HTML Here 
        formattedHTML = formattedHTML.replace("MOVIE TITLE HERE", tempMovieData.title);
        res.setHeader('content-type', 'text/html; charset=UTF-8');
        res.status(200).send(formattedHTML);
    } catch (e) {
        console.log(e);
        res.status(500).send(e);
    }
});

function saveData() {
    fs.writeFileSync('./data/availableUsers.json', JSON.stringify(availableUsers, null, 2));
    fs.writeFileSync('./data/filteredData.json', JSON.stringify(movieData, null, 2));
}

function getRandomID(min = 600, max = 1000) { // Get random ID
    return Math.floor(Math.random() * (max - min + 1) + min);
};