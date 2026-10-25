let TitleCityHTML = document.getElementById("TitleCityHTML");
let temperatureHTML = document.getElementById("temperatureHTML");
let conditionTemp = document.getElementById("conditionTemp");
let StateAndCountry = document.getElementById("StateAndCountry");
let umidityHTML = document.getElementById("umidityHTML");
let speedWind = document.getElementById("speedWind");
let feels_like_temperature = document.getElementById("feels_like_temperature");
let visibility = document.getElementById("visibility");
let pressure = document.getElementById("pressure");
let minTemp = document.getElementById("minTemp");
let maxTemp = document.getElementById("maxTemp");
let cloudiness = document.getElementById("cloudiness");
let update = document.getElementById("update");
let NextDaySpan = document.querySelectorAll(".NextDaySpan");
let imgClima = document.getElementById("imgClima");
let inptSearch = document.getElementById("inptSearch");
const btnSearch = document.getElementById("btnSearch");
const apiKey = 'f83680206b3f8cd3105b8b9b4daaedbd'

let cidade = '';

btnSearch.addEventListener('click', () => {
    const cidade = inptSearch.value;
    console.log(inptSearch.value)
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cidade}&appid=${apiKey}&units=metric&lang=pt_br`
    const urlGeo = `https://api.openweathermap.org/geo/1.0/direct?q=${cidade},BR&limit=1&appid=${apiKey}`



    fetch(url)
        .then(response => response.json())
        .then(data => {
            console.log(`Temperatura em ${data.name}: ${data.main.temp}°C`);
            console.log(`Condição: ${data.weather[0].description}`);
            TitleCityHTML.innerHTML = data.name;
            temperatureHTML.innerHTML = `${data.main.temp}°C`;

            let conditionTempValue = `${data.weather[0].description}`
            let FormatCondition = conditionTempValue.charAt(0).toUpperCase() + conditionTempValue.slice(1);
            conditionTemp.innerHTML = FormatCondition;
            umidityHTML.innerHTML = `Umidade: ${data.main.humidity}%`
            feels_like_temperature.innerHTML = data.main.feels_like;
            visibility.innerHTML = `${data.visibility / 1000} km`;
            pressure.innerHTML = `${data.main.pressure} hPa`;
            minTemp.innerHTML = `${data.main.temp_min}°C`
            maxTemp.innerHTML = `${data.main.temp_max}°C`
            cloudiness.innerHTML = `${data.clouds.all}%`
            let valueSecondsAPI = data.dt * 1000;

            const date = new Date(valueSecondsAPI);

            const day = date.getDate();
            const month = date.toLocaleString('pt-BR', { month: 'long' });
            const year = date.getFullYear();
            const hours = date.getHours();
            const minutes = String(date.getMinutes()).padStart(2, '0');
            update.innerHTML = `${day} de ${month} de ${year} ás ${hours}:${minutes}.`



            const velocidadeVento = data.wind.speed * 3.6;

            speedWind.innerHTML = `Vento: ${velocidadeVento.toFixed(1)} km/h`

            const icone = data.weather[0].icon;

            const urlIcone = `https://openweathermap.org/img/wn/${icone}@4x.png`;

            imgClima.src = urlIcone;

        })
        .catch(error => console.error('Erro:', error));



    fetch(urlGeo)
        .then(response => response.json())
        .then(data => {

            const namesCountry = new Intl.DisplayNames(['pt-BR'], {
                type: 'region'
            });

            const pais = namesCountry.of(data[0].country);
            console.log(pais);

            StateAndCountry.innerHTML = `${data[0].state}, ${pais}`;
            console.log(data)


        })
        .catch(error => console.error('Erro:', error));

})



// const today = new Date();

// for (let i = 0; i <= 5; i++) {
//     const nextDay = new Date(today);
//     nextDay.setDate(today.getDate() + i);

//     const nextDayName = nextDay.toLocaleString('pt-BR', {
//         weekday: 'long'
//     });
//     NextDaySpan[i].innerHTML = nextDayName;

//     console.log(nextDayName)

// }




// function posicaoObtidaComSucesso(geolocatizacao){
//     console.log(geolocatizacao)
//     console.log(geolocatizacao.coords)
// }

// function posicaoNaoPodeSerObtida(erro){
//     console.error(erro);
// }

// navigator.geolocation.getCurrentPosition(
//     posicaoObtidaComSucesso,
//     posicaoNaoPodeSerObtida
// );

function obtergeoLocalizacao() {
    if (!navigator.geolocation) {
        console.log("Geolocalização não suportada");
        return;
    }
    navigator.geolocation.getCurrentPosition(
        (posicao) => {
            const geoPositionLatitude = posicao.coords.latitude;
            const geoPositionLongitude = posicao.coords.longitude;

            console.log(`LAT: ${geoPositionLatitude}, LONG: ${geoPositionLongitude}`);

            localStorage.setItem(
                "GeoLocalizacao",
                JSON.stringify({ geoPositionLatitude, geoPositionLongitude })
            );
        },
        (erro) => {
            console.error("Erro ao obter localização:", erro.message);
        }
    )
}



