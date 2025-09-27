
const input = document.querySelector("#city-input");
const weatherBtn = document.querySelector("#city-input-btn");
const weatherDiv = document.querySelector("#weather-info");
const url ='https://api.openweathermap.org/data/2.5/weather';
const apiKey = 'f00c38e0279b7bc85480c3fe775d518c';


async function weatherApp() {
	const inputValue = input.value.trim();
	if (inputValue==="") {
		weatherDiv.innerHTML="<p class='warning'>please enter a city name first 😒.</p>"

		const card = document.querySelector(".weather-card");
		card.removeAttribute("style");
		return;
	}
	weatherDiv.innerHTML=""

	try {
		const response = await fetch(`${url}?q=${inputValue}&appid=${apiKey}&units=metric`);
		const data = await response.json();	
		
		if (!response.ok) {
			weatherDiv.innerHTML="<p class='warning'>Something went wrong.</p>"			
		}

		const weatherImages = {
			"overcast clouds":"https://cdn.pixabay.com/photo/2017/09/29/13/36/river-2799103_640.jpg",

			"clear sky": "https://cdn.pixabay.com/photo/2022/04/26/13/04/sky-7158340_640.jpg",

  			"few clouds": "https://media.istockphoto.com/id/867661806/photo/three-white-fkuffy-small-clouds-on-the-light-blue-sky.webp?b=1&s=612x612&w=0&k=20&c=sIlHtLqJNWrSJt57WbdyYzEbCIqieWe1CJHzJmB3XHE=",

  			"scattered clouds": "https://cdn.pixabay.com/photo/2018/05/13/10/13/sky-3395811_640.jpg",

  			"broken clouds": "https://cdn.pixabay.com/photo/2013/11/14/18/23/clouds-210547_640.jpg",

  			"shower rain": "https://cdn.pixabay.com/photo/2019/10/25/19/29/girl-4577838_640.jpg",

  			"rain": "https://cdn.pixabay.com/photo/2020/07/10/04/19/raining-5389459_640.jpg"
			,
  			"light rain": "https://cdn.pixabay.com/photo/2024/03/09/12/48/water-8622588_640.png",

  			"thunderstorm": "https://cdn.pixabay.com/photo/2016/10/25/12/28/thunderstorm-1768742_640.jpg",

  			"snow": "https://cdn.pixabay.com/photo/2016/12/04/21/22/snowman-1882635_640.jpg",

  			"mist": "https://cdn.pixabay.com/photo/2014/01/07/18/34/fog-240075_1280.jpg",

			"fog":"https://media.istockphoto.com/id/185595085/photo/driving-car-in-the-fog.webp?b=1&s=612x612&w=0&k=20&c=d-wJwBpUdm4fUb8XGcEQeqLSAQ9FtJmfpcGm-7DKWR0="

		};


		const description  = data.weather[0].description.toLowerCase();
		const image = weatherImages[description] || "https://cdn.pixabay.com/photo/2015/12/01/20/28/road-1072823_640.jpg"
		document.querySelector(".weather-card").style.backgroundImage = `url('${image}')`;
		document.querySelector(".weather-card").style.backgroundSize = "cover";
		document.querySelector(".weather-card").style.backgroundPosition = "center";
		document.querySelector(".weather-card").style.color = "white"

		const iconCode = data.weather[0].icon;
		const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
		const timeOfDay = iconCode.endsWith('d') ? "Daytime ☀️" : "Nighttime 🌙";


		weatherDiv.innerHTML=`

		<h2 style="color:black; font-weight:900; font-size:30px;">${data.name}</h2>

		<div class="info-div">

		<div style="color:white; font-weight:900; -webkit-text-stroke: 1.5px black; font-size:60px;" class="temperature">${Math.round(data.main.temp)}°C</div>

		<div style="color:black; font-weight:900; font-size:20px; text-transform:capitalize;" class="description"> ${data.weather[0].description}</div>

		<div style="color:black; font-weight:900; font-size:20px;">${timeOfDay}</div>

		<div style="color:black; font-weight:900; font-size:20px;" class="wind">Wind: ${data.wind.speed} m/s</div>

		</div>

		`;


	} catch (error) {
		console.error("Error fetching weather", error);
		weatherDiv.innerHTML="<p class='warning'>This is'nt a city</p>"
	}



}
        



weatherBtn.addEventListener("click", function () {
	weatherApp()
})

input.addEventListener("keydown", function (event) {
	if (event.key==="Enter") {
		weatherApp();
	}
})

input.addEventListener("input", () => {
  weatherDiv.innerHTML = "";
});















// <img src="${image}" alt="${description}" class="imges">//

// <div class="feels-like">Feels Like:${Math.round(data.main.feels_like)}°C</div>//











