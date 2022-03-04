//definitions
var Song = "";
var Artist = "";
var Album = "";
var ReleaseYear = ""
var Genre = "";
var DisplayedSongTitle = "";

function MapData (data) {
    Song = "Under The Table And Dreaming";
    Artist = "Dave Matthews";
    Album = "Under The Table And Dreaming";
    ReleaseYear = "1999"
    Genre = "Rock";
}

function Guess () {
    console.log("guessed");
}

function ShowArtist () {
    var el = document.getElementById("artist");
    el.style.display = "inline"
}

function ShowAlbum () {
    var el = document.getElementById("album");
    el.style.display = "inline"
}

function ShowReleaseYear () {
    var el = document.getElementById("release-year");
    el.style.display = "inline"
}

function UpdateDisplayedSongTitle () {
    var el = document.getElementById("song-title");
    el.innerHTML = DisplayedSongTitle;
}

//actions
function OnLoad (){
    console.log("OnLoad");
    MapData();
}
