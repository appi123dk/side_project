const API_KEY = "fb9d89f244ef966ca1252e8ebae3fd87";
const COORDS = "coords";

const weather = document.querySelector(".js-weather");

async function getWeather(location){
    const lat = location.latitude,
          lon = location.longitude;
    
    const api_response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`)
    const res = await api_response.json();

    console.log(res);
    
    const temp = res.main.temp,
          name = res.name;
    
    weather.innerText = `${name}의 온도는 ${temp}도 입니다`;
}

function success(pos) {
    const crd = pos.coords,
          location = {
            latitude: crd.latitude,
            longitude: crd.longitude,
            altitude: crd.altitude
          };
    localStorage.setItem(COORDS, JSON.stringify(location));
    loadCoords();
}

function error(err) {
    console.log(`error : ${err.code} / ${err.message}`);
    // IP주소를 받아와서 해당 지역의 대표 위도 경도를 받아온다
}


function askForCoords() {
    const options = {
        enableHighAccuracy: true,
        timeout: 10000,
    };
    navigator.geolocation.getCurrentPosition(success, error, options);
}

function saveCoords() {
    
}


function loadCoords() {
    const loadCoords = localStorage.getItem(COORDS);
    if(loadCoords === null){
        // 위치를 가져온다
        askForCoords();
    } else {
        const location = JSON.parse(loadCoords);
        // 날씨를 가져온다
        getWeather(location);
    }
}


function init() {
    loadCoords();
}

init();