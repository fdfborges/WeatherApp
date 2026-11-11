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

let toggleButton = document.getElementById("toggleButton");
let containerToggle = document.getElementById("toggleTheme");
let nightSVG = document.getElementById("nightSVG");
let DaySVG = document.getElementById("DaySVG");

let body = document.body;
let cardPrincipalContainerPrincipal = document.querySelector(".cardPrincipalContainerPrincipal");
let containerCardVariablesRightPrincipal = document.querySelectorAll(".containerCardVariablesRightPrincipal");
let inputContainerPrincipal = document.querySelector(".inputContainerPrincipal");
let containerIconSearch = document.querySelector(".containerIconSearch");
let cardPrincipalContainerRight = document.querySelector(".cardPrincipalContainerRight");
let containerUpdate = document.querySelector(".containerUpdate");
let mainFooterContainerCard = document.querySelectorAll(".mainFooterContainerCard");
let cidade = '';

let CardFavoriteCityCenter = document.querySelectorAll('.CardFavoriteCityCenter');
let BtnFixedCity = document.getElementById("BtnFixedCity");

let iconFavoriteCity1 = document.getElementById("iconFavoriteCity1");
let BtnDesafixedCard1 = document.getElementById("BtnDesafixedCard1");
let IconFavoriteCity2 = document.getElementById("IconFavoriteCity2");
let iconFavoriteCity3 = document.getElementById("iconFavoriteCity3");
let IconFavoriteCity4 = document.getElementById("IconFavoriteCity4");

const GeoLocationValueLocalStorage = localStorage.getItem("GeoLocalizacao");


window.addEventListener('DOMContentLoaded', () => {
    updateScreenInfoFavoriteCity()
})

if (GeoLocationValueLocalStorage === null) {
    navigator.geolocation.getCurrentPosition(
        (posicao) => {
            const geoPositionLatitude = posicao.coords.latitude;
            const geoPositionLongitude = posicao.coords.longitude;
            localStorage.setItem(
                "GeoLocalizacao",
                JSON.stringify({ geoPositionLatitude, geoPositionLongitude })
            );
            searchTempToCoords(geoPositionLatitude, geoPositionLongitude);

        },
        (erro) => {
            console.error("Erro ao obter localização:", erro.message);
        }
    )
} else {
    const coordenadasColetadas = JSON.parse(GeoLocationValueLocalStorage);
    searchTempToCoords(coordenadasColetadas.geoPositionLatitude, coordenadasColetadas.geoPositionLongitude)
    searchTempForeCast(GeoLocationValueLocalStorage)

}





function searchTempForeCast(GeoLocationValueLocalStorage) {
    const coordenadasColetadasForeCast = JSON.parse(GeoLocationValueLocalStorage);
    const UrlForeCastWeather = `https://api.openweathermap.org/data/2.5/forecast?lat=${coordenadasColetadasForeCast.geoPositionLatitude}&lon=${coordenadasColetadasForeCast.geoPositionLongitude}&appid=${apiKey}&units=metric`;

    fetch(UrlForeCastWeather)
        .then(response => {
            if (!response.ok) {
                throw new Error("Erro ao trazer o tempo");
            }
            return response.json();
        })
        .then(data => {
            updatingScreenForecast(data)

        })
        .catch(error => console.error('Erro:', error));

}

