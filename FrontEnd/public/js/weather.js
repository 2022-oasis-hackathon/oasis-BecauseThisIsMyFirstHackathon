

const API_KEY = "ca2a45d80ee5721bb4f894d29bab7dbc";

function onGeoOk(position) {
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
        // document.querySelector("#place").innerText = data.name;
        document.querySelector("#wea").innerText = `${data.weather[0].description}`;
        document.querySelector("#temp").innerText = `${data.main.temp}℃`;
        document.querySelector("#hum").innerText = `${data.main.humidity}%`;
        document.querySelector("#sea").innerText = `${data.main.sea_level}m`;
        document.querySelector("#wind").innerText = `${data.wind.speed}m/s`;
    });
}

function onGeoError() {        //위치를 찾을 수 없으면 실행
  alert("날씨를 찾을 수 없습니다");
}

navigator.geolocation.getCurrentPosition(onGeoOk, onGeoError);