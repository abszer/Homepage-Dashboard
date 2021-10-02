const gnewsApiKey = '1125705369e213547a96e9ccb952b48b';
const oWeathApiKey = '7c492c22cc3454f7043ae06d28366107';
const giphyApiKey = '2MBKmGpnmFqQmKOJBE7Pn3pPSqGwaKla';
const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December',]
const weatherIcons = ['thunder.svg', 'rainy-4.svg', 'rainy-7.svg', 'snowy-6.svg', 'alert.svg', 'day.svg', 'night.svg', 'cloudy-day-2.svg', 'cloudy-night-2.svg' ]


let firstname = "";
let city = "";
let d = new Date();
let date = `${days[d.getDay()]}, ${months[d.getMonth()]} ${d.getDate()}`;


// api.openweathermap.org/data/2.5/weather?q=boerne&appid=7c492c22cc3454f7043ae06d28366107 // example with name of town

const getGnews = (city, articles="10") => {
     $.ajax({
          url: `https://gnews.io/api/v4/search?q=${city}&max=${articles}&lang=en&token=${gnewsApiKey}`
     }).then(
          (data) => {
               
                    console.log(data);
                    if(data.articles.length > 0){

                         for(let i = 0; i < parseInt(articles); i++){

                              const title = data.articles[i].title;
                              const description = data.articles[i].description;
                              const url = data.articles[i].url;
                              const image = data.articles[i].image;

                              console.log("grabbed news info: ");
                              console.log(title);
                              console.log(description);
                              console.log(url);
                              console.log(image);

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

               const weatherID = data.weather[0].id;
               let n = new Date();
               let hours = n.getHours();

               // update temp in header
               $('#temp').html(((data.main.temp - 275.13) * 9 /5 + 32).toFixed(0) + " &#176;F"); 
               

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

const getGiphy = () => {
     $.ajax({
          url: `http://api.giphy.com/v1/gifs/search?q=ryan+gosling&api_key=${giphyApiKey}&limit=5` // note the plus needed to join spaced words
     }).then(
          (data) => {
               console.log('current weather data: ');
               console.log(data);
          },
          () => {
               console.log('bad request');
          }
     )
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


$(() => {
     /// Initialize site ///
     getRandomFact();
     $('#date').text(date)
     
     // getWeather();
     // getGiphy();

     $('#modal-submit').on('click', () => {
          firstname = $('#name-textbox').val();          //implement localstorage here
          city = $('#city-textbox').val();
          $('.modal').css('display', 'none');

          setGreeting(firstname);              // sets top welcome message
          city !== "" ? getCurrentWeather(city) : getCurrentWeather("New York");           // gets weather data for city from input text box
          city !== "" ? getGnews(city) : getGnews("US");
     })
})