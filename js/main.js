//125e9728090f480397e175014240201   API_KEY
//http://api.weatherapi.com/v1/current.json    base_url
//https://api.weatherapi.com/v1/forecast.json?key=125e9728090f480397e175014240201&q=lond&days=3
const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
const month= ["January","February","March","April","May","June","July",
            "August","September","October","November","December"];
var searchInput=document.querySelector("input");
searchInput.addEventListener("input",function(){
    
    if(this.value.length >= 3){
       getData(this.value)

    }
})
//125e9728090f480397e175014240201
getData('cairo'); 
async function getData(city){
    let data=await fetch(`http://api.weatherapi.com/v1/forecast.json?key=125e9728090f480397e175014240201&q=${city}&days=3`);
    let weather= await data.json()
    displayWeather(weather);
}

function displayWeather(weather){
    var cartona=
    `
    <div class="card card1 border-0">
        <div class="card-footer d-flex justify-content-between ">
            <small class="text-white-50 d-block ">${weekday[new Date(weather.forecast.forecastday[0].date).getDay().toString()]}</small>
            <small class="text-white-50 d-block">${new Date(weather.forecast.forecastday[0].date).getDay().toString()} ${month[new Date(weather.forecast.forecastday[0].date).getMonth().toString()]}</small>
        </div>
        <div class="card-body">
            <h5 class="card-title text-white">${weather.location.name}</h5>
            <p class="degree h1 text-white">${weather.current.temp_c}<sup>o</sup>C <img src="${weather.current.condition.icon}" alt="" class="w-25"></p>
            <p class="text-info">${weather.current.condition.text}</p>
            <i class="fa-solid fa-umbrella"> <span>${weather.current.cloud} %</span></i>
            <i class="fa-solid fa-wind"> <span>${weather.current.wind_kph} km / h</span></i>
            <i class="fa-regular fa-compass"><span>${ (weather.current.wind_dir == 'W') ? 'West' : 'East'}</span></i>
        </div>
    </div>

    <div class="card card2 border-0">
        <div class="card-footer d-flex justify-content-between ">
        <small class="text-white-50 d-block mx-auto ">${weekday[new Date(weather.forecast.forecastday[1].date).getDay().toString()]}</small>
        </div>
        <div class="card-body text-center">
            <img src="${weather.forecast.forecastday[1].day.condition.icon}" alt="" class="w-25">
            <p class="degree h1 text-white">${weather.forecast.forecastday[1].day.maxtemp_c}<sup>o</sup>C </p>
            <span class="text-white-50">${weather.forecast.forecastday[1].day.mintemp_c}<sup>o</sup>C</span>
            <p class="text-info">${weather.forecast.forecastday[1].day.condition.text}</p>
        </div>
    </div>

    <div class="card card1 border-0">
        <div class="card-footer d-flex justify-content-between ">
            <small class="text-white-50 d-block mx-auto ">${weekday[new Date(weather.forecast.forecastday[2].date).getDay().toString()]}</small>
        </div>
        <div class="card-body text-center">
        <img src="${weather.forecast.forecastday[2].day.condition.icon}" alt="" class="w-25">
        <p class="degree h1 text-white">${weather.forecast.forecastday[2].day.maxtemp_c}<sup>o</sup>C </p>
        <span class="text-white-50">${weather.forecast.forecastday[2].day.mintemp_c}<sup>o</sup>C</span>
        <p class="text-info">${weather.forecast.forecastday[2].day.condition.text}</p>
        </div>
    </div>
    `;
    document.querySelector('.card-group').innerHTML=cartona;
}