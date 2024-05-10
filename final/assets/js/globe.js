//function to go to the midpoint between two cities and display an arc between them
function changeCity(citySelect) {
    city = citySelect.value;

    document.getElementById("leftContainer").classList.remove("leftShow");
    document.getElementById("rightContainer").classList.remove("rightShow");
    if(currentCity == ""){
        myGlobe.pointOfView({"lat": CITY_COORDINATES[city]["lat"], "lng": CITY_COORDINATES[city]["lng"], "altitude": 2},  4000);
        return;
    }
    if(city == currentCity){
        goToCity();
        return;
    }
    povCoords = getMidPoint(currentCity, city);
    console.log(povCoords);

    //update globe to show arc between cities
    myGlobe
        .arcsData([{startLat: CITY_COORDINATES[currentCity].lat, startLng: CITY_COORDINATES[currentCity].lng, endLat: CITY_COORDINATES[city].lat, endLng: CITY_COORDINATES[city].lng}])
        .pointOfView(povCoords, 4000);
}

//function to get the midpoint coordinates between two cities
function getMidPoint(city1, city2){
    var lat1 = CITY_COORDINATES[city1].lat;
    var lon1 = CITY_COORDINATES[city1].lng;
    var lat2 = CITY_COORDINATES[city2].lat;
    var lon2 = CITY_COORDINATES[city2].lng;

    dLon = toRadians(lon2 - lon1);

    //convert to radians
    lat1 = toRadians(lat1);
    lat2 = toRadians(lat2);
    lon1 = toRadians(lon1);

    //formula to calculate midpoint
    Bx = Math.cos(lat2) * Math.cos(dLon);
    By = Math.cos(lat2) * Math.sin(dLon);
    lat3 = Math.atan2(Math.sin(lat1) + Math.sin(lat2), Math.sqrt((Math.cos(lat1) + Bx) * (Math.cos(lat1) + Bx) + By * By));
    lon3 = lon1 + Math.atan2(By, Math.cos(lat1) + Bx);

    //convert back to degrees and adjust latidude for better view of arc
    resultLat = toDegrees(lat3)-20;
    resultLng = toDegrees(lon3);

    return {
      lat: resultLat,
      lng: resultLng,
      altitude: 2
    }
}

//functions to convert degrees to radians and vice versa
function toRadians(degrees) {
    return degrees * Math.PI / 180;
}
function toDegrees(radians) {
    return radians * 180 / Math.PI;
}

//function to go to city and pull weather data
function goToCity(){
    city = document.getElementById("citySelect").value;
    getWeather(city);
    getImages(city);

    document.getElementById("leftContainer").classList.add("leftShow");
    document.getElementById("rightContainer").classList.add("rightShow");

    currentCity = city;
    myGlobe
        .pointOfView(CITY_COORDINATES[city], 4000)
        .arcsData([]);
}

