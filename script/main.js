let start = 0;
let httpRequest = new XMLHttpRequest();
let defaultSize = 50;

httpRequest.addEventListener("load",function(e){
	 console.log("received");
     parseAndDisplay(e.target.response);
});


function getTrendingGIF (offset){
    let trendURL = "api.giphy.com/v1/gifs/trending";
    const myAPIKey = secretKey;
    httpRequest.open("GET","https://"+trendURL+"?offset="+offset+"&api_key="+myAPIKey+"&limit="+defaultSize);
    httpRequest.send();

}

function parseAndDisplay(data){
    let outputContainer = document.querySelector(".container");
	let times = 0;
    let parsed = JSON.parse(data).data;
    parsed.forEach(function(obj){
        setTimeout( function () {
            let imageUrl = obj.images.original.url;
            console.log(imageUrl);
            let image = "<img src=\"" + imageUrl + "\" alt=\""+obj.title+"\">";
            let externalLink = "<a href=\"" +imageUrl +"\" target=\"_blank\">" + image + "</a>";
            outputContainer.innerHTML = externalLink;
        },times*5500);
        times++;
    });
    start += defaultSize;
    if (start < 4999)
        setTimeout(function(){getTrendingGIF(start+1);},times*5500);

}

// Program start point
getTrendingGIF(start);

