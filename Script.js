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
var MapDataCount = 0;

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
    MapDataCount = 0;
}

function StartNewGame () {
    InitializeGameVariables();
    if(MapData(Songs)){
        InitialSongTitleSetup();
        FindLetterThatAppearsMost();
        RestoreScoreDisplay();
        RestoreButtonDisplay();
        RestoreHintsDisplay();
    }
    CloseModal();    
}

function OnLoad (){
    SetupModal();
    GrayOutAllButtonsExceptNewGame();
    SongTitleOnLoad();
}

function ShowArtist () {
    if (!ShowArtistHasBeenClicked && 
        !IsGameOver() &&
        RefreshScore(-40)){
        var el = document.getElementById("artist");
        el.innerHTML = Artist;    
        el = document.getElementById("show-artist-button");
        el.style.background = "darkgray";
        el.style.color = "lightgray";
        ShowArtistHasBeenClicked = true;
        IsGameOver();
    }
}

function ShowAlbum () {
    if(!ShowAlbumHasBeenClicked && 
        !IsGameOver() &&
        RefreshScore(-20)){
        var el = document.getElementById("album");
        el.innerHTML = Album;
        el = document.getElementById("show-album-button");
        el.style.background = "darkgray";
        el.style.color = "lightgray";
        ShowAlbumHasBeenClicked = true;
        IsGameOver();
    }
}

function ShowRandomizedLetters () {
    if(!ShowRandomizedLettersHasBeenClicked && 
        !IsGameOver() &&
        RefreshScore(-20)){
        var el = document.getElementById("randomized-letters");
        var SongTemp = Song.toUpperCase();
    
        for (var i = 0; i < SongTemp.length; i++){
            var random = Math.floor(Math.random() * SongTemp.length);; 
            var temp1 = SongTemp[i];
            var temp2 = SongTemp[random];
    
            SongTemp = ReplaceCharAtStrIndex(i, temp2, SongTemp);
            SongTemp = ReplaceCharAtStrIndex(random, temp1, SongTemp);
        }
        SongTemp = SongTemp.replaceAll(' ', '');
        SongTemp = SanitizeString(SongTemp)

        el.innerHTML = SongTemp;
        el = document.getElementById("show-randomized-letters-button");
        el.style.background = "darkgray";
        el.style.color = "lightgray";
        ShowRandomizedLettersHasBeenClicked = true;
        IsGameOver();
    }
}

function ShowReleaseYear () {
    if(!ShowReleaseYearHasBeenClicked && 
        !IsGameOver() &&
        RefreshScore(-10)){
        var el = document.getElementById("release-year");
        el.innerHTML = ReleaseYear;
        el = document.getElementById("show-release-year-button");
        el.style.background = "darkgray";
        el.style.color = "lightgray";
        ShowReleaseYearHasBeenClicked = true;
        IsGameOver();
    }
}

function ShowLetterThatAppearsMost() {
    if(!ShowLetterThatAppearsMostHasBeenClicked && 
        !IsGameOver() &&
        RefreshScore(-10)){
        for (var i = 0; i < Song.length; i++) {
            if(Song[i].toUpperCase() == LetterThatAppearsMost.toUpperCase()){
                SongTds[i].innerHTML = Song[i];
            }
        }
        el = document.getElementById("show-letter-that-appears-most-button");
        el.style.background = "darkgray";
        el.style.color = "lightgray";
        ShowLetterThatAppearsMostHasBeenClicked = true;
        IsGameOver();
    }
}

function ShowSpaces () {
    if(!ShowSpacesHasBeenClicked && 
        !IsGameOver() &&
        RefreshScore(-10)){
        for (var i = 0; i < Song.length; i++) {
            if(Song[i] == " "){
                SongTds[i].style.border = "1px solid white";
            }
        }
        el = document.getElementById("show-spaces-button");
        el.style.background = "darkgray";
        el.style.color = "lightgray";
        ShowSpacesHasBeenClicked = true;
        IsGameOver();
    }
}

function PlaceLetter (letter) {
    var AlreadyUsed = false;
    for (var i = 0; i < LettersAlreadyUsed.length; i++){
        if (letter.toUpperCase() == LettersAlreadyUsed[i].toUpperCase()){
            AlreadyUsed = true;
        }
    }

    if (!AlreadyUsed && 
        !IsGameOver() &&
        RefreshScore(-5)) {
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
        IsGameOver();
    }
}

