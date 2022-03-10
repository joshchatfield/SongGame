//definitions
var Song = "";
var Artist = "";
var Album = "";
var ReleaseYear = ""
var Genre = "";
var UpperSong = "";
var LetterThatAppearsMost = "";
var ShowSpacesHasBeenClicked = false;
var ShowRandomizedLettersHasBeenClicked = false;
var ShowLetterThatAppearsMostHasBeenClicked = false;
var ShowArtistHasBeenClicked = false;
var ShowAlbumHasBeenClicked = false;
var ShowReleaseYearHasBeenClicked = false;
var LettersAlreadyUsed = [];
var Score = 100;

function StartNewGame () {
    MapData();
    InitialSongTitleSetup();
    FindLetterThatAppearsMost();
}

function OnLoad (){

}

function Guess () {
    RefreshScore(-3);
}

function ShowArtist () {
    if (!ShowArtistHasBeenClicked){
        var el = document.getElementById("artist");
        el.innerHTML = Artist;    

        el = document.getElementById("show-artist-button");
        el.style.background = "darkgray";
        el.style.color = "lightgray";
        RefreshScore(-20);
    }
    ShowArtistHasBeenClicked = true;
}

function ShowAlbum () {
    if(!ShowAlbumHasBeenClicked){
        var el = document.getElementById("album");
        el.innerHTML = Album;

        el = document.getElementById("show-album-button");
        el.style.background = "darkgray";
        el.style.color = "lightgray";
        RefreshScore(-20);
    }
    ShowAlbumHasBeenClicked = true;
}

function ShowReleaseYear () {
    if(!ShowReleaseYearHasBeenClicked){
        var el = document.getElementById("release-year");
        el.innerHTML = ReleaseYear;

        el = document.getElementById("show-release-year-button");
        el.style.background = "darkgray";
        el.style.color = "lightgray";
        RefreshScore(-10);
    }
    ShowReleaseYearHasBeenClicked = true;
}

function ShowRandomizedLetters () {
    if(!ShowRandomizedLettersHasBeenClicked){
        var el = document.getElementById("randomized-letters");
        var SongTemp = Song.toUpperCase();
    
        for (var i = 0; i < SongTemp.length; i++){
            var random = Math.floor(Math.random() * SongTemp.length);; 
            var temp1 = SongTemp[i];
            var temp2 = SongTemp[random];
    
            SongTemp = ReplaceCharAtStrIndex(i, temp2, SongTemp);
            SongTemp = ReplaceCharAtStrIndex(random, temp1, SongTemp);
        }
        el.innerHTML = SongTemp;

        el = document.getElementById("show-randomized-letters-button");
        el.style.background = "darkgray";
        el.style.color = "lightgray";
        RefreshScore(-20);
    }
    ShowRandomizedLettersHasBeenClicked = true;
}

function ShowLetterThatAppearsMost() {
    if(!ShowLetterThatAppearsMostHasBeenClicked){
        var SongTds = document.getElementsByClassName("song-td");
        for (var i = 0; i < Song.length; i++) {
            if(Song[i].toUpperCase() == LetterThatAppearsMost.toUpperCase()){
                SongTds[i].innerHTML = Song[i];
            }
        }
        el = document.getElementById("show-letter-that-appears-most-button");
        el.style.background = "darkgray";
        el.style.color = "lightgray";
        RefreshScore(-10);
    }
    ShowLetterThatAppearsMostHasBeenClicked = true;
}

function ShowSpaces () {
    if(!ShowSpacesHasBeenClicked){
        var SongTds = document.getElementsByClassName("song-td");
        for (var i = 0; i < Song.length; i++) {
            if(Song[i] == " "){
                SongTds[i].style.borderBottom = "1px solid white";
            }
        }
        el = document.getElementById("show-spaces-button");
        el.style.background = "darkgray";
        el.style.color = "lightgray";
        RefreshScore(-10);
    }
    ShowSpacesHasBeenClicked = true;
}

function PlaceLetter (letter) {
    var AlreadyUsed = false;
    for (var i = 0; i < LettersAlreadyUsed.length; i++){
        if (letter.toUpperCase() == LettersAlreadyUsed[i].toUpperCase()){
            AlreadyUsed = true;
        }
    }

    if (!AlreadyUsed) {
        console.log("not used yet");
        var SongTds = document.getElementsByClassName("song-td");
        for (var i = 0; i < Song.length; i++) {
            if(Song[i].toUpperCase() == letter.toUpperCase()){
                SongTds[i].innerHTML = Song[i];
            }
        }
        var IdStr = letter + "Button";
        el = document.getElementById(IdStr);
        el.style.background = "darkgray";
        el.style.color = "lightgray";
        LettersAlreadyUsed.push(letter);
        RefreshScore(-5);
    }
}

// HELPERS

function ReplaceCharAtStrIndex (index, char, string) {
    return string.substr(0, index) + char + string.substr(index + 1);
}

function InitialSongTitleSetup () {    
    if(Song.length > 37){
        //TODO: start new game until length is not > 35
    } else {
        el = document.getElementById("song-title");
        var html = '<table class = "song-table"><tr>';

        for (var i = 0; i < Song.length; i++) {
            html += 
            '<td style="border-bottom: 1px solid black;" ' +
            'class="song-td"></td>';
        }
    
        html += "</tr></table>"
        el.innerHTML = html;
    }
}

function RevealCompleteSongTitle () {    
    el = document.getElementById("song-title");
    var html = '<table class = "song-table"><tr>';

    for (var i = 0; i < Song.length; i++) {
        html += '<td>' + Song[i] + '</td>';
    }

    html += "</tr></table>"
    el.innerHTML = html;
}

function FindLetterThatAppearsMost () {
    LetterThatAppearsMost = "";
    var BiggestCount = 0;
    for (var i = 0; i < Song.length; i++) {
        var Count = 0;
        for (var t = 0; t < Song.length; t++) {
            if (Song[t].toUpperCase() == Song[i].toUpperCase() && Song[t].toUpperCase() != " "){
                Count++;
            }
        }
        if (Count > BiggestCount) {
            BiggestCount = Count;
            LetterThatAppearsMost = Song[i];
        }
    }
}

function MapData (data) {
    Song = "Every Little Kiss";
    Artist = "Bruce Hornsby";
    Album = "The Way It Is";
    ReleaseYear = "1986"
    Genre = "Rock";
}

function RefreshScore (num) {
    Score += num;
    var el = document.getElementById("score");
    el.innerHTML = Score;
}