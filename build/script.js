var xmlhttp;

window.onload = function () {

  document.getElementById('mainBtn').addEventListener('click', getData, false);
}//onload

function getData(e) {

  var theTitle = document.getElementById('searchCriteria').value;
  var url = "http://www.omdbapi.com/?t=" + theTitle + "&y=&plot=short&r=json"
  //console.log(url);

  xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = processData;
  xmlhttp.open("GET", url, true);
  xmlhttp.send();
  //console.log(xmlhttp);
}//getData


function processData() {

  if  (xmlhttp.readyState == 4 && xmlhttp.status == 200) {

        var movieJSON = xmlhttp.responseText;
        //console.log(movieJSON);
        movieJSON = JSON.parse(movieJSON);
        console.log(movieJSON);

        var movieRating = movieJSON.imdbRating;
        var movieTitle = movieJSON.Title;
        var plot = movieJSON.Plot;
        var poster = movieJSON.Poster;
        var totalResults = movieJSON.totalResults;
        var movieYear = movieJSON.Year;
        var movieReleaseDate = movieJSON.Released;
        var movieRunTime = movieJSON.Runtime;
        var movieGenre = movieJSON.Genre;
        var movieDirector = movieJSON.Director;
        var movieActors = movieJSON.Actors;
        var movieWriter = movieJSON.Writer;
        var movieAwards = movieJSON.Awards;
        var movieimdbRating = movieJSON.imdbRating;

        //https://www.omdbapi.com/
        document.getElementById('movieTitle').innerHTML       = movieTitle;
        document.getElementById('description').innerHTML      = plot;
        document.getElementById('poster').src                 = poster;
        document.getElementById('movieYear').innerHTML        = "(" + movieYear + ") ";
        document.getElementById('movieRunTime').innerHTML     = " &#124 (" + movieRunTime + ") ";
        document.getElementById('movieGenre').innerHTML       = " &#124 (" + movieGenre + ") ";
        document.getElementById('movieDirector').innerHTML    = "Director : " + movieDirector;
        document.getElementById('movieActors').innerHTML      = "Starring : " + movieActors;
        document.getElementById('movieWriter').innerHTML      = "Writer : " + movieWriter;
        document.getElementById('movieAwards').innerHTML      = "Awards : " + movieAwards;
        document.getElementById('movieimdbRating').innerHTML  =  movieimdbRating + "/10 ";
        //document.getElementById('totalResults').innerHTML = "Total Results : " + totalResults;

      }//if

}//processData
