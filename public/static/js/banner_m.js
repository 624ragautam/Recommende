function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }
  // api key  from TMDB 
  const api = "api_key=04c35731a5ee918f014970082a0088b1";
  // base url of the site 
  const base_url = "https://api.themoviedb.org/3";
  // url
  const final_url = base_url + "/discover/movie?sort_by=popularity.desc&" + api;
  // img url 
  const img_url = "https://image.tmdb.org/t/p/original";
  
  // requests for movies data 
  const requests = {
    fetchNetflixOrignals_m: `https://api.themoviedb.org/3/discover/movie?api_key=04c35731a5ee918f014970082a0088b1&with_networks=213`,
  };
  // used to truncate the string 
  function truncate(str, n) {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  }
  // banner--movies
  fetch(requests.fetchNetflixOrignals_m)
  .then((res) => res.json())
  .then((data) => {
    console.log(data.results);
    // every refresh the movie will be change
    const setMovie = data.results[Math.floor(Math.random() * data.results.length - 1)];
    console.log(setMovie);
    if(setMovie==null)
      document.location.reload(true);
    var banner = document.getElementById("banner");
    var banner_title = document.getElementById("banner__title");
    var banner__desc = document.getElementById("banner__description");
    var text = document.getElementById("movid");
    text.innerHTML=setMovie.id;
    banner.style.backgroundImage = "linear-gradient(to bottom, rgba(0,0,0,0), #151515), url(" + img_url + setMovie.backdrop_path + ")";
    banner__desc.innerText = truncate(setMovie.overview, 250);
    banner_title.innerText = setMovie.title;
  })
  
  var movie_id = callid();