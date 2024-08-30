const weatherform = document.querySelector(".weatherform")
const cityInput = document.querySelector(".cityInput");
const card =document.querySelector(".card")
const api_key ="9b9f38ee4d3f20725fc2ff9a28557370";

weatherform.addEventListener("submit" , async event=>{

    
    event.preventDefault();
    const city = cityInput.value;
    if(city){
        try{
            const weatherData =  await getweatherdata(city);
            displayweatherinfo(weatherData);
        }
        catch(error){
            console.error(error);
            displayerror(error);
        }
    }
    else{
        displayerror("please enter a city");
        console.log("entera city")
    }
});

function getweatherdata(city) {
    const api_url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`;
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open("GET", api_url, true);
        xhr.onload = function () {
            if (xhr.status >= 200 && xhr.status < 300) {
                resolve(JSON.parse(xhr.responseText));
            } else {
                reject(new Error(`Error: ${xhr.status} ${xhr.statusText}`));
            }
        };
        xhr.onerror = function () {
            reject(new Error("Network error"));
        };
        xhr.send();
    });
}


function displayweatherinfo(data){
    const {name:city,
        main:{temp,humidity},
        weather:[{description ,id}]}=data;

    card.textContent ="";
    card.style.display= "flex";
    const cityDisplay =document.createElement("h1");
    const tempDisplay =document.createElement("p");
    const humidityDisplay =document.createElement("p");
    const descDisplay =document.createElement("p");
    const weatherEmoji =document.createElement("p");

    cityDisplay.textContent = city; // these takes the value
    tempDisplay.textContent = `${(temp-273.15).toFixed(2)}°C`;
    humidityDisplay.textContent =`humidity: ${humidity}%`;
    descDisplay.textContent =description;
    weatherEmoji.textContent=getweatheremoji(id); // takes id and then we chose id based on id

    
    cityDisplay.classList.add("cityDisplay");
    tempDisplay.classList.add("tempDisplay");
    humidityDisplay.classList.add("humidityDisplay");
    descDisplay.classList.add("descDisplay");
    weatherEmoji.classList.add("weatherEmoji");

    card.appendChild(cityDisplay);  // to put valu on the card for display
    card.appendChild(tempDisplay);
    card.appendChild(humidityDisplay);
    card.appendChild(descDisplay);
    card.appendChild(weatherEmoji);
}

function getweatheremoji(weatherId){
    if(weatherId>=200 && weatherId<300)
        { return "⛈️" }
    else if(weatherId>=300 &&  weatherId<400)
        { return "🌧️" }
    else if(weatherId>=500 &&  weatherId<600)
        { return "🌧️" }
    else if(weatherId>=600 &&  weatherId<700)
        { return "❄️" }
    else if(weatherId>=700 &&  weatherId<800)
        { return "🌁" }  
    else if(weatherId===800)
        { return "☀️" }
    else if(weatherId>802 &&  weatherId<900)
        { return "☁️" } 
    else if(weatherId>=801 &&  weatherId<=802)
        { return "⛅" } 
    else{
        return "❓"
    }
}
function displayerror(message){

    const errorDisplay =document.createElement("p");
    errorDisplay.textContent =message;
    errorDisplay.classList.add("errorDisplay");
    card.textContent = "";
    card.style.display = "flex";
    card.appendChild(errorDisplay);
    
} 
// to make toggle dark and light
console.log("toggle here")
const savedTheme = localStorage.getItem('theme');
const body = document.querySelector('body');
const toggleDarkIcon = document.getElementById('toggle-dark');
const toggleDayIcon = document.getElementById('toggle-day');

if (savedTheme === 'darkmode') {
    body.classList.add('darkmode');
    toggleDarkIcon.style.display = 'none';
    toggleDayIcon.style.display = 'block';
} else {
    toggleDarkIcon.style.display = 'block';
    toggleDayIcon.style.display = 'none';
}

document.getElementById('theme-switch').addEventListener('click', () => {
    body.classList.toggle('darkmode');
    const isDarkMode = body.classList.contains('darkmode');
    localStorage.setItem('theme', isDarkMode ? 'darkmode' : '');
    toggleDarkIcon.style.display = isDarkMode ? 'none' : 'block';
    toggleDayIcon.style.display = isDarkMode ? 'block' : 'none';
});



console.log("toggle again")