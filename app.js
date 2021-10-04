const gnewsApiKey = '1125705369e213547a96e9ccb952b48b';
const oWeathApiKey = '7c492c22cc3454f7043ae06d28366107';
const avApiKey = "UCYV9F7X96A1UXRT";
// const giphyApiKey = '2MBKmGpnmFqQmKOJBE7Pn3pPSqGwaKla';
const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December',]
const weatherIcons = ['thunder.svg', 'rainy-4.svg', 'rainy-7.svg', 'snowy-6.svg', 'alert.svg', 'day.svg', 'night.svg', 'cloudy-day-2.svg', 'cloudy-night-2.svg' ]

let firstname = "";
let city = "";
let d = new Date();
let date = `${days[d.getDay()]}, ${months[d.getMonth()]} ${d.getDate()}`;

const getGnews = (city, articles="10") => {
     $.ajax({
          url: `https://gnews.io/api/v4/search?q=${city}&max=${articles}&lang=en&token=${gnewsApiKey}`
     }).then(
          (data) => {
               
                    console.log(data);
                    $('.content-container').empty();
                    if(data.articles.length > 0){

                         for(let i = 0; i < parseInt(articles); i++){

                              const title = data.articles[i].title;
                              const description = data.articles[i].description.slice(0, 75) + "...";
                              const url = data.articles[i].url;
                              const image = data.articles[i].image;

                              const $newsContentDiv = $('<div>').addClass('news-content');
                              const $newsInfoDiv = $('<div>').addClass('news-info-container');
                              const $title = $('<h4>').text(title);
                              const $desc = $('<p>').text(description);
                              const $topA = $('<a>').attr('href', url);
                              const $botA = $('<a>').attr('href', url);
                              const $img = $('<img>').attr('src', image);

                              $('.content-container').append($newsContentDiv);
                              $newsContentDiv.append($topA);
                              $newsContentDiv.append($botA);
                              $topA.append($img);
                              $botA.append($newsInfoDiv);
                              $newsInfoDiv.append($title);
                              $newsInfoDiv.append($desc);

                         }

                    } else {

                         const $sorry = $('<h3>').text("Sorry, no news articles available for your area at the moment");
                         
                         $('.content-container').append($sorry);
                    }

          },
          () => {
               console.log('bad request')    
          }
     );
}


const getRandomFact = () => {
     $.ajax({
          url: `https://asli-fun-fact-api.herokuapp.com/`
     }).then(
          (data) => {
               $('#fact').text(data.data.fact);
          },
          () => {
               return 'something went wrong :(';
          }
     )
}

// for 5 day forecast
const getWeather = () => {
     $.ajax({
          url: `https://api.openweathermap.org/data/2.5/onecall?lat=33.44&lon=-94.04&appid=${oWeathApiKey}`
     }).then(
          (data) => {
               console.log(data);

               //Update weather icon depending on the weather id and icon set

               // $('#current-weather').text(data.current.weather[0].description + " ");
               $('#temp').html(((data.current.temp - 275.13) * 9 /5 + 32).toFixed(0) + " &#176;F");
          },
          () => {
               console.log('bad request');
          }
     )
}

