const IMGPATH_Movies = "https://image.tmdb.org/t/p/w1280";
const APIURL =
    "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=7";
const IMGPATH = "https://image.tmdb.org/t/p/w1280";
const SEARCHAPI =
    "https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=";
const moiveBox = document.querySelector("#movie_box")

function truncate(str, n) {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  }
    document.getElementById("mybutton").onclick = function()
    {
        var mytext = document.getElementById("mytext").value;
        moiveBox.innerHTML="";
        
        fetch("./js/recom_mov.json")
            .then(function(resp)
            {
                return resp.json();
            })
            .then(function(data){
                for(let i=0;i<=4805;i++)
                {
                    if(data.title[i]==mytext)
                    {
                        genre_movies("https://api.themoviedb.org/3/movie/"+data.movie_id[i]+"?api_key=04c35731a5ee918f014970082a0088b1&language=en-US")
                        return parse_arr(data.rec_id[i]);
                    }
                }
            });
    }
    
    function parse_arr(params)
    {
        var ids = new Array(10);
        var count =0;
        for(let i=0;i<params.length;i++)
        {
            var x = " ";
            while(params[i]!='/')
            {
                x=x+params[i];
                i++;
            }
            ids[count]=parseInt(x);
            count++;
        }
        for(let i=0;i<ids.length;i++)
        {
            call_mov("https://api.themoviedb.org/3/movie/"+ids[i]+"?api_key=04c35731a5ee918f014970082a0088b1&language=en-US")
        }
    }
    

    const call_mov = async (url) => {
        const response = await fetch(url)
        const data = await response.json()
        if(data!=null)
            rcmhead.innerHTML=`<h1 id="rcmhead_txt">RECOMMENDATIONS</h1>`;
        const imagePath = data.backdrop_path === null ? "img/image-missing.png" : "https://image.tmdb.org/t/p/w1280" + data.poster_path;
        const box = document.createElement("div");
        let year =  data.release_date;
        let rel_year = year .substring(0, 4);
        box.classList.add("box");
        box.innerHTML = `
        <img src="${imagePath}" alt="" 
        onclick= genre_movies("https://api.themoviedb.org/3/movie/"+${data.id}+"?api_key=04c35731a5ee918f014970082a0088b1&language=en-US")/>
        <div class="overlay" 
        onclick= genre_movies("https://api.themoviedb.org/3/movie/"+${data.id}+"?api_key=04c35731a5ee918f014970082a0088b1&language=en-US")>
            <div class="title"> 
                <h4 class="box_inf1" > ${data.title}  </h4>
                <h4 class="box_inf1" >Rating: ${data.vote_average} </h4>
            </div>  
        </div>
    `
    moiveBox.appendChild(box)
        
    }

    
const genre_movies = async (url) => {
    const response = await fetch(url)
    const data = await response.json()
    card_info.innerHTML="";
    main_card.innerHTML = "";
    moiveBox.innerHTML="";
    rcmhead.innerHTML="";
    const imagePath = data.backdrop_path === null ? "img/image-missing.png" : IMGPATH_Movies + data.poster_path;
    const box = document.createElement("div");
    let year =  data.release_date;
    let rel_year = year .substring(0, 4);
    box.classList.add("card")
    box.innerHTML = `
    <div class="card-thumbnail">
        <img src=${imagePath} alt="">
    </div>
    <div class="card-body">
        <span class="card_title">${data.original_title}</span>
        <p>
            <span>${rel_year}</span> 
            <span>${data.runtime}min</span> 
            <span>${data.genres[0].name}</span>
        </p>  
    <p class="card-description">${truncate(data.overview,150)}</p>
  </div>
            `
        main_card.appendChild(box)
        card_info.innerHTML = "";
        const box1 = document.createElement("div");
        box1.classList.add("tag_ln")
        box1.innerHTML = `
        <div >
            <p id="ln_txt">${data.tagline}</p>
        </div>`
        card_info.appendChild(box1)
}
    