// Example: https://s3-us-west-2.amazonaws.com/s.cdpn.io/266205/San_Francisco.json

// Mock: https://www.dropbox.com/s/1t21mnbkudc7mzh/Weather-mock-2.png?dl=0

/**
 * Created by sgandhi on 10/24/16.
 */


var base_path = "https://s3-us-west-2.amazonaws.com/s.cdpn.io/266205/";
var mainCard;
var weatherCards;
var listing;
var innerDiv;
var para1;
//combining paramteres to get requeste URL
function getIndCity(cities){
    for(var i=0;i<cities.length;i++){
        var newAPI = base_path+cities[i]+".json";
        getData(newAPI);

    }
}
getIndCity([
    "San_Francisco",
    "Miami",
    "New_Orleans",
    "Chicago",
    "New_York_City"
])
//api calling and getting data
function getData(newAPICreated){
    var apiLink = newAPICreated;
    console.log(apiLink);

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange=function(){
        if(this.readyState==4&&this.status==200){
            var citiData = this.responseText;
            citiData= JSON.parse(citiData)
            //console.log(citiData);
            mainCard = document.createElement('section');
            mainCard.className = 'weather clearfix';
            var speed = citiData.wind.speed;
            fromMPStoMPH(speed);
            var weatherMain = citiData.weather[0].main;
            weatherCards = document.createElement('ul');
            weatherCards.className = "weather-cards";
            mainCard.appendChild(weatherCards);
            listing = document.createElement("li");
            weatherCards.appendChild(listing);
            var city = document.createElement("h2");
            var cityName = document.createTextNode(citiData.name);
            city.appendChild(cityName);
            listing.appendChild(city);
            var temp = citiData.main.temp;
            convertKtoF(temp);
            var icon = citiData.weather[0].icon;
            getIconURL(icon, weatherMain);


        }
    }//end of call and calling subsequent function
    xhttp.open("GET",apiLink,true);
    xhttp.send();
}
// Convert from Meters Per Second to Miles Per Hour



// Convert from Kelvins to Fahrenheit
function convertKtoF(kelvin) {
    innerDiv = document.createElement('div');
    var para = document.createElement('p');
    var temp = Math.round((kelvin - 273.15) * 1.8) + "&deg"
    var info = document.createTextNode(temp);
    para.appendChild(info);
    innerDiv.appendChild(para);
    listing.appendChild(innerDiv);
}

function fromMPStoMPH(mps) {
    para1 = document.createElement('p');
    var textNode = document.createTextNode((Math.round(10 * mps * 2.2369362920544) / 10) + " mph");
    para1.appendChild(textNode);
    //innerDiv.appendChild(para1);
    console.log(mps);
}

// Weather icon
function getIconURL(icon,weatherMain) {
    var para = document.createElement('p');
    var span = document.createElement('span');
    var imgTag = document.createElement("img");
    imgTag.src = "http://openweathermap.org/img/w/" + icon + ".png"
    span.appendChild(imgTag);
    para.appendChild(span);
    var span1 = document.createElement('span');
    var text1 = document.createTextNode(weatherMain)
    span1.appendChild(text1);
    para.appendChild(span1);
    para.appendChild(para1);
    innerDiv.appendChild(para);
    document.body.appendChild(mainCard);
}