function GrayOutAllButtonsExceptNewGame(){
    var buttons = document.getElementsByClassName("jc-button");
    for (var i = 0; i < buttons.length; i++) {
        if(buttons[i].id != "start-new-game-button" &&
        buttons[i].id != "start-button" &&
        buttons[i].id != "pick-a-song-for-a-friend-button"
        ){
            buttons[i].style.background = "darkgray";
            buttons[i].style.color = "lightgray";
        }
    }
}

function Guess () {
    if(!IsGameOver() &&
        RefreshScore(-1)){
        var guess = document.getElementById("GuessInput").value;

        if (SanitizeString(guess) == SanitizeString(Song)) {
            RevealCompleteSongTitle();
            IsGameOver(true);
        } else {
            IsGameOver();
        }
        CloseModal();
    }
}

// HELPERS

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

function RestoreHintsDisplay () {
    document.getElementById("artist").innerHTML = "";
    document.getElementById("album").innerHTML = "";
    document.getElementById("randomized-letters").innerHTML = "";
    document.getElementById("release-year").innerHTML = "";
}

function IsGameOver (forceGameOver) {
    var IsGameOver = true;
    if(!forceGameOver){
        for (var i = 0; i < Song.length; i++) {
            if(SongTds[i].innerHTML == ""){
                IsGameOver = false;
            }
        }
    }
    if(IsGameOver){
        GrayOutAllButtonsExceptNewGame();
        document.getElementById("score-td").style.fontSize = "60px";
        document.getElementById("score-label").innerHTML = "Final Score: ";
    }
    if (Score == 0){
        GrayOutAllButtonsExceptNewGame();
        document.getElementById("score-td").style.fontSize = "40px";
        document.getElementById("score-label").innerHTML = "Game Over, Final Score: ";
    }
    return IsGameOver;
}

function ReplaceCharAtStrIndex (index, char, string) {
    return string.substr(0, index) + char + string.substr(index + 1);
}

function SanitizeString (str) {
    str = str.replaceAll('!','');
    str = str.replaceAll('?','');
    str = str.replaceAll('.','');
    str = str.replaceAll(',','');
    str = str.replaceAll('"','');
    str = str.replaceAll("'",'');
    str = str.toUpperCase();
    return str;
}

function InitialSongTitleSetup () {    
    if(Song.length > 37){
        StartNewGame();
    } else {
        el = document.getElementById("song-title");
        var html = '<table class = "song-table"><tr>';

        for (var i = 0; i < Song.length; i++) {
            if(Song[i] == " "){
                html += 
                '<td style="border: 2px solid black; color: white;" ' +
                'class="song-td">_</td>';    
            } else if (
                Song[i] == "!" ||
                Song[i] == "?" ||
                Song[i] == "." ||
                Song[i] == "," ||
                Song[i] == "'" ||
                Song[i] == '"'
                ) {
                html += 
                '<td style="border-bottom: 1px solid black;" ' +
                'class="song-td">' + Song[i] +
                '</td>';    
            } else {
                html += 
                '<td style="border: 2px solid black;" ' +
                'class="song-td"></td>';    
            }
        }
        html += "</tr></table>"
        el.innerHTML = html;
    }
}

function SongTitleOnLoad () {    
    el = document.getElementById("song-title");
    var html = '<table class = "song-table"><tr>';
    var onloadtitle = "Songzie"

    for (var i = 0; i < onloadtitle.length; i++) {
            html += 
            '<td style="border: 2px solid black;" ' +
            'class="song-td">' +
            onloadtitle[i] +
            '</td>';    
        }
    html += "</tr></table>"
    el.innerHTML = html;
}

