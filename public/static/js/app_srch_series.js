function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

  function truncate(str, n) {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  }



const APIURL_Series =
    `https://api.themoviedb.org/3/trending/tv/week?api_key=04c35731a5ee918f014970082a0088b1&page=${getRandomInt(17)}`;
const IMGPATH_Series = "https://image.tmdb.org/t/p/w1280";
const SEARCHAPI_Series =
    "https://api.themoviedb.org/3/search/tv?&api_key=04c35731a5ee918f014970082a0088b1&query=";

const get_series = async (url) => {
    const response = await fetch(url)
    const data = await response.json()
    showdata_series(data)
}

//get_series(APIURL_Series);
//get_movies(APIURL_Movies);

function hButton(id)
{  
    genre_series("https://api.themoviedb.org/3/tv/"+id+"?api_key=04c35731a5ee918f014970082a0088b1&language=en-US")
}

  

const genre_series = async (url) => {
    const response = await fetch(url)
    const data = await response.json()
    home_series.innerHTML="";
    series_box.innerHTML = "";
    recom_ser.innerHTML = "";
    recom_title_series.innerHTML="";
    main_card_series.innerHTML = "";
    cast_title.innerHTML = "";
    cast_disp.innerHTML="";
    const imagePath = data.backdrop_path === null ? "img/image-missing.jpg" : IMGPATH_Series + data.poster_path;
    const box = document.createElement("div");
    let year =  data.first_air_date;
    let rel_year = year .substring(0, 4);
    box.classList.add("card")
    box.innerHTML = `
    <div class="card-thumbnail">
        <img src=${imagePath} alt="" onerror="this.onerror=null;this.src='image-missing.jpg';" >
    </div>
    <div class="card-body">
        <b><span class="card_title">${data.name}</span></b>
        <p>
            <span class="inf1">${rel_year}</span> 
            <span class="inf1">${data.episode_run_time[0]}min</span> 
            <span class="inf1">${data.genres[0].name}</span>
        </p>  
    <p class="card-description">${truncate(data.overview,250)}</p>
  </div>
            `
        main_card_series.appendChild(box)
        card_info_series.innerHTML = "";
        const box1 = document.createElement("div");
        box1.classList.add("tag_ln")
        if(data!=null)
            	box1.innerHTML = `
        <div class="tag_ln_div">
            <b><span class="tag_ln_txt">${data.tagline}</span></b>
        </div> 
        `
        card_info_series.appendChild(box1)
        cast_info(`https://api.themoviedb.org/3/tv/${data.id}/credits?api_key=04c35731a5ee918f014970082a0088b1&language=en-US`)
        recom_series(`https://api.themoviedb.org/3/tv/${data.id}/recommendations?api_key=04c35731a5ee918f014970082a0088b1&language=en-US&page=1`)
}

const cast_info = async (url) => {
    const response = await fetch(url)
    const data = await response.json()
    if(data.cast.length!=0)
        cast_title.innerHTML = "Star Cast";
    cast_disp.innerHTML="";
    for(let i=0;i<20;i++)
    {
        const imagePath = data.cast[i].profile_path === null ? "image-missing.jpg" : "https://image.tmdb.org/t/p/w1280" + data.cast[i].profile_path;
        const box = document.createElement("div");
        box.classList.add("swiper-slide")
        if(data.cast[i].known_for_department=="Acting"){
            box.innerHTML = `
            <img class="movie-list-item-img" src=${imagePath} alt="" onerror="this.onerror=null;this.src='image-missing.jpg';">
            <span class="movie-list-item-title">${data.cast[i].character}</span>
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

const showdata_series = (data) => 
{
    series_box.innerHTML = "";
    main_card_series.innerHTML = "";
    card_info_series.innerHTML = "";
    recom_ser.innerHTML = "";
    recom_title_series.innerHTML="";
    cast_title.innerHTML = "";
    cast_disp.innerHTML="";
    data.results.forEach(
        (result) => {
            const imagePath = result.poster_path === null ? "img/image-missing.jpg" : IMGPATH_Series + result.poster_path;
            const box = document.createElement("div");
            box.classList.add("box")
            box.innerHTML = `
            <img src="${imagePath}" alt="" 
            onclick= genre_series("https://api.themoviedb.org/3/tv/"+${result.id}+"?api_key=04c35731a5ee918f014970082a0088b1&language=en-US")/>
            <div class="overlay" 
            onclick= genre_series("https://api.themoviedb.org/3/tv/"+${result.id}+"?api_key=04c35731a5ee918f014970082a0088b1&language=en-US")>
                <div class="title"> 
                    <h4 class="box_inf1" > ${result.name}  </h4>
                    <h4 class="box_inf1" >Rating: ${result.vote_average} </h4>
                </div>
                
            </div>
            `
            series_box.appendChild(box)
        }
    )
}


const recom_series = async (url) =>{
    const response = await fetch(url)
    const data = await response.json()
    series_box.innerHTML = "";
    recom_ser.innerHTML = "";
    if(data.results.length!=0)
    recom_title_series.innerHTML=`
        <b><h1 class="recom_tg" >TV shows You Might Like</h1></b>
                                                                                                `;
    data.results.forEach(
        (result) => {
            const imagePath = result.poster_path === null ? "img/image-missing.jpg" : IMGPATH_Series + result.poster_path;
            const box = document.createElement("div");
            let year =  result.first_air_date;
            let rel_year = year .substring(0, 4);
            box.classList.add("box")
            box.innerHTML = `
                <img src="${imagePath}" alt="" 
                onerror="this.onerror=null;this.src='image-missing.jpg';"
                onclick= genre_series("https://api.themoviedb.org/3/tv/"+${result.id}+"?api_key=04c35731a5ee918f014970082a0088b1&language=en-US")/>
                <div class="overlay" 
                onclick= genre_series("https://api.themoviedb.org/3/tv/"+${result.id}+"?api_key=04c35731a5ee918f014970082a0088b1&language=en-US")>
                    <div class="title"> 
                        <h4 class="box_inf1" > ${result.name}  </h4>
                        <h4 class="box_inf1" >Rating: ${result.vote_average} </h4>
                    </div>
                    
                </div>
            `
            recom_ser.appendChild(box)
        }
    )
}



const container_series1 = async (url) =>{
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
              onclick= genre_series("https://api.themoviedb.org/3/tv/"+${result.id}+"?api_key=04c35731a5ee918f014970082a0088b1&language=en-US")>
              <span class="movie-list-item-title">${result.name}</span>
              
          `
          series_list3.appendChild(box)
      }
  )
}
container_series1(`https://api.themoviedb.org/3/tv/top_rated?api_key=04c35731a5ee918f014970082a0088b1&language=en-US&page=${getRandomInt(10)}`)

