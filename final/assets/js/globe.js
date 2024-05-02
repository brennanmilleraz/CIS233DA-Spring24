function changeCity(citySelect) {
    document.getElementById("leftContainer").classList.remove("leftShow");
    document.getElementById("rightContainer").classList.remove("rightShow");
    city = citySelect.value;
    if(city == currentCity){
        goToCity(city);
        return;
    }
    povCoords = getMidPoint(currentCity, city);
    console.log(povCoords);

    myGlobe
        .arcsData([{startLat: CITY_COORDINATES[currentCity].lat, startLng: CITY_COORDINATES[currentCity].lng, endLat: CITY_COORDINATES[city].lat, endLng: CITY_COORDINATES[city].lng}])
        .pointOfView(povCoords, 4000);
}
  
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

    Bx = Math.cos(lat2) * Math.cos(dLon);
    By = Math.cos(lat2) * Math.sin(dLon);
    lat3 = Math.atan2(Math.sin(lat1) + Math.sin(lat2), Math.sqrt((Math.cos(lat1) + Bx) * (Math.cos(lat1) + Bx) + By * By));
    lon3 = lon1 + Math.atan2(By, Math.cos(lat1) + Bx);

    resultLat = toDegrees(lat3)-20;
    resultLng = toDegrees(lon3);
    return {
      lat: resultLat,
      lng: resultLng,
      altitude: 2
    }
}
function toRadians(degrees) {
    return degrees * Math.PI / 180;
}
function toDegrees(radians) {
    return radians * 180 / Math.PI;
}

function goToCity(){
    document.getElementById("leftContainer").classList.add("leftShow");
    document.getElementById("rightContainer").classList.add("rightShow");

    city = document.getElementById("citySelect").value;
    currentCity = city;
    myGlobe
        .pointOfView(CITY_COORDINATES[city], 4000)
        .arcsData([]);
}

const CITY_COORDINATES = {
    "Phoenix":{"lat": 33.45, "lng": -112, "altitude": 1},
    "NYC":{"lat": 40.73, "lng": -73.94, "altitude": 1},
    "Dubai":{"lat": 25.20, "lng": 55.27, "altitude": 1},
    "London":{"lat": 51.51, "lng": 0.13, "altitude": 1},
    "Tokyo":{"lat": 35.68, "lng": 139.65, "altitude": 1},
};
var currentCity = "Phoenix";

const myGlobe = Globe()
    (document.getElementById('globeViz'))
    .globeImageUrl('//unpkg.com/three-globe/example/img/earth-night.jpg')
    .backgroundColor('black')
    .arcColor([`rgba(0, 255, 0, 1)`, `rgba(255, 0, 0, 1)`])
    .arcDashLength(0.4)
    .arcDashGap(0.1)
    .arcDashAnimateTime(1500)
    .pointColor(() => 'white')
    .pointAltitude(.2)
    .pointRadius(0.1)
    .pointsData([CITY_COORDINATES["Phoenix"], CITY_COORDINATES["NYC"], CITY_COORDINATES["Dubai"], CITY_COORDINATES["London"], CITY_COORDINATES["Tokyo"]])
    .pointsMerge(true)
    .pointOfView(CITY_COORDINATES["Phoenix"], 4000);
