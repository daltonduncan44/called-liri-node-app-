
/// requests and getting global varible keys
var fs = require('fs'); 
var request = require('request');
var dotenv = require("dotenv").config();
var keys = require("./keys.js");
var Twitter = require("twitter");
var Spotify = require('node-spotify-api');

// Grabs the command from the terminal
var command = process.argv[2];
var searchValue = "";

// Puts together the search value into one string
for (var i = 3; i < process.argv.length; i++) {
    searchValue += process.argv[i] + " ";
};

// Error Functions 
function errorFunction(respError) {
    if (respError) {
        return console.log("Error occured: ", respError);
     }
};



// -------------------- Twitter my-tweets ----------------------------
function getTweets() {

    // Accesses Twitter Keys
    var client = new Twitter(keys.twitter); 
    var params = {
        screen_name: 'DaltonDDevs',
        count: 20
        };

    client.get('statuses/user_timeline', params, function(respError, tweets, response) {



        console.log("\n--------------Tweets :] --------------\n");

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
// ======================= Spotify spotify-this-song ============================
function searchSong(searchValue) {

    // Default search value if no song is given
    if (searchValue == "") {
        searchValue = "The Sign Ace of Base";
    }

    // Accesses Spotify keys  
    var spotify = new Spotify(keys.spotify);

    var searchLimit = "5";

    // Searches Spotify with given values
    spotify.search({ type: 'track', query: searchValue, limit: searchLimit }, function(respError, response) {



        var songResp = response.tracks.items;

        for (var i = 0; i < songResp.length; i++) {
            console.log("\n=============== Spotify Search Result "+ (i+1) +" ===============\n");
            console.log(("Artist: " + songResp[i].artists[0].name));
            console.log(("Song title: " + songResp[i].name));
            console.log(("Album name: " + songResp[i].album.name));
            console.log(("URL Preview: " + songResp[i].preview_url));
            console.log("\n=========================================================\n");

            fs.appendFile("log.txt", "\n========= Result "+ (i+1) +" =========\nArtist: " + songResp[i].artists[0].name + "\nSong title: " + songResp[i].name + "\nAlbum name: " + songResp[i].album.name + "\nURL Preview: " + songResp[i].preview_url + "\n=============================\n", errorFunction());
        }

        fs.appendFile("log.txt","-----Spotify Log Entry End-----\n\n", errorFunctionEnd());
    })
};
// ++++++++++++++++++++ OMDB movie-this +++++++++++++++++++++++++
function searchMovie(searchValue) {

    // Default search value if no movie is given
    if (searchValue == "") {
        searchValue = "Mr. Nobody";
    }

    var queryUrl = "http://www.omdbapi.com/?t=" + searchValue.trim() + "&y=&plot=short&apikey=trilogy";

    request(queryUrl, function(respError, response, body) {



        if (JSON.parse(body).Error == 'Movie not found!' ) {

            console.log("\nI'm sorry, I could not find any movies that matched the title " + searchValue + ". Please check your spelling and try again.\n")

        
        } else {

            movieBody = JSON.parse(body);

            console.log("\n++++++++++++++++ OMDB Search Results ++++++++++++++++\n");
            console.log("Movie Title: " + movieBody.Title);
            console.log("Year: " + movieBody.Year);
            console.log("IMDB rating: " + movieBody.imdbRating);
            console.log("Rotten Tomatoes Rating: " + movieBody.Ratings[[1]].Value);
            console.log("Country: " + movieBody.Country);
            console.log("Language: " + movieBody.Language);
            console.log("Plot: " + movieBody.Plot);
            console.log("Actors: " + movieBody.Actors);
            console.log("\n+++++++++++++++++++++++++++++++++++++++++++++++++\n");

        };      
    });
};


// <<<<<<<<<<<<<<<<< Main Switch Case >>>>>>>>>>>>>>>>>>>>

// Runs corresponding function based on user command
switch (command) {
    case "my-tweets":
        getTweets();
        break;
    case "spotify-this-song":
        searchSong(searchValue);
        break;
    case "movie-this":
        searchMovie(searchValue);
        break;
    case "do-what-it-says":
        randomSearch();
        break;
};
