//definitions
var Song = "";
var Artist = "";
var Album = "";
var ReleaseYear = ""
var Genre = "";
var DisplayedSongTitle = "";

function MapData (data) {
    console.log("mapdata triggered")
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

function ShowRandomizedLetters () {
    var el = document.getElementById("artist");

    var SongTemp = Song;

    for (var i = 0; i < Song.length; i++){
        
        var random = 5; //random num between 0 and song.length - 1
        var temp1 = SongTemp[i];
        var temp2 = SongTemp[random];

        SongTemp[i] = temp2;
        SongTemp[random] = temp1;


    }

    el.innerHTML = DisplayedSongTitle;
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
    console.log("OnLoadTriggered");
    MapData();
}
