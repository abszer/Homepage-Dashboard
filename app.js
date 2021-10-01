const gnewsApiKey = '1125705369e213547a96e9ccb952b48b';
const oWeathApiKey = '7c492c22cc3454f7043ae06d28366107';
const giphyApiKey = '2MBKmGpnmFqQmKOJBE7Pn3pPSqGwaKla';
const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December',]

let firstname = "";
let city = "";
let d = new Date();
let date = `${days[d.getDay()]}, ${months[d.getMonth()]} ${d.getDate()}`;


// api.openweathermap.org/data/2.5/weather?q=boerne&appid=7c492c22cc3454f7043ae06d28366107 // example with name of town

const getGnews = () => {
     $.ajax({
          url: `https://gnews.io/api/v4/search?q=example&token=${gnewsApiKey}`
     }).then(
          (data) => {
               console.log(data)
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

const getWeather = () => {
     $.ajax({
          url: `https://api.openweathermap.org/data/2.5/onecall?lat=33.44&lon=-94.04&appid=${oWeathApiKey}`
     }).then(
          (data) => {
               console.log(data);

               //Update weather icon depending on the weather id and icon set

               $('#current-weather').text(data.current.weather[0].description + " ");
               $('#temp').html(((data.current.temp - 275.13) * 9 /5 + 32).toFixed(0) + " &#176;F");
          },
          () => {
               console.log('bad request');
          }
     )
}

const getGiphy = () => {
     $.ajax({
          url: `http://api.giphy.com/v1/gifs/search?q=ryan+gosling&api_key=${giphyApiKey}&limit=5` // note the plus needed to join spaced words
     }).then(
          (data) => {
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
     // getGnews();
     getWeather();
     // getGiphy();
     $('#modal-submit').on('click', () => {
          firstname = $('#name-textbox').val();          //implement localstorage here
          city = $('#city-textbox').val();
          $('.modal').css('display', 'none');

          setGreeting(firstname);
     })
})