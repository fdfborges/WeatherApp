let TitleCityHTML = document.getElementById("TitleCityHTML");
let temperatureHTML = document.getElementById("temperatureHTML");
let conditionTemp = document.getElementById("conditionTemp");
let StateAndCountry = document.getElementById("StateAndCountry");
let umidityHTML = document.getElementById("umidityHTML");
let speedWind = document.getElementById("speedWind");
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
            
            const velocidadeVento = data.wind.speed *3.6;
            
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

