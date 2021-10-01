const gnewsApiKey = '1125705369e213547a96e9ccb952b48b';
const oWeathApiKey = '7c492c22cc3454f7043ae06d28366107';
const giphyApiKey = '2MBKmGpnmFqQmKOJBE7Pn3pPSqGwaKla';
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
               console.log(data);
          },
          () => {
               console.log('bad request');
          }
     )
}

const getWeather = () => {
     $.ajax({
          url: `https://api.openweathermap.org/data/2.5/onecall?lat=33.44&lon=-94.04&appid=${oWeathApiKey}`
     }).then(
          (data) => {
               console.log(data);
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

$(() => {
     // getGnews();
     // getRandomFact();
     // getWeather();
     // getGiphy();
})