function updatingScreenForecast(data) {
    const date1Completed = data.list[2].dt_txt;
    const tempMinForeCast1 = Math.round(data.list[2].main.temp_max);
    const tempMaxForeCast1 = Math.round(data.list[2].main.temp_min);

    const date2Completed = data.list[10].dt_txt;
    const tempMinForeCast2 = Math.round(data.list[10].main.temp_max);
    const tempMaxForeCast2 = Math.round(data.list[10].main.temp_min);

    const date3Completed = data.list[18].dt_txt;
    const tempMinForeCast3 = Math.round(data.list[18].main.temp_max);
    const tempMaxForeCast3 = Math.round(data.list[18].main.temp_min);

    const date4Completed = data.list[26].dt_txt;
    const tempMinForeCast4 = Math.round(data.list[26].main.temp_max);
    const tempMaxForeCast4 = Math.round(data.list[26].main.temp_min);

    const date5Completed = data.list[34].dt_txt;
    const tempMinForeCast5 = Math.round(data.list[34].main.temp_max);
    const tempMaxForeCast5 = Math.round(data.list[34].main.temp_min);

    const date1Short = date1Completed.split(" ")[0];
    const date2Short = date2Completed.split(" ")[0];
    const date3Short = date3Completed.split(" ")[0];
    const date4Short = date4Completed.split(" ")[0];
    const date5Short = date5Completed.split(" ")[0];

    const nameDayForeCast1 = new Intl.DateTimeFormat('pt-BR',
        {
            weekday: "long"

        }).format(new Date(date1Short + "T12:00:00"));

    const nameDayForeCast2 = new Intl.DateTimeFormat('pt-BR',
        {
            weekday: "long"

        }).format(new Date(date2Short + "T12:00:00"));

    const nameDayForeCast3 = new Intl.DateTimeFormat('pt-BR',
        {
            weekday: "long"

        }).format(new Date(date3Short + "T12:00:00"));

    const nameDayForeCast4 = new Intl.DateTimeFormat('pt-BR',
        {
            weekday: "long"

        }).format(new Date(date4Short + "T12:00:00"));

    const nameDayForeCast5 = new Intl.DateTimeFormat('pt-BR',
        {
            weekday: "long"

        }).format(new Date(date5Short + "T12:00:00"));

    const date1ShorFormat = nameDayForeCast1.charAt(0).toLocaleUpperCase() + nameDayForeCast1.slice(1);
    const date2ShorFormat = nameDayForeCast2.charAt(0).toLocaleUpperCase() + nameDayForeCast2.slice(1);
    const date3ShorFormat = nameDayForeCast3.charAt(0).toLocaleUpperCase() + nameDayForeCast3.slice(1);
    const date4ShorFormat = nameDayForeCast4.charAt(0).toLocaleUpperCase() + nameDayForeCast4.slice(1);
    const date5ShorFormat = nameDayForeCast5.charAt(0).toLocaleUpperCase() + nameDayForeCast5.slice(1);

    const Nextday1 = document.getElementById("Nextday1");
    const NextTempMax1 = document.getElementById("NextTempMax1")
    const NextTempMin1 = document.getElementById("NextTempMin1")
    const IconForeCast1 = document.getElementById("IconForeCast1")

    const Nextday2 = document.getElementById("Nextday2");
    const NextTempMax2 = document.getElementById("NextTempMax2")
    const NextTempMin2 = document.getElementById("NextTempMin2")
    const IconForeCast2 = document.getElementById("IconForeCast2")

    const Nextday3 = document.getElementById("Nextday3");
    const NextTempMax3 = document.getElementById("NextTempMax3")
    const NextTempMin3 = document.getElementById("NextTempMin3")
    const IconForeCast3 = document.getElementById("IconForeCast3")

    const Nextday4 = document.getElementById("Nextday4");
    const NextTempMax4 = document.getElementById("NextTempMax4")
    const NextTempMin4 = document.getElementById("NextTempMin4")
    const IconForeCast4 = document.getElementById("IconForeCast4")

    const Nextday5 = document.getElementById("Nextday5");
    const NextTempMax5 = document.getElementById("NextTempMax5")
    const NextTempMin5 = document.getElementById("NextTempMin5")
    const IconForeCast5 = document.getElementById("IconForeCast5")

    Nextday1.innerHTML = `${date1ShorFormat.slice(0, 3)}`;
    NextTempMax1.innerHTML = `${tempMinForeCast1}°`
    NextTempMin1.innerHTML = `/${tempMaxForeCast1}`


    Nextday2.innerHTML = `${date2ShorFormat.slice(0, 3)}`;
    NextTempMax2.innerHTML = `${tempMinForeCast2}°`
    NextTempMin2.innerHTML = `/${tempMaxForeCast2}`

    Nextday3.innerHTML = `${date3ShorFormat.slice(0, 3)}`;
    NextTempMax3.innerHTML = `${tempMinForeCast3}°`
    NextTempMin3.innerHTML = `/${tempMaxForeCast3}`

    Nextday4.innerHTML = `${date4ShorFormat.slice(0, 3)}`;
    NextTempMax4.innerHTML = `${tempMinForeCast4}°`
    NextTempMin4.innerHTML = `/${tempMaxForeCast4}`

    Nextday5.innerHTML = `${date5ShorFormat.slice(0, 3)}`;
    NextTempMax5.innerHTML = `${tempMinForeCast5}°`
    NextTempMin5.innerHTML = `/${tempMaxForeCast5}`


    const iconeForeCast1 = data.list[2].weather[0].icon
    const UrlIconForeCast1 = `https://openweathermap.org/img/wn/${iconeForeCast1}@2x.png`
    IconForeCast1.src = UrlIconForeCast1;

    const iconeForeCast2 = data.list[10].weather[0].icon
    const UrlIconForeCast2 = `https://openweathermap.org/img/wn/${iconeForeCast2}@2x.png`
    IconForeCast2.src = UrlIconForeCast2;

    const iconeForeCast3 = data.list[18].weather[0].icon
    const UrlIconForeCast3 = `https://openweathermap.org/img/wn/${iconeForeCast3}@2x.png`
    IconForeCast3.src = UrlIconForeCast3;

    const iconeForeCast4 = data.list[26].weather[0].icon
    const UrlIconForeCast4 = `https://openweathermap.org/img/wn/${iconeForeCast4}@2x.png`
    IconForeCast4.src = UrlIconForeCast4;

    const iconeForeCast5 = data.list[34].weather[0].icon
    const UrlIconForeCast5 = `https://openweathermap.org/img/wn/${iconeForeCast5}@2x.png`
    IconForeCast5.src = UrlIconForeCast5;
}

