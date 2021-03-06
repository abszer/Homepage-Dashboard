const gnewsApiKey = '1125705369e213547a96e9ccb952b48b';
const oWeathApiKey = '7c492c22cc3454f7043ae06d28366107';
const avApiKey = "UCYV9F7X96A1UXRT";

const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December',]
const weatherIcons = ['thunder.svg', 'rainy-4.svg', 'rainy-7.svg', 'snowy-6.svg', 'alert.svg', 'day.svg', 'night.svg', 'cloudy-day-2.svg', 'cloudy-night-2.svg' ]

let firstname = "";
let city = "";
let d = new Date();
let date = `${days[d.getDay()]}, ${months[d.getMonth()]} ${d.getDate()}`;


///////////////////////////////////// Functions that request data from the APIs as well as append the data received to the DOM /////////////////////////////////////////

// get data from gnews api
const getGnews = (city, articles="10") => {
     $.ajax({
          url: `https://gnews.io/api/v4/search?q=${city}&max=${articles}&lang=en&token=${gnewsApiKey}`
     }).then(
          (data) => {
               
                    $('.content-container').empty();
                    if(data.articles.length > 0){

                         for(let i = 0; i < parseInt(articles); i++){

                              const title = data.articles[i].title;
                              const description = data.articles[i].description.slice(0, 75) + "...";
                              const url = data.articles[i].url;
                              const image = data.articles[i].image;

                              const $newsContentDiv = $('<div>').addClass('news-content');               // Create elements to append to .content-container div
                              const $newsInfoDiv = $('<div>').addClass('news-info-container');
                              const $title = $('<h4>').text(title);
                              const $desc = $('<p>').text(description);                
                              const $topA = $('<a>').attr('href', url);
                              const $botA = $('<a>').attr('href', url);
                              const $img = $('<img>').attr('src', image);

                              $('.content-container').append($newsContentDiv);                        // Append the elements created above
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

// get a random fact from the random fact api
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


// sets the weather icons in the header and on the five day forecast page depending on the weatherID returned from the open weather api as well as the current hour
const setWeatherIcon = (weatherID, hours, id) => {
     

     if(weatherID >= 200  && weatherID <= 232){   
                    
          // thunder
          $(id).attr('src', `imgs/static-weather/${weatherIcons[0]}`)

     } else if(weatherID >= 300 && weatherID <= 321){ 
          
          // rainy
          $(id).attr('src', `imgs/static-weather/${weatherIcons[1]}`)

     } else if(weatherID >= 500 && weatherID <= 531){ 
          
          // heavy rain
          $(id).attr('src', `imgs/static-weather/${weatherIcons[2]}`)

     } else if(weatherID >= 600 && weatherID <= 622){ 
          
          // snowy
          $(id).attr('src', `imgs/static-weather/${weatherIcons[3]}`)

     } else if(weatherID >= 701 && weatherID <= 781){ 
          
          // alert
          $(id).attr('src', `imgs/static-weather/${weatherIcons[4]}`)

     } else if( weatherID === 800 && (hours >= 6 && hours < 20) ){ 
          
          // clear day
          $(id).attr('src', `imgs/static-weather/${weatherIcons[5]}`)

     } else if(weatherID === 800 && (hours < 6 || hours >= 20) ){ 
          
          // clear night
          $(id).attr('src', `imgs/static-weather/${weatherIcons[6]}`)

     } else if( ( weatherID >= 801 && weatherID <= 804 ) && (hours >= 6 && hours < 20) ){ 
          
          // cloudy day
          $(id).attr('src', `imgs/static-weather/${weatherIcons[7]}`)

     } else if( ( weatherID >= 801 && weatherID <= 804 ) && (hours < 6 || hours >= 20)){ 
          
          // cloudy night
          $(id).attr('src', `imgs/static-weather/${weatherIcons[8]}`)

     } else {
          // alert svg  == error
          $(id).attr('src', `imgs/static-weather/${weatherIcons[4]}`)
     }


     
}

// requests data from openweater 5 day forecast
const getFiveDayWeather = (location) => {
     $('.content-container').empty();

     $.ajax({
          url: `https://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=${oWeathApiKey}`
     }).then(
          (data) => {
               console.log(data);
               let idNum = 0;
               for(const forecast of data.list){
                    
                    const dateTime = forecast.dt_txt.slice(5, 16);                          // parse data from the JSON object
                    const mainTemp = forecast.main.temp;
                    const feelsLike = forecast.main.feels_like;
                    const humidity = forecast.main.humidity;
                    const weatherID = forecast.weather[0].id;
                    // const description = forecast.weather[0].description;
                    const mainDescription = forecast.weather[0].main;
                    const hour = parseInt(forecast.dt_txt.slice(11,13));

                    const $weathInfoContainDiv = $('<div>').addClass('weather-info-container');  // create elements to append to the content-container div
                    const $currWeathIconDiv = $('<div>').addClass('current-weather-icon');
                    const $descBoxLeft = $('<div>').addClass('desc-box-left');
                    const $descBoxRight = $('<div>').addClass('desc-box-right');
                    const $dateTimeH3 = $('<h3>').text(dateTime);
                    const $descP = $('<p>').text(`${mainDescription}`);
                    const $humidityP = $('<p>').text(`Humidity: ${humidity}%`);
                    const $weathIcon = $('<img>').attr('id', `num${idNum}`);
                    
                    $weathIcon.addClass('five-day-icon');
                    
                    const $tempP = $('<p>').html("Temperature: " + ((mainTemp - 273.15) * 9 /5 + 32).toFixed(0) + " &#176;F");
                    const $feelsLikeP = $('<p>').html("Feels Like: " + ((feelsLike - 273.15) * 9 /5 + 32).toFixed(0) + " &#176;F");

                    
                    $('.content-container').append($weathInfoContainDiv);                      // append elements to the content container div
                    $weathInfoContainDiv.append($currWeathIconDiv);
                    $currWeathIconDiv.append($weathIcon);
                    
                    setWeatherIcon(weatherID, hour, `#num${idNum}`)
                    idNum++;   // increases the number appended to the end of each weathIcon element so that each element has a unique ID that can be passed into the setWeatherIcon function
                    
                    $weathInfoContainDiv.append($descBoxLeft);
                    $descBoxLeft.append($dateTimeH3);
                    $descBoxLeft.append($descP);
                    $descBoxLeft.append($humidityP);
                    
                    $weathInfoContainDiv.append($descBoxRight)
                    $descBoxRight.append($tempP);
                    $descBoxRight.append($feelsLikeP);
                    


               }

               
          },
          () => {
               console.log('bad request');
          }
     )
}

// utilizes a different endpoint for the open weather api to set the icon and weather info in the header
const getCurrentWeather = (cityName) => {

     $.ajax({
          url: `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${oWeathApiKey}`
     }).then(
          (data) => {

     
               let n = new Date();
               let hours = n.getHours();
               const weatherID = data.weather[0].id;

               // update temp in header
               $('#temp').html(((data.main.temp - 273.15) * 9 /5 + 32).toFixed(0) + " &#176;F"); // converts the temp returned from Kelvin to fahrenheit 
               

               //set weather icon according to ID
               setWeatherIcon(weatherID, hours, '#weather-icon');
               
          },
          () => {
               console.log('bad request from getCurrentWeather');
          }
     )
}


const tickers = ["GOOG", "AAPL", "AMZN", "TSLA"] // hardcoded stock to pass into the getStonks function

const getStonks = (discard) => {
     let nonsenseVar = discard; // hacky way of making sure that no errors are thrown by passing in 'city' data to all functions by creating a nonsense parameter that accepts the city data and stores it into a nonsense var

     $('.content-container').empty();
     
     for(const ticker of tickers){
          const dataArr = [];

          $.ajax({
               url: `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${ticker}&apikey=${avApiKey}`
          }).then(
               (data) => {
     
          
                    dateKeys = Object.keys(data['Time Series (Daily)']); // array of keys used to access the date of stock info  Ex: data['Time Series (Daily)'][dateKeys[0]] accesses today's data
                  
                    dataArr.push(data['Time Series (Daily)'][dateKeys[1]]["4. close"])
                    dataArr.push(data['Time Series (Daily)'][dateKeys[0]]["1. open"])
                    dataArr.push(data['Time Series (Daily)'][dateKeys[0]]["3. low"])
                    dataArr.push(data['Time Series (Daily)'][dateKeys[0]]["2. high"])
                    
                    const $stockInfoContainer = $('<div>').addClass('stock-info-container');                      // create elements that will be appended to the content container div
                    const $tickerDiv = $('<div>').addClass('ticker');
                    const $stockInfoDiv = $('<div>').addClass('stock-info');
                    const $tickerSymbol = $('<h3>').attr('id', 'symbol').text(ticker)
                    const $stockClose = $('<h5>').attr('id', 'stock-close').text(`Yesterday's Close: ${dataArr[0]}`);
                    const $stockOpen = $('<h5>').attr('id', 'stock-open').text( `Today's Open: ${dataArr[1]}`)
                    const $lowHigh = $('<h5>').attr('id', 'low-high').text(`Low: ${dataArr[2]} High: ${dataArr[3]}`);
     
                    $('.content-container').append($stockInfoContainer);          // append the elements created to the content container div
                    $stockInfoContainer.append($tickerDiv);
                    $tickerDiv.append($tickerSymbol);
                    $stockInfoContainer.append($stockInfoDiv);
                    $stockInfoDiv.append($stockClose);
                    $stockInfoDiv.append($stockOpen);
                    $stockInfoDiv.append($lowHigh);
     
                    if(dataArr[0] < dataArr[1]){                          // if yesterday close is less than today open then green ticker symbol otherwise, red symbol
                         $tickerSymbol.css('color', 'green');
                    }else{
                         $tickerSymbol.css('color', 'red');
                    }
     
                    
     
     
               },
               () => {
                    console.log('bad av api request');
                    return null;
               }
          )
     }
     
}


const setGreeting = (name) => {
     let n = new Date();
     let hour = n.getHours();

     if(hour < 12){      // hour is 0-23 
          $('#greeting').text(`Good morning, ${name}!`);
     } else {
          $('#greeting').text(`Good afternoon, ${name}!`);
     }
}



const apiCalls = [getFiveDayWeather, getGnews, getStonks]; // carousel pages
let currCarouselPage = 1;

$(() => {
     /// Initialize site ///
     
     getRandomFact();    // turned off for now so I don't get blocked by the API
      
     $('#date').text(date)
     

     if('name' in localStorage && 'city' in localStorage){

          $('.modal').css('display', 'none');
          city = localStorage.getItem('city');
          firstname = localStorage.getItem('name');

          setGreeting(firstname);              // sets top welcome message
          city !== "" ? getCurrentWeather(city) : getCurrentWeather("New York");           // gets weather data for city from input text box
          city !== "" ? apiCalls[1](city) : apiCalls[1]("US");

     } else {

          $('#modal-submit').on('click', () => {
               firstname = $('#name-textbox').val();         
               city = $('#city-textbox').val();
               $('.modal').css('display', 'none');
     
               localStorage.setItem('name', firstname);
               localStorage.setItem('city', city);

               console.log(localStorage);
     
               setGreeting(firstname);              // sets top welcome message
               city !== "" ? getCurrentWeather(city) : getCurrentWeather("New York");           // gets weather data for city from input text box
               
               city !== "" ? apiCalls[1](city) : apiCalls[1]("US"); 
               
          })
     }

     $('#greeting').on('click', () => {
          localStorage.clear();
     })
     


     ///////////////// MOBILE BUTTONS ///////////////////////
     $('#right-arrow').on('click', () => {
          if(currCarouselPage + 1 < apiCalls.length){
               currCarouselPage++
               apiCalls[currCarouselPage](city);
          }else{

               $('.content-container').removeClass('shake');
               setTimeout(() => {

                    $('.content-container').addClass('shake');

               }, 10)
          }
          
     })

     $('#left-arrow').on('click', () => {
          if(currCarouselPage - 1 > -1){
               currCarouselPage--
               apiCalls[currCarouselPage](city);
          }else{
               //jiggle animation that symbolizes the end of the carousel
               $('.content-container').removeClass('shake');
               setTimeout(() => {

                    $('.content-container').addClass('shake');

               }, 10)

          }
     })



     //////////// DESKTOP BUTTONS ///////////////

     $('#right-arrow-desktop').on('click', () => {
          if(currCarouselPage + 1 < apiCalls.length){
               currCarouselPage++
               apiCalls[currCarouselPage](city);
          }else{

               //jiggle animation that symbolizes the end of the carousel
               $('.content-container').removeClass('shake');
               setTimeout(() => {

                    $('.content-container').addClass('shake');

               }, 10)
          }
     })

     $('#left-arrow-desktop').on('click', () => {
          if(currCarouselPage - 1 > -1){
               currCarouselPage--
               apiCalls[currCarouselPage](city);
          }else{
               
               $('.content-container').removeClass('shake');
               setTimeout(() => {

                    $('.content-container').addClass('shake');

               }, 10)
          }
     })


})