//function to get weather data from openweathermap api
function getWeather(city){
    const apiKey = "459129b59b511dd68b563f2bd58a15f1";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;

    fetch(url)
    .then(response => response.json())
    .then(data => {
        console.log(data);
        document.getElementById("cityName").innerText = data.name;
        document.getElementById("temp").innerText = data.main.temp + "°F";
        document.getElementById("weather").innerText = data.weather[0].main;
        document.getElementById("max").innerText = data.main.temp_max + "°F";
        document.getElementById("min").innerText = data.main.temp_min + "°F";
        document.getElementById("humidity").innerText = data.main.humidity + "%";
        document.getElementById("wind").innerText = data.wind.speed + " mph";
        document.getElementById("feels").innerText = data.main.feels_like + "°F";

        weatherStr = data.weather[0].icon
        icon = document.getElementById("icon");

        if (isPhone){
            if(weatherStr.slice(-1) == "n"){
                document.getElementById("main").classList.add("nightBg");
            } else {
                document.getElementById("main").classList.remove("nightBg");
            }
        } else {
            if(weatherStr.slice(-1) == "n"){
                document.getElementById("rightContainer").classList.add("nightBg");
                document.getElementById("leftContainer").classList.add("nightBg");
            } else {
                document.getElementById("rightContainer").classList.remove("nightBg");
                document.getElementById("leftContainer").classList.remove("nightBg");
            }
        }

        switch(data.weather[0].icon){
            case "01d":
                icon.src = "assets/icons/day.svg"
                break;
            case "01n":
                icon.src = "assets/icons/night.svg"
                break;
            case "02d":
                icon.src = "assets/icons/cloudy-day-3.svg"
                break;
            case "02n":
                icon.src = "assets/icons/cloudy-night-3.svg"
                break;
            case "03d": case "03n": case "04d": case "04n": case "50d": case "50n":
                icon.src = "assets/icons/cloudy.svg"
                break;
            case "09d": case "09n": case "10n":
                icon.src = "assets/icons/rainy-6.svg"
                break;
            case "10d":
                icon.src = "assets/icons/rainy-3.svg"
                break;
            case "11d": case "11n":
                icon.src = "assets/icons/thunder.svg"
                break;
            case "13d":
                icon.src = "assets/icons/snowy-3.svg"
                break;
            case "13n":
                icon.src = "assets/icons/snowy-5.svg"
                break;
        }
    })
}
//function to set images for each city
function getImages(city){
    var skyline = document.getElementById("skyline");
    var food = document.getElementById("food");
    var landmark = document.getElementById("landmark");
    var history = document.getElementById("history");
    var environment = document.getElementById("environment");

    city = city.toLowerCase();

    if (city == "new york city"){
        city = "nyc";
    }

    skyline.src = `assets/images/${city}Skyline.jpg`;
    food.src = `assets/images/${city}Food.jpg`;
    landmark.src = `assets/images/${city}Landmark.jpg`;
    history.src = `assets/images/${city}History.jpg`;
    environment.src = `assets/images/${city}Environment.jpg`;
}
function phoneGoBtn() {
    city = document.getElementById("citySelect").value;
    getWeather(city);
    getImages(city);
}

//object to store city coordinates
const CITY_COORDINATES = {
    "Phoenix":{"lat": 33.45, "lng": -112, "altitude": 1},
    "New York City":{"lat": 40.73, "lng": -73.94, "altitude": 1},
    "Dubai":{"lat": 25.20, "lng": 55.27, "altitude": 1},
    "London":{"lat": 51.51, "lng": 0.13, "altitude": 1},
    "Tokyo":{"lat": 35.68, "lng": 139.65, "altitude": 1},
};
//variable to store the current selected city
var currentCity = "";
var isPhone = false;
var nightBg = false;

//check if the device is not a phone
if(window.innerWidth >= 768){

    //initialize globe object
    globalThis.myGlobe = Globe()
        (document.getElementById('globeViz'))
        .globeImageUrl('//unpkg.com/three-globe/example/img/earth-night.jpg')
        .backgroundColor('black')
        .backgroundImageUrl('//unpkg.com/three-globe/example/img/night-sky.png')
        .arcColor([`rgba(0, 255, 0, 1)`, `rgba(255, 0, 0, 1)`])
        .arcDashLength(0.4)
        .arcDashGap(0.1)
        .arcDashAnimateTime(1500)
        .pointColor(() => 'white')
        .pointAltitude(.2)
        .pointRadius(0.1)
        .pointsData([CITY_COORDINATES["Phoenix"], CITY_COORDINATES["New York City"], CITY_COORDINATES["Dubai"], CITY_COORDINATES["London"], CITY_COORDINATES["Tokyo"]])
        .pointsMerge(true);
} else {
    isPhone = true;
    getWeather("Phoenix");
    getImages("Phoenix");
    document.getElementById("globeViz").style.display = "none";
    document.getElementById('citySelect').setAttribute('onchange','');
    document.getElementById('goBtn').setAttribute('onclick', 'phoneGoBtn()');
}