let suggestions = [];
fetch("./js/recom_mov.json")
            .then(function(resp)
            {
                return resp.json();
            })
            .then(function(data){
                
                var count =0;
                for(let i=0;i<=4805;i++)
                {
                    suggestions[count]=String(data.title[i]); 
                    count++;
                }     
            });

