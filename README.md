# Homepage Dashboard
### Purpose


This web app was built with the purpose of being set as a homepage to keep local news, stocks, and a five day forecast all in one place when the browser is opened.


### Technologies Used

- HTML
- CSS 
- JavaScript / JQuery
- AJAX
- Gnews API (3rd party Google News API)
- Open Weather API (gathering weather info for header and 5 day forecast page)
- Random Fact API (Random facts [self explanatory])
- AlphaVantage API (Stock market info)


### Approach

This project was broken up into three sections: 

- Initial design and wireframing
- Implementing basic API functionality and data to DOM
- Styling the app and fixing bugs

For the majority of the development of this app, everything went smoothly and according to plan. However, one of the trickiest portions of this app was creating a way for the 'get' functions to not only call the APIs but to post the data returned inside of the AJAX function reapetedly. The solution I developed is not ideal, but I was not able to create a way to separate the 'get' and 'set' functions due to the asynchronous nature of obtaining the API data. In future versions, I would like to utilize **sessionStorage** to limit the number of times I make a calls to any of the APIs. 




### Link to Deployed App

- https://elastic-mcnulty-3b50c8.netlify.app/


### Features to Implement 

- Create sessionStorage in order to limit API calls and dump after x hours have passed
- Create night mode and custom color themes
- Create a search bar for news, stocks, and weather pages
- Create additional pages that a user can add