function searchTempToCoords(latitude, longitude) {

    const urlWithDataColeted = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric&lang=pt_br`;

    fetch(urlWithDataColeted)
        .then(response => {
            if (!response.ok) {
                throw new Error("Erro ao consultar o clima");
            }
            return response.json();
        })
        .then(data => {
            updateInfoScreen(data);
            GetInfoFixed1(data);

        })
        .catch(error => console.error('Erro:', error));
}


btnSearch.addEventListener('click', () => {
    const cidade = inptSearch.value;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cidade}&appid=${apiKey}&units=metric&lang=pt_br`
    const urlGeo = `https://api.openweathermap.org/geo/1.0/direct?q=${cidade},BR&limit=1&appid=${apiKey}`
    const urlForeCast = `https://api.openweathermap.org/data/2.5/forecast?q=${cidade}&appid=${apiKey}&units=metric&lang=pt_br;`

    fetch(urlForeCast)
        .then(response => response.json())
        .then(data => {
            updatingScreenForecast(data)

        })
        .catch(error => console.error('Erro ForeCast Click', error))


    fetch(url)
        .then(response => response.json())
        .then(data => {
            updateInfoScreen(data);
            GetInfoFixed1(data);


        })
        .catch(error => console.error('Erro:', error));



    fetch(urlGeo)
        .then(response => response.json())
        .then(data => {

            const namesCountry = new Intl.DisplayNames(['pt-BR'], {
                type: 'region'
            });
            const pais = namesCountry.of(data[0].country);
            StateAndCountry.innerHTML = `${data[0].state}, ${pais}`;
        })
        .catch(error => console.error('Erro:', error));

})

let urlIcone;


function updateInfoScreen(data) {
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

    urlIcone = `https://openweathermap.org/img/wn/${icone}@4x.png`;

    imgClima.src = urlIcone;

}

function toggleTheme() {
    if (toggleButton.style.transform === "translateX(2px)") {
        toggleButton.style.transform = "translateX(32px)";
        nightSVG.style.fill = "var(--color-text)";
        DaySVG.style.fill = "var(--color-purple-light)";

        const elementosTheme = document.querySelectorAll("body, div, input, span, p, a");

        elementosTheme.forEach(elemento => {
            elemento.style.cssText = "";
        })
        updateScreenInfoFavoriteCity();

    } else {
        toggleButton.style.transform = "translateX(2px)";
        DaySVG.style.fill = "var(--color-text)";
        nightSVG.style.fill = "var(--color-purple-light)";
        body.style.backgroundColor = "var(--color-backgroundLightTheme)";
        cardPrincipalContainerPrincipal.style.backgroundColor = "var(--color-background-objectsLightTheme)";
        inptSearch.style.backgroundColor = "var(--color-background-objectsLightTheme)";
        containerIconSearch.style.backgroundColor = "var(--color-background-objectsLightTheme)";
        containerIconSearch.style.borderRadius = "100%";
        inputContainerPrincipal.style.backgroundColor = "var(--color-background-objectsLightTheme)";
        containerToggle.style.backgroundColor = "var(--color-background-objectsLightTheme)";
        containerToggle.style.border = "1px solid var(--colorBorderLightTheme)";
        cardPrincipalContainerRight.style.borderLeft = "1px solid var(--colorBorderLightTheme)";
        containerUpdate.style.borderTop = "1px solid var(--colorBorderLightTheme)";
        updateScreenInfoFavoriteCity();


        containerCardVariablesRightPrincipal.forEach(elements => {
            elements.style.backgroundColor = "var(--color-background-objectsLightTheme)";
            elements.style.border = "1px solid var(--colorBorderLightTheme";
        })

        const AllTextsSpan = document.querySelectorAll("span, p, a");
        AllTextsSpan.forEach(AllTextsSpan => {
            AllTextsSpan.style.color = "var(--colorTextsLightTheme)";
        })

        const AllTextsP = document.querySelectorAll("p");
        AllTextsP.forEach(AllTextsP => {
            AllTextsP.style.fontWeight = "900";
        })

        const mainFooterContainerCard = document.querySelectorAll(".mainFooterContainerCard");
        mainFooterContainerCard.forEach(elements => {
            elements.style.backgroundColor = "var(--color-background-objectsLightTheme)";
        })
    }
}

