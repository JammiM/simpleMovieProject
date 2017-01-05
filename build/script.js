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

        document.getElementById('movieTitle').innerHTML = movieTitle;
        document.getElementById('movieRating').innerHTML = movieRating;
        document.getElementById('totalResults').innerHTML = "Total Results : " + totalResults;
        document.getElementById('description').innerHTML = plot;
        document.getElementById('poster').src = poster;


      }//if

}//processData
