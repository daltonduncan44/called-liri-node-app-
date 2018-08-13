/// requires to packages and keys
var fs = require('fs'); 
var request = require('request');
var dotenv = require("dotenv").config();
var keys = require("./keys.js");
var Twitter = require("twitter");
var Spotify = require('node-spotify-api');
//grab using inputs
var command = process.argv[2];
var searchValue = "";

// turn inputs into a string 
for (var i = 3; i < process.argv.length; i++) {
    searchValue += process.argv[i] + " ";
};


// start twitter functions
//make sure its last twenty tweets
function getTweets() {

    // Accesses Twitter Keys
    var client = new Twitter(keys.twitter); 
    var params = {
        //screen_name: 'DaltonDDevs',
        count: 20
        };

    client.get('statuses/user_timeline', params, function( tweets, response) {

      


        console.log("\n----------------------------\n");

        for (i = 0; i < tweets.length; i++) {
            console.log(i + 1 + ". Tweet: ", tweets[i].text);

            // For alingment once the number of the tweet is 10 or higher
            if (i + 1 > 9) {
                console.log("    Tweeted on: ", tweets[i].created_at + "\n");
            } else {
                console.log("   Tweeted on: ", tweets[i].created_at + "\n");
            }  
            

        };

        console.log("--------------------------------------------------\n");


    });
};

switch (command) {
    case "my-tweets":
        getTweets();
        break;
};
//start spotify functions
// make sure to get artist, name,link, album 


//start movie this functions 
//get title year, rating, RT rating, country, language, plot, actors


//start liri do what it says