containerToggle.addEventListener("click", () => {
    toggleTheme();
})


function GetInfoFixed1(data) {
    nameCity = data.name;
    Temp = data.main.temp;
    minTempFavorite = data.main.temp_min;
    console.log("TESTE", nameCity);
    console.log("TESTE TEMP", Temp)
}



function updateScreenInfoFavoriteCity() {
    let info1 = localStorage.getItem('InfoCardFixed1');
    let cardFavoriteCity1 = document.getElementById("cardFavoriteCity1");

    let info2 = localStorage.getItem('InfoCardFixed2');
    let cardFavoriteCity2 = document.getElementById("cardFavoriteCity2");

    let info3 = localStorage.getItem('InfoCardFixed3');
    let cardFavoriteCity3 = document.getElementById("cardFavoriteCity3");

    let info4 = localStorage.getItem('InfoCardFixed4');
    let cardFavoriteCity4 = document.getElementById("cardFavoriteCity4");

    if (info1 === null) {
        SpanFavoriteCity1.innerHTML = "";
        PFavoriteCity1.innerHTML = "";
        PFavoriteCity1Min.innerHTML = "";
        iconFavoriteCity1.removeAttribute("src");
        cardFavoriteCity1.style.display = 'none';

    } else {
        SpanFavoriteCity1ValueStorage = JSON.parse(info1);
        SpanFavoriteCity1.innerHTML = SpanFavoriteCity1ValueStorage.nameCity;
        let TempTrunc1 = Math.trunc(SpanFavoriteCity1ValueStorage.Temp)
        PFavoriteCity1.innerHTML = `${TempTrunc1}/`;
        iconFavoriteCity1.src = SpanFavoriteCity1ValueStorage.urlIcone;
        let minTempFavoriteTrunc1 = Math.trunc(SpanFavoriteCity1ValueStorage.minTempFavorite);
        PFavoriteCity1Min.innerHTML = `${minTempFavoriteTrunc1}°`
        cardFavoriteCity1.style.display = 'flex';
    }

    if (info2 === null) {
        SpanFavoriteCity2.innerHTML = "";
        PFavoriteCity2.innerHTML = "";
        PFavoriteCity2Min.innerHTML = "";
        iconFavoriteCity2.removeAttribute("src");
        cardFavoriteCity2.style.display = 'none';
    } else {
        SpanFavoriteCity2ValueStorage = JSON.parse(info2);
        SpanFavoriteCity2.innerHTML = SpanFavoriteCity2ValueStorage.nameCity;
        let TempTrunc2 = Math.trunc(SpanFavoriteCity2ValueStorage.Temp)
        PFavoriteCity2.innerHTML = `${TempTrunc2}/`;
        iconFavoriteCity2.src = SpanFavoriteCity2ValueStorage.urlIcone;
        let minTempFavoriteTrunc2 = Math.trunc(SpanFavoriteCity2ValueStorage.minTempFavorite);
        PFavoriteCity2Min.innerHTML = `${minTempFavoriteTrunc2}°`
        cardFavoriteCity2.style.display = 'flex';
    }

    if (info3 === null) {
        SpanFavoriteCity3.innerHTML = "";
        PFavoriteCity3.innerHTML = "";
        PFavoriteCity3Min.innerHTML = "";
        iconFavoriteCity3.removeAttribute("src");
        cardFavoriteCity3.style.display = 'none';
    } else {
        SpanFavoriteCity3ValueStorage = JSON.parse(info3);
        SpanFavoriteCity3.innerHTML = SpanFavoriteCity3ValueStorage.nameCity;
        let TempTrunc3 = Math.trunc(SpanFavoriteCity3ValueStorage.Temp)
        PFavoriteCity3.innerHTML = `${TempTrunc3}/`;
        iconFavoriteCity3.src = SpanFavoriteCity3ValueStorage.urlIcone;
        let minTempFavoriteTrunc3 = Math.trunc(SpanFavoriteCity3ValueStorage.minTempFavorite);
        PFavoriteCity3Min.innerHTML = `${minTempFavoriteTrunc3}°`
        cardFavoriteCity3.style.display = 'flex';

    }

    if (info4 === null) {
        SpanFavoriteCity4.innerHTML = "";
        PFavoriteCity4.innerHTML = "";
        PFavoriteCity4Min.innerHTML = "";
        iconFavoriteCity4.removeAttribute("src");
        cardFavoriteCity4.style.display = 'none';
    } else {
        SpanFavoriteCity4ValueStorage = JSON.parse(info4);
        SpanFavoriteCity4.innerHTML = SpanFavoriteCity4ValueStorage.nameCity;
        let TempTrunc4 = Math.trunc(SpanFavoriteCity4ValueStorage.Temp)
        PFavoriteCity4.innerHTML = `${TempTrunc4}/`;
        iconFavoriteCity4.src = SpanFavoriteCity4ValueStorage.urlIcone;
        let minTempFavoriteTrunc4 = Math.trunc(SpanFavoriteCity4ValueStorage.minTempFavorite);
        PFavoriteCity4Min.innerHTML = `${minTempFavoriteTrunc4}°`
        cardFavoriteCity4.style.display = 'flex';

    }












}




