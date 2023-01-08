function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

  function truncate(str, n) {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  }




const APIURL_Movies =
    `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=${getRandomInt(17)}`;
const IMGPATH_Movies = "https://image.tmdb.org/t/p/w1280";
const SEARCHAPI_Movies =
    "https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=";


const moiveBox = document.querySelector("#movie-box")

const get_movies = async (url) => {
    const response = await fetch(url)
    const data = await response.json()
    showdata_movies(data)
}
//get_series(APIURL_Series);
//get_movies(APIURL_Movies);

function hButton(id)
{  
    genre_movies("https://api.themoviedb.org/3/movie/"+id+"?api_key=04c35731a5ee918f014970082a0088b1&language=en-US")
}

  



const genre_movies = async (url) => {
    const response = await fetch(url)
    const data = await response.json()
    home_movies.innerHTML="";
    moiveBox.innerHTML = "";
    webrecm.innerHTML = "";
    recom_title.innerHTML="";
    main_card.innerHTML = "";
    cast_disp.innerHTML="";
    cast_title.innerHTML = "";
    const imagePath = data.backdrop_path === null ? "img/image-missing.jpg" : IMGPATH_Movies + data.poster_path;
    const box = document.createElement("div");
    let year =  data.release_date;
    let rel_year = year.substring(0, 4);
    var genre =data.genres[0].name;
    for(let i=1;i<2;i++)
        genre=genre+ "|"+ data.genres[i].name ;
    box.classList.add("card")
    box.innerHTML = `
    <div class="card-thumbnail">
    <img src=${imagePath} alt="" onerror="this.onerror=null;this.src='image-missing.jpg';" >
</div>
<div class="card-body">
    <b><span class="card_title" name="title">${data.title}</span></b>
    <p>
        <span class="inf1">${rel_year}</span> 
        <span class="inf1">${data.runtime}min</span> 
        <span class="inf1">${data.genres[0].name}</span>
    </p>  
<p class="card-description">${truncate(data.overview,300)}</p>
</div>
            `
        main_card.appendChild(box)
        card_info.innerHTML = "";
        const box1 = document.createElement("div");
        box1.classList.add("tag_ln")
        if(data!=null)
            box1.innerHTML = `
        <div class="tag_ln_div">
            <b><span class="tag_ln_txt">${data.tagline}</span></b>
        </div>
        `
        card_info.appendChild(box1)
        cast_info(`https://api.themoviedb.org/3/movie/${data.id}/credits?api_key=04c35731a5ee918f014970082a0088b1&language=en-US`)
        recom_movies(`https://api.themoviedb.org/3/movie/${data.id}/recommendations?api_key=04c35731a5ee918f014970082a0088b1&language=en-US&page=1`)
}

const cast_info = async (url) => {
    const response = await fetch(url)
    const data = await response.json()
    cast_title.innerHTML = "Star Cast";
    cast_disp.innerHTML="";
  
    for(let i=0;i<10;i++)
    {
        const imagePath = data.cast[i].profile_path === null ? "image-missing.jpg" : "https://image.tmdb.org/t/p/w1280" + data.cast[i].profile_path;
        const box = document.createElement("div");
        box.classList.add("swiper-slide")
        if(data.cast[i].known_for_department=="Acting"){
            box.innerHTML = `
            <img class="movie-list-item-img" src=${imagePath} alt="" onerror="this.onerror=null;this.src='image-missing.jpg';">
            <span class="movie-list-item-title">${data.cast[i].original_name}</span>
        `
        }
        else{
            box.innerHTML = `
            <img class="movie-list-item-img" src=${imagePath} alt="" onerror="this.onerror=null;this.src='image-missing.jpg';">
            <span class="movie-list-item-title">${data.cast[i].known_for_department}</span>
        `
        }
        cast_disp.appendChild(box)
    }
}