const container_series2 = async (url) =>{
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
            onclick= genre_series("https://api.themoviedb.org/3/tv/"+${result.id}+"?api_key=04c35731a5ee918f014970082a0088b1&language=en-US")>
            <span class="movie-list-item-title">${result.name}</span>
            
        `
        series_list2.appendChild(box)
    }
)
}
container_series2(`https://api.themoviedb.org/3/discover/movie?api_key=04c35731a5ee918f014970082a0088b1&with_genres=35`)

const container_series3 = async (url) =>{
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
            onclick= genre_series("https://api.themoviedb.org/3/tv/"+${result.id}+"?api_key=04c35731a5ee918f014970082a0088b1&language=en-US")>
            <span class="movie-list-item-title">${result.name}</span>
            
        `
        series_list.appendChild(box)
    }
)
}
container_series3(`https://api.themoviedb.org/3/tv/popular?api_key=04c35731a5ee918f014970082a0088b1&language=en-US&page=${getRandomInt(20)}`)

const container_series4 = async (url) =>{
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
            onclick= genre_series("https://api.themoviedb.org/3/tv/"+${result.id}+"?api_key=04c35731a5ee918f014970082a0088b1&language=en-US")>
            <span class="movie-list-item-title">${result.name}</span>
            
        `
        series_list4.appendChild(box)
    }
)
}
container_series4(`https://api.themoviedb.org/3/discover/movie?api_key=04c35731a5ee918f014970082a0088b1&with_genres=27`)

const container_series5 = async (url) =>{
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
                onclick= genre_series("https://api.themoviedb.org/3/tv/"+${result.id}+"?api_key=04c35731a5ee918f014970082a0088b1&language=en-US")>
                <span class="movie-list-item-title">${result.name}</span>
                
            `
            series_list_netf.appendChild(box)
        }
    )
    }
    container_series5(`https://api.themoviedb.org/4/discover/tv?api_key=04c35731a5ee918f014970082a0088b1&with_networks=213&page=${getRandomInt(10)}&watch_region=india`)
    const container_series6 = async (url) =>{
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
                    onclick= genre_series("https://api.themoviedb.org/3/tv/"+${result.id}+"?api_key=04c35731a5ee918f014970082a0088b1&language=en-US")>
                    <span class="movie-list-item-title">${result.name}</span>
                    
                `
                series_list_amazf.appendChild(box)
            }
        )
        }
        container_series6(`https://api.themoviedb.org/4/discover/tv?api_key=04c35731a5ee918f014970082a0088b1&with_networks=1024&page=${getRandomInt(10)}&watch_region=india`)
        const container_series7 = async (url) =>{
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
                        onclick= genre_series("https://api.themoviedb.org/3/tv/"+${result.id}+"?api_key=04c35731a5ee918f014970082a0088b1&language=en-US")>
                        <span class="movie-list-item-title">${result.name}</span>
                        
                    `
                    series_list_hotstarf.appendChild(box)
                }
            )
            }
            container_series7(`https://api.themoviedb.org/3/discover/tv?api_key=04c35731a5ee918f014970082a0088b1&with_networks=3919`)
        

document.querySelector("#search-navbar").addEventListener(
    "keyup",
    function (event) {
        if (event.target.value != "") 
        {
            get_series(SEARCHAPI_Series + event.target.value)
            home_series.innerHTML="";
        } else {
            get_series(APIURL_Series);
        }
    }
)
document.querySelector("#mytext").addEventListener(
    "keyup",
    function (event) {
        if (event.target.value != "") 
        {
            get_series(SEARCHAPI_Series + event.target.value)
            home_series.innerHTML="";
        } else {
            get_series(APIURL_Series);
        }
    }
)

function call() 
    {
        var text = document.getElementById("movid");
        text = text.innerHTML;
        genre_series("https://api.themoviedb.org/3/tv/"+parseInt(text)+"?api_key=04c35731a5ee918f014970082a0088b1&language=en-US")
        console.log("https://api.themoviedb.org/3/tv/"+parseInt(text)+"?api_key=04c35731a5ee918f014970082a0088b1&language=en-US")
    }