function RevealCompleteSongTitle () {    
    el = document.getElementById("song-title");
    var html = '<table class = "song-table"><tr>';

    for (var i = 0; i < Song.length; i++) {
        html += '<td class="song-td">' + Song[i] + '</td>';
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
    var rand = Math.floor(Math.random() * (data.length - 1));
    var currentSong = data[rand];

    var decade = 1900;
            if (currentSong.ReleaseYear >= 2020 && currentSong.ReleaseYear < 2030) {
        decade = 2020;
    } else if (currentSong.ReleaseYear >= 2010 && currentSong.ReleaseYear < 2020) {
        decade = 2010;
    } else if (currentSong.ReleaseYear >= 2000 && currentSong.ReleaseYear < 2010) {
        decade = 2000;
    } else if (currentSong.ReleaseYear >= 1990 && currentSong.ReleaseYear < 2000) {
        decade = 1990;
    } else if (currentSong.ReleaseYear >= 1980 && currentSong.ReleaseYear < 1990) {
        decade = 1980;
    } else if (currentSong.ReleaseYear >= 1970 && currentSong.ReleaseYear < 1980) {
        decade = 1970;
    } else if (currentSong.ReleaseYear >= 1960 && currentSong.ReleaseYear < 1970) {
        decade = 1960;
    }

    if(
        decade != document.getElementById("DecadePulldown").value ||
        currentSong.Genre != document.getElementById("GenrePulldown").value        
    ) {
        MapDataCount++;
        if(MapDataCount > data.length) {
            console.log("can't find song for specified genre and release year");
            return false;
        } else {
            return MapData(data);
        }
    } else {
        Song = currentSong.Song;
        Artist = currentSong.Artist;
        Album = currentSong.Album;
        ReleaseYear = currentSong.ReleaseYear;
        Genre = currentSong.Genre;    
        return true;
    }
}

function RefreshScore (num) {
    if((Score + num) < 0)
    {
        OpenModal("Notification");
        return false;
    } else {
        Score += num;
        var el = document.getElementById("score");
        el.innerHTML = Score;
        return true;
    }
}

// modal
function OpenModal (WhichModal) {
    if(WhichModal == "Guess"){
        if(!IsGameOver()){
            if(Score < 1){
                OpenModal("Notification");
            } else {
                document.getElementById("Modal").style.display = "block";
                document.getElementById("NewGameContainer").style.display = "none";
                document.getElementById("GuessContainer").style.display = "block";
                document.getElementById("NotificationContainer").style.display = "none";
            }
        }
    } else if (WhichModal == "StartNewGame"){
        document.getElementById("Modal").style.display = "block";
        document.getElementById("NewGameContainer").style.display = "block";
        document.getElementById("GuessContainer").style.display = "none";
        document.getElementById("NotificationContainer").style.display = "none";
    } else if (WhichModal == "Notification"){
        document.getElementById("Modal").style.display = "block";
        document.getElementById("NewGameContainer").style.display = "none";
        document.getElementById("GuessContainer").style.display = "none";
        document.getElementById("NotificationContainer").style.display = "block";
    }
}

function CloseModal () {
    document.getElementById("Modal").style.display = "none";
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

var Songs = [
    {
        "Song": "Come Together",
        "Artist": "The Beatles",
        "Album": "Abbey Road",
        "ReleaseYear": "1969",
        "Genre": "Rock"
    },{
        "Song": "Peace Train",
        "Artist": "Cat Stevens",
        "Album": "Teaser and the Firecat",
        "ReleaseYear": "1971",
        "Genre": "Rock"
    },{
        "Song": "Tonight Tonight",
        "Artist": "Smashing Pumkins",
        "Album": "Mellon Collie and the Infinite Sadness",
        "ReleaseYear": "1996",
        "Genre": "Rock"
    },{
        "Song": "Say It Ain't So",
        "Artist": "Weezer",
        "Album": "Weezer",
        "ReleaseYear": "1994",
        "Genre": "Rock"
    },{
        "Song": "Comfortably Numb",
        "Artist": "Pink Floyd",
        "Album": "The Wall",
        "ReleaseYear": "1979",
        "Genre": "Rock"
    },{
        "Song": "Crash Into Me",
        "Artist": "Dave Matthews",
        "Album": "Crash",
        "ReleaseYear": "1996",
        "Genre": "Rock"
    },{
        "Song": "Ironic",
        "Artist": "Alanis Morissette",
        "Album": "Jagged Little Pill",
        "ReleaseYear": "1996",
        "Genre": "Rock"
    },{
        "Song": "Yellow Ledbetter",
        "Artist": "Pearl Jam",
        "Album": "Ten",
        "ReleaseYear": "1991",
        "Genre": "Rock"
    }
]