const showdata_movies = (data) => {
    
    moiveBox.innerHTML = "";
    main_card.innerHTML = "";
    card_info.innerHTML = "";
    webrecm.innerHTML = "";
    recom_title.innerHTML="";
    cast_disp.innerHTML="";
    cast_title.innerHTML = "";
    data.results.forEach(
        (result) => {
            const imagePath = result.poster_path === null ? "img/image-missing.jpg" : IMGPATH_Movies + result.poster_path;
            const box = document.createElement("div");
            let year =  result.release_date;
            let rel_year = year .substring(0, 4);
            box.classList.add("box")
            box.innerHTML = `
            <form action="/search" method="post">
            <img src="${imagePath}" alt="" 
            onerror="this.onerror=null;this.src='image-missing.jpg';"
            onclick= genre_movies("https://api.themoviedb.org/3/movie/"+${result.id}+"?api_key=04c35731a5ee918f014970082a0088b1&language=en-US")/>
            <div class="overlay" 
            onclick= genre_movies("https://api.themoviedb.org/3/movie/"+${result.id}+"?api_key=04c35731a5ee918f014970082a0088b1&language=en-US")>
                <div class="title"> 
                    <h4 class="box_inf1" > ${result.title}  </h4>
                    <h4 class="box_inf1" >Rating: ${result.vote_average} </h4>
                </div>  
            </div>
            <button type="submit" onclick= genre_movies("https://api.themoviedb.org/3/movie/"+${result.id}+"?api_key=04c35731a5ee918f014970082a0088b1&language=en-US")>Search</button>
            `
            moiveBox.appendChild(box)
        }
    )
}



const recom_movies = async (url) =>{
    const response = await fetch(url)
    const data = await response.json()
    moiveBox.innerHTML = "";
    webrecm.innerHTML = "";
    if(data.results.length!=0)
        recom_title.innerHTML=`
        <b><h1 class="recom_tg" >Movies You Might Like</h1></b>
            `;
    data.results.forEach(
        (result) => {
            const imagePath = result.poster_path === null ? "img/image-missing.jpg" : IMGPATH_Movies + result.poster_path;
            const box = document.createElement("div");
            let year =  result.release_date;
            let rel_year = year .substring(0, 4);
            box.classList.add("box")
            box.innerHTML = `
            <img src="${imagePath}" alt="" 
            onerror="this.onerror=null;this.src='image-missing.jpg';"
            onclick= genre_movies("https://api.themoviedb.org/3/movie/"+${result.id}+"?api_key=04c35731a5ee918f014970082a0088b1&language=en-US")/>
            <div class="overlay" 
            onclick= genre_movies("https://api.themoviedb.org/3/movie/"+${result.id}+"?api_key=04c35731a5ee918f014970082a0088b1&language=en-US")>
                <div class="title"> 
                    <h4 class="box_inf1" > ${result.title}  </h4>
                    <h4 class="box_inf1" >Rating: ${result.vote_average} </h4>
                </div>
                
            </div>
            `
            webrecm.appendChild(box)
        }
    )
}

const container_mov1 = async (url) =>{
    const response = await fetch(url)
    const data = await response.json()
    data.results.forEach(
        (result) => {
            const imagePath = result.poster_path === null ? "image-missing.jpg" : "https://image.tmdb.org/t/p/w1280" + result.poster_path;
            const box = document.createElement("div");
            box.classList.add("swiper-slide")
            box.innerHTML = `
            <img class="movie-list-item-img" src=${imagePath} alt=""
            onerror="this.onerror=null;this.src='image-missing.jpg';"
            onclick= genre_movies("https://api.themoviedb.org/3/movie/"+${result.id}+"?api_key=04c35731a5ee918f014970082a0088b1&language=en-US")>
            <span class="movie-list-item-title">${result.title}</span>
            
            `
            movies_list1.appendChild(box)
        }
    )
}
container_mov1(`https://api.themoviedb.org/4/discover/movie?api_key=04c35731a5ee918f014970082a0088b1&with_networks=213&page=${getRandomInt(10)}&watch_region=india`)

const  container_mov2= async (url) =>{
  const response = await fetch(url)
  const data = await response.json()
  data.results.forEach(
      (result) => {
          const imagePath = result.poster_path === null ? "image-missing.jpg" : "https://image.tmdb.org/t/p/w1280" + result.poster_path;
          const box = document.createElement("div");
          box.classList.add("swiper-slide")
          box.innerHTML = `
          <img class="movie-list-item-img" src=${imagePath} alt=""
          onerror="this.onerror=null;this.src='image-missing.jpg';"
          onclick= genre_movies("https://api.themoviedb.org/3/movie/"+${result.id}+"?api_key=04c35731a5ee918f014970082a0088b1&language=en-US")>
          <span class="movie-list-item-title">${result.title}</span>
              
          `
          movies_list2.appendChild(box)
      }
  )
}
container_mov2(`https://api.themoviedb.org/3/discover/movie?api_key=04c35731a5ee918f014970082a0088b1&with_genres=27`)

