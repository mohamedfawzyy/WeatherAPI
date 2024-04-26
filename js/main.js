//APIKey:e73a02e0a14a473cacd95558242504
let baseURL=" https://api.weatherapi.com/v1";
let endPoint="/forecast.json";
let APIKey="Key=e73a02e0a14a473cacd95558242504";
let city="Cairo"
let data;
let LocationElement=document.querySelector('.location p');
let DateElement=document.querySelector('.date p');
let weatherPhoto=document.querySelector('.weatherPhoto img');
let TempDegree=document.querySelector('h1 span');
let MaxDegree=document.querySelector('span.MaxDegree');
let MinDegree=document.querySelector('span.MinDegree');
let Humadity=document.querySelector('#Humadity p');
let WindDirection=document.querySelector('#directionWind p');
let WindSpeed=document.querySelector('#WindSpeed p');
let Today=document.querySelector('#today h6');
let Tommorow=document.querySelector('#tommorow h6');
let DayAfterTommorow=document.querySelector('#dayafterTommorow h6');
let InputSearch=document.querySelector("input");

async function getWeather(endPoint,city){
   
    let request=await fetch(`${baseURL}${endPoint}?${APIKey}&q=${city}&days=3`);
   
    data=await request.json();
    data=data.length?data[0]:data;
   
}
//self invoked function for getting data
(async function(){
    await getWeather(endPoint,city);
    DisplayWeatherData();
})();

//change weather photo according to temp degree
function getPhotoBasedOnDegree(temp){
    let src='';
    switch(true){
        case (temp < 20):
            src='../images/rainy.png'
            break;
        case (temp >= 20 && temp <= 27):
            src='../images/sunnywithclouds.png'
            break;
        default:
            src='../images/sunny.png'
            break;    
    }
    return src;
}
//set background according to time 
function SetSuitableBackGround(hour){
    if(hour >= 6 && hour <=18){
        
        document.querySelector('.container').style.backgroundImage='url("../images/daygif.gif")';
    }else
    {
        document.querySelector('.container').style.backgroundImage='url("../images/nightgif.gif")';
    }

}
//listener on input
InputSearch.addEventListener('keyup',async function(){
    
  
    let request=await fetch(`${baseURL}/search.json?${APIKey}&q=${this.value}`);
    let data=await request.json();
    await getWeather(endPoint,data[0].region);
    DisplayWeatherData();
})
//display weather data function
function DisplayWeatherData()
{
    LocationElement.innerHTML=`${data.location.name},${data.location.country}`;
    DateElement.innerHTML=`${new Date(data.location.localtime).toDateString().split(" ")}`
    SetSuitableBackGround(new Date(data.location.localtime).toTimeString().split(":")[0]);
    let src=getPhotoBasedOnDegree(data.current.temp_c);
    weatherPhoto.setAttribute('src',src);
    TempDegree.innerHTML=data.current.temp_c;
    MaxDegree.innerHTML=data.forecast.forecastday[0].day.maxtemp_c;
    MinDegree.innerHTML=data.forecast.forecastday[0].day.mintemp_c;
    Humadity.innerHTML=data.current.humidity+'%';
    WindDirection.innerHTML=data.current.wind_dir;
    WindSpeed.innerHTML=data.current.wind_kph+'KPH';
    Today.innerHTML=data.forecast.forecastday[0].day.avgtemp_c+'°C';
    Tommorow.innerHTML=data.forecast.forecastday[1].day.avgtemp_c+'°C';
    DayAfterTommorow.innerHTML=data.forecast.forecastday[2].day.avgtemp_c+'°C';
}
