// Convert Data

"use strict";

// Import Modules
const csv = require('csvtojson');
const fs = require('fs');


(async () => {
    let formattedData = {};
    let movies = await csv().fromString(fs.readFileSync(`./movies.csv`).toString());
    let ratings = await csv().fromString(fs.readFileSync(`./ratings.csv`).toString());

    for (let x = 0; x < ratings.length; x++) {
        if (!formattedData[ratings[x].movieId]) {
            let tempMovie = movies.find(tempMovie => tempMovie.movieId === ratings[x].movieId);
            formattedData[ratings[x].movieId] = {
                title: tempMovie.title,
                genres: tempMovie.genres.split("|"),
                ratings: {}
            };
        };
        formattedData[ratings[x].movieId].ratings[ratings[x].userId] = parseFloat(ratings[x].rating);
    };
    
    fs.writeFileSync("./convertedData.json", JSON.stringify(formattedData, null, 2));
})();
