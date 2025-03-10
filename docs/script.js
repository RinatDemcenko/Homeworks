const search = document.querySelector('#search');
const searchBtn = document.querySelector('#search-btn');
const nameInCard = document.querySelector('.name');
const altNames = document.querySelector('.alt-names')
const area = document.querySelector('.area');
const population = document.querySelector('.population');
const capital = document.querySelector('.capital');
const flag = document.querySelector('.flag');
const region = document.querySelector('.region');
const currency = document.querySelector('.currency');
const languages = document.querySelector('.languages');

let countryName = "none";
searchBtn.addEventListener('click', function () {
  countryName = search.value;
  axios.get(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`)
    .then(res => {
      flag.src = res.data[0].flags.svg;

      nameInCard.textContent = res.data[0].name.common;
      let nativeNameKey = Object.keys(res.data[0].name.nativeName)[0];
      let nativeName = res.data[0].name.nativeName[nativeNameKey].official;
      altNames.textContent = `${res.data[0].cca2}, ${nativeName}`;

      area.textContent = `Площадь: ${res.data[0].area} km²`;
      currency.textContent = `Валюта: ${res.data[0].currencies[Object.keys(res.data[0].currencies)].name};
       ${res.data[0].currencies[Object.keys(res.data[0].currencies)].symbol}`;
      population.textContent = `Население: ${res.data[0].population}`;
      capital.textContent = `Столица: ${res.data[0].capital}`;
      region.textContent = `Регион: ${res.data[0].region}`;

      let languagesSpoken = ""
      for (let lang of Object.values(res.data[0].languages)) {
        languagesSpoken += `${lang} `;
      }
      languages.textContent = `Языки: ${languagesSpoken}`;
    })
    .catch(err => {

    })
});



// [
//   {
//       "name": {
//           "common": "Ukraine",
//           "official": "Ukraine",
//           "nativeName": {
//               "ukr": {
//                   "official": "Україна",
//                   "common": "Україна"
//               }
//           }
//       },
//       "tld": [
//           ".ua",
//           ".укр"
//       ],
//       "cca2": "UA",
//       "ccn3": "804",
//       "cca3": "UKR",
//       "cioc": "UKR",
//       "independent": true,
//       "status": "officially-assigned",
//       "unMember": true,
//       "currencies": {
//           "UAH": {
//               "name": "Ukrainian hryvnia",
//               "symbol": "₴"
//           }
//       },
//       "idd": {
//           "root": "+3",
//           "suffixes": [
//               "80"
//           ]
//       },
//       "capital": [
//           "Kyiv"
//       ],
//       "altSpellings": [
//           "UA",
//           "Ukrayina"
//       ],
//       "region": "Europe",
//       "subregion": "Eastern Europe",
//       "languages": {
//           "ukr": "Ukrainian"
//       },
//       "translations": {
//           "ara": {
//               "official": "أوكرانيا",
//               "common": "أوكرانيا"
//           },
//           "bre": {
//               "official": "Ukraina",
//               "common": "Ukraina"
//           },
//           "ces": {
//               "official": "Ukrajina",
//               "common": "Ukrajina"
//           },
//           "cym": {
//               "official": "Ukraine",
//               "common": "Ukraine"
//           },
//           "deu": {
//               "official": "Ukraine",
//               "common": "Ukraine"
//           },
//           "est": {
//               "official": "Ukraina",
//               "common": "Ukraina"
//           },
//           "fin": {
//               "official": "Ukraina",
//               "common": "Ukraina"
//           },
//           "fra": {
//               "official": "Ukraine",
//               "common": "Ukraine"
//           },
//           "hrv": {
//               "official": "Ukrajina",
//               "common": "Ukrajina"
//           },
//           "hun": {
//               "official": "Ukrajna",
//               "common": "Ukrajna"
//           },
//           "ita": {
//               "official": "Ucraina",
//               "common": "Ucraina"
//           },
//           "jpn": {
//               "official": "ウクライナ",
//               "common": "ウクライナ"
//           },
//           "kor": {
//               "official": "우크라이나",
//               "common": "우크라이나"
//           },
//           "nld": {
//               "official": "Oekraïne",
//               "common": "Oekraïne"
//           },
//           "per": {
//               "official": "اوکراین",
//               "common": "اوکراین"
//           },
//           "pol": {
//               "official": "Ukraina",
//               "common": "Ukraina"
//           },
//           "por": {
//               "official": "Ucrânia",
//               "common": "Ucrânia"
//           },
//           "rus": {
//               "official": "Украина",
//               "common": "Украина"
//           },
//           "slk": {
//               "official": "Ukrajina",
//               "common": "Ukrajina"
//           },
//           "spa": {
//               "official": "Ucrania",
//               "common": "Ucrania"
//           },
//           "srp": {
//               "official": "Украјина",
//               "common": "Украјина"
//           },
//           "swe": {
//               "official": "Ukraina",
//               "common": "Ukraina"
//           },
//           "tur": {
//               "official": "Ukrayna",
//               "common": "Ukrayna"
//           },
//           "urd": {
//               "official": "یوکرین",
//               "common": "یوکرین"
//           },
//           "zho": {
//               "official": "乌克兰",
//               "common": "乌克兰"
//           }
//       },
//       "latlng": [
//           49,
//           32
//       ],
//       "landlocked": false,
//       "borders": [
//           "BLR",
//           "HUN",
//           "MDA",
//           "POL",
//           "ROU",
//           "RUS",
//           "SVK"
//       ],
//       "area": 603500,
//       "demonyms": {
//           "eng": {
//               "f": "Ukrainian",
//               "m": "Ukrainian"
//           },
//           "fra": {
//               "f": "Ukrainienne",
//               "m": "Ukrainien"
//           }
//       },
//       "flag": "🇺🇦",
//       "maps": {
//           "googleMaps": "https://goo.gl/maps/DvgJMiPJ7aozKFZv7",
//           "openStreetMaps": "https://www.openstreetmap.org/relation/60199"
//       },
//       "population": 44134693,
//       "gini": {
//           "2019": 26.6
//       },
//       "fifa": "UKR",
//       "car": {
//           "signs": [
//               "UA"
//           ],
//           "side": "right"
//       },
//       "timezones": [
//           "UTC+02:00"
//       ],
//       "continents": [
//           "Europe"
//       ],
//       "flags": {
//           "png": "https://flagcdn.com/w320/ua.png",
//           "svg": "https://flagcdn.com/ua.svg",
//           "alt": "The flag of Ukraine is composed of two equal horizontal bands of blue and yellow."
//       },
//       "coatOfArms": {
//           "png": "https://mainfacts.com/media/images/coats_of_arms/ua.png",
//           "svg": "https://mainfacts.com/media/images/coats_of_arms/ua.svg"
//       },
//       "startOfWeek": "monday",
//       "capitalInfo": {
//           "latlng": [
//               50.43,
//               30.52
//           ]
//       },
//       "postalCode": {
//           "format": "#####",
//           "regex": "^(\\d{5})$"
//       }
//   }
// ]