let nextAvaliableCard;
let nextAvaliableSpan;
let nextAvaliableP;
let nextAvaliableStrong;
let IconFavoriteCity;

let nameCity;
let Temp;
let minTempFavorite;

BtnFixedCity.addEventListener('click', () => {

    let nextAvaliableCard;
    let nextAvaliableSpan;

    for (let localFavoriteCity of LocaisCardsStorage) {
        let info = localStorage.getItem(localFavoriteCity)

        if (info === null) {
            console.log("Achei um card vazio", localFavoriteCity)

            localStorage.setItem(
                localFavoriteCity,
                JSON.stringify({ nameCity, Temp, minTempFavorite, urlIcone })
            )
            break;
        }
    }

    for (const card of CardFavoriteCityCenter) {
        const span = card.querySelector('span');

        if (span && span.textContent.trim() === "") {
            console.log("Este card tem um span vazio:", card);

            nextAvaliableCard = card;
            nextAvaliableSpan = card.querySelector('span');
            nextAvaliableP = card.querySelector('p');
            IconFavoriteCity = card.querySelector('img');
            nextAvaliableStrong = card.querySelectorAll('strong');





            break;
        }
    }
    updateScreenInfoFavoriteCity()

})

let SpanFavoriteCity1 = document.getElementById("SpanFavoriteCity1");
let PFavoriteCity1 = document.getElementById("PFavoriteCity1");
let PFavoriteCity1Min = document.getElementById("PFavoriteCity1Min");

let SpanFavoriteCity2 = document.getElementById("SpanFavoriteCity2");
let PFavoriteCity2 = document.getElementById("PFavoriteCity2");
let PFavoriteCity2Min = document.getElementById("PFavoriteCity2Min");

let SpanFavoriteCity3 = document.getElementById("SpanFavoriteCity3");
let PFavoriteCity3 = document.getElementById("PFavoriteCity3");
let PFavoriteCity3Min = document.getElementById("PFavoriteCity3Min");

let SpanFavoriteCity4 = document.getElementById("SpanFavoriteCity4");
let PFavoriteCity4 = document.getElementById("PFavoriteCity4");
let PFavoriteCity4Min = document.getElementById("PFavoriteCity4Min");




let LocaisCardsStorage = [
    "InfoCardFixed1",
    "InfoCardFixed2",
    "InfoCardFixed3",
    "InfoCardFixed4"
]

BtnDesafixedCard1.addEventListener('click', () => {
    localStorage.removeItem('InfoCardFixed1')
    updateScreenInfoFavoriteCity();

})

BtnDesafixedCard2.addEventListener('click', () => {
    localStorage.removeItem('InfoCardFixed2')
    updateScreenInfoFavoriteCity();

})

BtnDesafixedCard3.addEventListener('click', () => {
    localStorage.removeItem('InfoCardFixed3')
    updateScreenInfoFavoriteCity();

})

BtnDesafixedCard4.addEventListener('click', () => {
    localStorage.removeItem('InfoCardFixed4')
    updateScreenInfoFavoriteCity();

})


