var xmlhttp;

//window.onload = function () {
//  document.getElementById('mainBtn').addEventListener('click', getData, false);
//}//onload

function getData(e) {

  var theTitle = document.getElementById('searchCriteria').value;
  var url = "http://www.omdbapi.com/?t=" + theTitle + "&y=&plot=short&r=json"
  //console.log(url);

  if ( window.XMLHttpRequest ) {
    // Checks if the (modern) browser supports xmlhttp.
    xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = processData;
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
  } else {
    // Targetted towards older browsers IE that don't support modern xmlhttp.
    xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    xmlhttp.onreadystatechange = processData;
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
  }
  //console.log(xmlhttp);
}//getData

function processData() {
  if  (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
        var movieJSON = xmlhttp.responseText;
        //console.log(movieJSON);
        movieJSON = JSON.parse(movieJSON);
        //console.log(movieJSON);

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
        document.getElementById('movieimdbRating').innerHTML  =  movieimdbRating + "/10 ";
        //document.getElementById('totalResults').innerHTML = "Total Results : " + totalResults;
        $("#mainMovieData").append("<p>Starring : " + movieActors + "</p>");
        $("#mainMovieData").append("<p>Writer : " + movieWriter + "</p>");
        $("#mainMovieData").append("<p>Awards : " + movieAwards + "</p>");

        activateAnimations();

      }
      /* Error checking for the 'readyState' response.
      else if (xmlhttp.readyState == 1) {
        alert("server connection established.");
      } else if (xmlhttp.readyState == 2) {
        alert("request received.");
      } else if (xmlhttp.readyState == 3) {
        alert("processing request.");
      } else {
        alert("The server was reached, but it returned an error.");
      }
      */

}//processData

function activateAnimations() {
  $("#mainMovieData h1, #mainMovieData h2, #mainMovieData span, #mainMovieData p").velocity("transition.slideLeftIn",
                          { stagger: 300,
                            drag: true });
}//activateAnimations

$(document).ready(() => {

  $('#mainBtn').on('click', (e) => {

    let enteredText = $('#searchCriteria').val();
    findMovies(enteredText);
    e.preventDefault();

  });

});//ready



function findMovies(enteredText) {

  var url = "http://www.omdbapi.com/?s=" + enteredText;
  if ( window.XMLHttpRequest ) {
    xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = processDataM;
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
  } else {
    // Targetted towards older browsers IE that don't support modern xmlhttp.
    xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    xmlhttp.onreadystatechange = processDataM;
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
  }
  //console.log(xmlhttp);

}//findMovies


function processDataM() {
  if  (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
        var movieJSON = xmlhttp.responseText;
        movieJSON = JSON.parse(movieJSON);
        let AllReturnedMovies = movieJSON.Search;
        let movieDataReturnedToThePage = ``;
        $.each(AllReturnedMovies, (index, singleMovie) => {

          movieDataReturnedToThePage += `
            <div class="col-md-3">
              <div class="well text-center">
                <img src="${singleMovie.Poster}">
                <h5>${singleMovie.Title}</h5>
                <em>${singleMovie.Year}</em>
              </div>
            </div>
          `;


          activateAnimationsForMovies();

        });//eachLoop

      $('#tempHolderForMovies').html(movieDataReturnedToThePage);

      }//if



}//processDataM


function activateAnimationsForMovies() {
  $("#tempHolderForMovies").velocity("transition.slideLeftIn",
                          { stagger: 300,
                            drag: true });
}//activateAnimations
