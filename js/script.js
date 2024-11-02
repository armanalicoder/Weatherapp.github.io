let searchcity = document.querySelector(".search-city");
let temp = document.querySelector("#temp");
let cityname = document.querySelector(".city-name");
let errormsg = document.querySelector(".errormsg");
let main = document.querySelector(".main");
let weathericon = document.querySelector(".weathericon");
let d = new Date();
let date = d.toDateString();
// console.log(date);
async function w(){
    searchcity.classList.add("search-city-display")
    // window.alert("Hello")
    const city = document.querySelector('#search>div>input').value;
    if(city==""){
        window.alert("Kindly Enter City name")
    }
    else{
        document.querySelector('#search>div>input').value = "";
        const apikey = "3ef6afa9b8eb7f0d0612bf59b33c76f3";
        const url = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=${city}&appid=${apikey}`;
        let resp =await fetch(url);
        // console.log(resp);
        let data = await resp.json();
        // console.log(data);
        if(data.cod==404){
            errormsg.classList.remove("displayerror");
            main.classList.add("mainhide");
        }
        let lat = data.coord.lat;
        let lon = data.coord.lon;
        // console.log(lat,lon);
        // console.log(data.weather[0].id);
        const forecasturl = `https://api.openweathermap.org/data/2.5/forecast?units=metric&lat=${lat}&lon=${lon}&appid=${apikey}`;
        let forecastdata =await fetch(forecasturl);
        let pastweather =await forecastdata.json();
        // console.log("Past :",pastweather);
        const timeTaken = "12:00:00";
        const todayDate = new Date().toISOString().split('T')[0];
        // console.log(todayDate);
        function getweathericon(id){
            if(id>=200 && id<=232){
                return "thunderstorm.svg";
            }
            if(d>=300 && id<=321){
                return "drizzle.svg";
            }
            if(id>=500 && id<=531){
                return "rain.svg";
            }
            if(id>=600 && id<=622){
                return "snow.svg";
            }
            if(id>=701 && id<=781){
                return "atmosphere.svg";
            }
            if(id>=800 && id<=804){
                return "clear.svg";
            }
            else{
                return "clouds.svg";
            }
        }
        let cardidx =1;
        pastweather.list.forEach(elements => {
            if(elements.dt_txt.includes(timeTaken)){
                let card = document.getElementById(`card-${cardidx}`);
                if (card){
                    card.querySelector("h4").innerHTML = elements.dt_txt.split(" ")[0];
                    let id1 = elements.weather[0].id;
                    let temp = elements.main.temp;
                    card.querySelector("img").src = `img/${getweathericon(id1)}`;
                    card.querySelector("h5").innerHTML = temp + "°C";
                    cardidx++;
                }
            }
        });
        searchcity.classList.add("citydisplay");
        main.classList.remove("allinfo");
        weathericon.src = `img/${getweathericon(data.weather[0].id)}`
        temp.innerHTML =Math.round(data.main.temp) + "℃";
        cityname.innerHTML = data.name;
        document.querySelector(".date").innerHTML = date;
        document.querySelector("#description").innerHTML = data.weather[0].description;
        // window.innerHTML = data.
        document.querySelector("#humidity").innerHTML = data.main.humidity+"%";
        document.querySelector("#wind").innerHTML = data.wind.speed+"kmph";
    }
    
}