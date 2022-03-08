//definitions
var Song = "";
var Artist = "";
var Album = "";
var ReleaseYear = ""
var Genre = "";
var DisplayedSongTitle = "";
var LetterThatAppearsMost = "";
SpacesHasBeenClicked = false;
ShowLetterThatAppearsMostHasBeenClicked = false;

function MapData (data) {
    Song = "Under The Table and Dreaming";
    Artist = "Dave Matthews";
    Album = "Under The Table And Dreaming";
    ReleaseYear = "1999"
    Genre = "Rock";
}

function Guess () {
}

function ShowArtist () {
    var el = document.getElementById("artist");
    el.innerHTML = Artist;
}

function ShowAlbum () {
    var el = document.getElementById("album");
    el.innerHTML = Album;
}

function ShowReleaseYear () {
    var el = document.getElementById("release-year");
    el.innerHTML = ReleaseYear;
}

function ReplaceCharAtStrIndex (index, char, string) {
    return string.substr(0, index) + char + string.substr(index + 1);
}

function ShowRandomizedLetters () {
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
}

function UpdateDisplayedSongTitle () {
    var el = document.getElementById("song-title");
    el.innerHTML = DisplayedSongTitle;
}

function FindLetterThatAppearsMost () {
    LetterThatAppearsMost = "";
    var BiggestCount = 0;
    for (var i = 0; i < Song.length; i++) {
        var Count = 0;
        for (var t = 0; t < Song.length; t++) {
            if (t == i && t != " "){
                Count++;
            }
        }
        if (Count > BiggestCount) {
            BiggestCount = Count;
            LetterThatAppearsMost = Song[i];
        }
    }
}

function UpdateSongTitle () {
    el = document.getElementById("song-title");
    var html = '<table class = "song-table"><tr>';
    console.log(ShowLetterThatAppearsMostHasBeenClicked + ' ' + SpacesHasBeenClicked);
    if (SpacesHasBeenClicked && !ShowLetterThatAppearsMostHasBeenClicked) {
        for (var i = 0; i < Song.length; i++) {
            if(Song[i] == " "){
                html += '<td style="bottom-border: 1px solid white;"></td>';
            } else {
                html += '<td style="border-bottom: 1px solid black;"></td>';
            }
        }
    } else if (ShowLetterThatAppearsMostHasBeenClicked && !SpacesHasBeenClicked) {
        for (var i = 0; i < Song.length; i++) {
            if(Song[i] == LetterThatAppearsMost){
                html +=
                '<td style="bottom-border: 1px solid black;">' +
                LetterThatAppearsMost +
                '</td>';
            } else {
                html += '<td style="border-bottom: 1px solid black;"></td>';
            }
        }
    } else if (SpacesHasBeenClicked && ShowLetterThatAppearsMostHasBeenClicked) {        //TODO
        for (var i = 0; i < Song.length; i++) {
            if(Song[i] == " ") {
                html += '<td style="bottom-border: 1px solid white;"></td>';
            } else if (Song[i] == LetterThatAppearsMost) {
                html += '<td style="bottom-border: 1px solid black;">' +
                LetterThatAppearsMost +
                '</td>';
            } else {
                html += '<td style="border-bottom: 1px solid black;"></td>';
            }
        }
    }

    html += "</tr></table>"
    console.log(html);
    el.innerHTML = html;
}

function ShowLetterThatAppearsMost() {
    ShowLetterThatAppearsMostHasBeenClicked = true;
    UpdateSongTitle();
}

function ShowSpaces () {
    SpacesHasBeenClicked = true;
    UpdateSongTitle();
}

function RevealCompleteSongTitle () {    
    el = document.getElementById("song-title");
    var html = '<table class = "song-table"><tr>';

    for (var i = 0; i < Song.length; i++) {
        html += '<td>' + Song[i] + '</td>';
    }

    html += "</tr></table>"
    console.log(html);
    el.innerHTML = html;
}

function InitialSongTitleSetup () {    
    if(Song.length > 37){
        //TODO: start new game until length is not > 35
    } else {
        el = document.getElementById("song-title");
        var html = '<table class = "song-table"><tr>';

        for (var i = 0; i < Song.length; i++) {
            html += '<td style="border-bottom: 1px solid black;"></td>';
        }
    
        html += "</tr></table>"
        console.log(html);
        el.innerHTML = html;
    }
}

function StartNewGame () {
    MapData();
    InitialSongTitleSetup();
    FindLetterThatAppearsMost();
}

function OnLoad (){
}
