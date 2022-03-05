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
}

function ShowArtist () {
    var el = document.getElementById("artist");
    el.innerHTML = Artist;
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

function ShowAlbum () {
    var el = document.getElementById("album");
    el.innerHTML = Album;
}

function ShowReleaseYear () {
    var el = document.getElementById("release-year");
    el.innerHTML = ReleaseYear;
}

function UpdateDisplayedSongTitle () {
    var el = document.getElementById("song-title");
    el.innerHTML = DisplayedSongTitle;
}

function ShowWordStructure () {

}

function SetupSongTitle () {    
    if(Song.length > 37){
        //TODO: start new game until length is not > 35
    } else {
        el = document.getElementById("song-title");
        var html = '<table class = "song-table"><tr>';

        for (var i = 0; i < Song.length; i++) {
            html += '<td>' + Song[i] + '</td>';
        }
    
        html += "</tr></table>"
        console.log(html);
        el.innerHTML = html;
    }
}

function StartNewGame () {
    MapData();
    SetupSongTitle();
}

function OnLoad (){
}