// for header data
const getCurrentWeather = (cityName) => {
     $.ajax({
          url: `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${oWeathApiKey}`
     }).then(
          (data) => {

               // console.log(data);

               const weatherID = data.weather[0].id;
               let n = new Date();
               let hours = n.getHours();

               // update temp in header
               $('#temp').html(((data.main.temp - 273.15) * 9 /5 + 32).toFixed(0) + " &#176;F"); 
               

               //set weather icon according to ID
               if(weatherID >= 200  && weatherID <= 232){   
                    
                    // thunder
                    $('#weather-icon').attr('src', `imgs/static-weather/${weatherIcons[0]}`)

               } else if(weatherID >= 300 && weatherID <= 321){ 
                    
                    // rainy
                    $('#weather-icon').attr('src', `imgs/static-weather/${weatherIcons[1]}`)

               } else if(weatherID >= 500 && weatherID <= 531){ 
                    
                    // heavy rain
                    $('#weather-icon').attr('src', `imgs/static-weather/${weatherIcons[2]}`)

               } else if(weatherID >= 600 && weatherID <= 622){ 
                    
                    // snowy
                    $('#weather-icon').attr('src', `imgs/static-weather/${weatherIcons[3]}`)

               } else if(weatherID >= 701 && weatherID <= 781){ 
                    
                    // alert
                    $('#weather-icon').attr('src', `imgs/static-weather/${weatherIcons[4]}`)

               } else if( weatherID === 800 && (hours > 6 && hours < 20) ){ 
                    
                    // clear day
                    $('#weather-icon').attr('src', `imgs/static-weather/${weatherIcons[5]}`)

               } else if(weatherID === 800 && (hours < 6 || hours >= 20) ){ 
                    
                    // clear night
                    $('#weather-icon').attr('src', `imgs/static-weather/${weatherIcons[6]}`)

               } else if( ( weatherID >= 801 && weatherID <= 804 ) && (hours > 6 && hours < 20) ){ 
                    
                    // cloudy day
                    $('#weather-icon').attr('src', `imgs/static-weather/${weatherIcons[7]}`)

               } else if( ( weatherID >= 801 && weatherID <= 804 ) && (hours < 6 || hours >= 20)){ 
                    
                    // cloudy night
                    $('#weather-icon').attr('src', `imgs/static-weather/${weatherIcons[8]}`)

               } else {
                    // alert svg  == error
                    $('#weather-icon').attr('src', `imgs/static-weather/${weatherIcons[4]}`)
               }
               
          },
          () => {
               console.log('bad request from getCurrentWeather');
          }
     )
}

// const getGiphy = () => {
//      $.ajax({
//           url: `http://api.giphy.com/v1/gifs/search?q=ryan+gosling&api_key=${giphyApiKey}&limit=5` // note the plus needed to join spaced words
//      }).then(
//           (data) => {
//                console.log('current weather data: ');
//                console.log(data);
//           },
//           () => {
//                console.log('bad request');
//           }
//      )
// }

const getStonks = (ticker) => {
     $.ajax({
          url: `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${ticker}&apikey=${avApiKey}`
     }).then(
          (data) => {
               dateKeys = Object.keys(data['Time Series (Daily)']); // array of keys used to access the date of stock info  Ex: data['Time Series (Daily)'][dateKeys[0]] accesses today's data

               console.log(data['Time Series (Daily)'][dateKeys[0]]);
          },
          () => {
               console.log('bad av api request');
          }
     )
}

const loadStonksPage = () => {
     // getStonks(ticker)
     $('.content-container').empty();
     $('.content-container').append('<h3>').text('stonks page');
}

const loadWeatherPage = () => {
     $('.content-container').empty();
     $('.content-container').append('<h3>').text('weather page');
}

const setGreeting = (name) => {
     let n = new Date();
     let hour = n.getHours();

     if(hour < 12){
          $('#greeting').text(`Good morning, ${name}!`);
     } else {
          $('#greeting').text(`Good afternoon, ${name}!`);
     }
}

const apiCalls = [loadWeatherPage, getGnews, loadStonksPage]; // carousel pages
let currCarouselPage = 1;

$(() => {
     /// Initialize site ///
     
     getRandomFact();    // turned off for now so I don't get blocked by the API
      
     $('#date').text(date)
     
     // getWeather(); apiCalls[1]
     // getGiphy();

     $('#modal-submit').on('click', () => {
          firstname = $('#name-textbox').val();          //implement localstorage here
          city = $('#city-textbox').val();
          $('.modal').css('display', 'none');

          setGreeting(firstname);              // sets top welcome message
          city !== "" ? getCurrentWeather(city) : getCurrentWeather("New York");           // gets weather data for city from input text box
          city !== "" ? apiCalls[1](city) : apiCalls[1]("US");
     })

     $('#right-arrow').on('click', () => {
          if(currCarouselPage < apiCalls.length){
               currCarouselPage++
               apiCalls[currCarouselPage]();
          }else{
               // make jiggle animation that symbolizes the end of the carousel
          }
     })

     $('#left-arrow').on('click', () => {
          if(currCarouselPage > -1){
               currCarouselPage--
               apiCalls[currCarouselPage]();
          }else{
               // make jiggle animation that symbolizes the end of the carousel
          }
     })


})