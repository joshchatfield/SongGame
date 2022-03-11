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
var SongTds = document.getElementsByClassName("song-td");

function InitializeGameVariables(){
    Song = "";
    Artist = "";
    Album = "";
    ReleaseYear = ""
    Genre = "";
    UpperSong = "";
    LetterThatAppearsMost = "";
    ShowSpacesHasBeenClicked = false;
    ShowRandomizedLettersHasBeenClicked = false;
    ShowLetterThatAppearsMostHasBeenClicked = false;
    ShowArtistHasBeenClicked = false;
    ShowAlbumHasBeenClicked = false;
    ShowReleaseYearHasBeenClicked = false;
    LettersAlreadyUsed = [];
    Score = 100;
    SongTds = document.getElementsByClassName("song-td");
}

function RestoreScoreDisplay(){
    document.getElementById("score-td").style.fontSize = "20px";
    document.getElementById("score-label").innerHTML = "Current Score: ";
    document.getElementById("score").innerHTML = Score;
}

function RestoreButtonDisplay(){
    var Buttons = document.getElementsByClassName("jc-button");
    for (var i = 0; i < Buttons.length; i++) {
        Buttons[i].style.background = "hsl(200, 100%, 50%)";
        Buttons[i].style.color = "white";
    }
}

function StartNewGame () {
    InitializeGameVariables();
    MapData();
    InitialSongTitleSetup();
    FindLetterThatAppearsMost();
    RestoreScoreDisplay();
    RestoreButtonDisplay();
}

function OnLoad (){
    SetupModal();
}

function Guess () {
    if(!IsGameOver()){
        // 
        RefreshScore(-3);
        IsGameOver();
    }

}

function ShowArtist () {
    if (!ShowArtistHasBeenClicked && !IsGameOver()){
        var el = document.getElementById("artist");
        el.innerHTML = Artist;    

        el = document.getElementById("show-artist-button");
        el.style.background = "darkgray";
        el.style.color = "lightgray";
        RefreshScore(-20);
        IsGameOver();
        ShowArtistHasBeenClicked = true;
    }
}

function ShowAlbum () {
    if(!ShowAlbumHasBeenClicked && !IsGameOver()){
        var el = document.getElementById("album");
        el.innerHTML = Album;

        el = document.getElementById("show-album-button");
        el.style.background = "darkgray";
        el.style.color = "lightgray";
        RefreshScore(-20);
        IsGameOver();
        ShowAlbumHasBeenClicked = true;
    }
}

function ShowReleaseYear () {
    if(!ShowReleaseYearHasBeenClicked && !IsGameOver()){
        var el = document.getElementById("release-year");
        el.innerHTML = ReleaseYear;

        el = document.getElementById("show-release-year-button");
        el.style.background = "darkgray";
        el.style.color = "lightgray";
        RefreshScore(-10);
        IsGameOver();
        ShowReleaseYearHasBeenClicked = true;
    }
}

function ShowRandomizedLetters () {
    if(!ShowRandomizedLettersHasBeenClicked && !IsGameOver()){
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
        IsGameOver();
        ShowRandomizedLettersHasBeenClicked = true;
    }
}

function ShowLetterThatAppearsMost() {
    if(!ShowLetterThatAppearsMostHasBeenClicked && !IsGameOver()){
        for (var i = 0; i < Song.length; i++) {
            if(Song[i].toUpperCase() == LetterThatAppearsMost.toUpperCase()){
                SongTds[i].innerHTML = Song[i];
            }
        }
        el = document.getElementById("show-letter-that-appears-most-button");
        el.style.background = "darkgray";
        el.style.color = "lightgray";
        RefreshScore(-10);
        IsGameOver();
        ShowLetterThatAppearsMostHasBeenClicked = true;
    }
}

function ShowSpaces () {
    if(!ShowSpacesHasBeenClicked && !IsGameOver()){
        for (var i = 0; i < Song.length; i++) {
            if(Song[i] == " "){
                SongTds[i].style.borderBottom = "1px solid white";
            }
        }
        el = document.getElementById("show-spaces-button");
        el.style.background = "darkgray";
        el.style.color = "lightgray";
        RefreshScore(-10);
        IsGameOver();
        ShowSpacesHasBeenClicked = true;
    }
}

function PlaceLetter (letter) {
    var AlreadyUsed = false;
    for (var i = 0; i < LettersAlreadyUsed.length; i++){
        if (letter.toUpperCase() == LettersAlreadyUsed[i].toUpperCase()){
            AlreadyUsed = true;
        }
    }

    if (!AlreadyUsed && !IsGameOver()) {
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
        IsGameOver();
    }
}

// HELPERS

function IsGameOver () {
    var IsGameOver = true;
    for (var i = 0; i < Song.length; i++) {
        if(SongTds[i].innerHTML == ""){
            IsGameOver = false;
        }
    }
    if(IsGameOver){
        console.log("gameover");
        document.getElementById("score-td").style.fontSize = "60px";
        document.getElementById("score-label").innerHTML = "Final Score: ";
    }
    return IsGameOver;
}

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
            if(Song[i] == " "){
                html += 
                '<td style="border-bottom: 1px solid black; color: white;" ' +
                'class="song-td">_</td>';    
            } else {
                html += 
                '<td style="border-bottom: 1px solid black;" ' +
                'class="song-td"></td>';
    
            }
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
    Song = "Come Together";
    Artist = "The Beatles";
    Album = "Abby Road";
    ReleaseYear = "1969"
    Genre = "Rock";
}

function RefreshScore (num) {
    if((Score + num) < 0)
    {
        console.log("your score is too low for that");
    } else {
        Score += num;
        var el = document.getElementById("score");
        el.innerHTML = Score;
    }
}

// modal
function OpenModal (WhichModal) {
    if(WhichModal == "Guess"){
        document.getElementById("Modal").style.display = "block";
    } else if (WhichModal == "StartNewGame"){
        document.getElementById("Modal").style.display = "block";
    }
}

function SetupModal (){

    // When the user clicks on <span> (x), close the modal
    document.getElementsByClassName("close")[0].onclick = function() {
        document.getElementById("Modal").style.display = "none";
    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        if (event.target == document.getElementById("Modal")) {
            document.getElementById("Modal").style.display = "none";
        }
    }
}