const container_mov3 = async (url) =>{
  const response = await fetch(url)
  const data = await response.json()
  data.results.forEach(
      (result) => {
          const imagePath = result.poster_path === null ? "image-missing.jpg" : "https://image.tmdb.org/t/p/w1280" + result.poster_path;
          const box = document.createElement("div");
          box.classList.add("swiper-slide")
          box.innerHTML = `
          <img class="movie-list-item-img" src=${imagePath} alt=""
          onerror="this.onerror=null;this.src='image-missing.jpg';"
          onclick= genre_movies("https://api.themoviedb.org/3/movie/"+${result.id}+"?api_key=04c35731a5ee918f014970082a0088b1&language=en-US")>
          <span class="movie-list-item-title">${result.title}</span>
              
          `
          movies_list3.appendChild(box)
      }
  )
}
container_mov3(`https://api.themoviedb.org/3/discover/movie?api_key=04c35731a5ee918f014970082a0088b1&with_genres=35`)

const container_mov4 = async (url) =>{
  const response = await fetch(url)
  const data = await response.json()
  data.results.forEach(
      (result) => {
          const imagePath = result.poster_path === null ? "image-missing.jpg" : "https://image.tmdb.org/t/p/w1280" + result.poster_path;
          const box = document.createElement("div");
          box.classList.add("swiper-slide")
          box.innerHTML = `
          <img class="movie-list-item-img" src=${imagePath} alt=""
          onerror="this.onerror=null;this.src='image-missing.jpg';"
          onclick= genre_movies("https://api.themoviedb.org/3/movie/"+${result.id}+"?api_key=04c35731a5ee918f014970082a0088b1&language=en-US")>
          <span class="movie-list-item-title">${result.title}</span>
              
          `
          movies_list4.appendChild(box)
      }
  )
}
container_mov4(`https://api.themoviedb.org/3/movie/now_playing?api_key=04c35731a5ee918f014970082a0088b1&language=en-US&page=${getRandomInt(15)}`)
const container_mov5 = async (url) =>{
    const response = await fetch(url)
    const data = await response.json()
    data.results.forEach(
        (result) => {
            const imagePath = result.poster_path === null ? "image-missing.jpg" : "https://image.tmdb.org/t/p/w1280" + result.poster_path;
            const box = document.createElement("div");
            box.classList.add("swiper-slide")
            box.innerHTML = `
            <img class="movie-list-item-img" src=${imagePath} alt=""
            onerror="this.onerror=null;this.src='image-missing.jpg';"
            onclick= genre_movies("https://api.themoviedb.org/3/movie/"+${result.id}+"?api_key=04c35731a5ee918f014970082a0088b1&language=en-US")>
            <span class="movie-list-item-title">${result.title}</span>
                
            `
            movies_list5.appendChild(box)
        }
    )
  }
  container_mov5(`https://api.themoviedb.org/3/discover/movie?api_key=04c35731a5ee918f014970082a0088b1&with_genres=28`)
  const container_mov6 = async (url) =>{
    const response = await fetch(url)
    const data = await response.json()
    data.results.forEach(
        (result) => {
            const imagePath = result.poster_path === null ? "image-missing.jpg" : "https://image.tmdb.org/t/p/w1280" + result.poster_path;
            const box = document.createElement("div");
            box.classList.add("swiper-slide")
            box.innerHTML = `
            <img class="movie-list-item-img" src=${imagePath} alt=""
            onerror="this.onerror=null;this.src='image-missing.jpg';"
            onclick= genre_movies("https://api.themoviedb.org/3/movie/"+${result.id}+"?api_key=04c35731a5ee918f014970082a0088b1&language=en-US")>
            <span class="movie-list-item-title">${result.title}</span>
                
            `
            movies_list_amaz.appendChild(box)
        }
    )
  }
  container_mov6(`https://api.themoviedb.org/4/discover/movie?api_key=04c35731a5ee918f014970082a0088b1&with_networks=1024&page=${getRandomInt(10)}&watch_region=india`)


document.querySelector("#search-navbar").addEventListener(
    "keyup",
    function (event) {
        if (event.target.value != "") {
            get_movies(SEARCHAPI_Movies + event.target.value)
            home_movies.innerHTML="";
        } else {
            get_movies(APIURL_Movies);
        }
    }
)
document.querySelector("#mytext").addEventListener(
    "keyup",
    function (event) {
        if (event.target.value != "") {
            get_movies(SEARCHAPI_Movies + event.target.value)
            home_movies.innerHTML="";
        } else {
            get_movies(APIURL_Movies);
        }
    }
)


function call() 
    {
        var text = document.getElementById("movid");
        text = text.innerHTML;
        genre_movies("https://api.themoviedb.org/3/movie/"+parseInt(text)+"?api_key=04c35731a5ee918f014970082a0088b1&language=en-US")
        console.log("https://api.themoviedb.org/3/movie/"+parseInt(text)+"?api_key=04c35731a5ee918f014970082a0088b1&language=en-US")
    }

    