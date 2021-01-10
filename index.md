# Welcome To The Better CoVid Tracker GitHub Page
Better CoVid Tracker is built on a philosophy of objective accuracy to bring current information to the public.

<iframe width="994" height="559" src="https://www.youtube.com/embed/VftNskW37SE" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## Welcome to Covid Tracker Backend

The backend is an API for the BetterCovidTracker. It uses the most current Johns Hopkins data to fill a backend SQLite3 database and power the API.

Running the API

The API is written is python using the Flask framework. As a result the following are required:

- Python 3.x
- Flask 1.1.x

To run, Issue the following commands:

- venv/bin/activate
- export FLASK_APP=flaskr
- export FLASK_APP=development
- flask run
The server will run on port 5000.

API Endpoints

/state/confirmed /state/deaths /state/confirmed/population /state/deaths/population /state/dpc (Deaths per Capita)

## iOS App
The Better Covid Tracker app utilizes CocoaPods to generate amazing graphs from the data provided by our backend API. To use the app, simply download the App file and install it on an iOS device, or download it from the app store (this option is still in the works)!

[&#10149; Download the App](https://github.com/Pewcrafter/BetterCovidTracker/tree/master/App "App directory")

[&#10149; Application Demo](https://www.youtube.com/watch?v=3cgpXtcDafk "Application Demo")

## Web Frontend
Better CoVid Tracker utilizes the power of React JS to build comprehensive presentations of US CoVid-19 data. Follow the links to learn about BCT features, play a live version of BCT, or build and deploy your own copy.

[&#9881; CHECK OUT FEATURES](./web/features.html "See What BCT Features!")

[&#x25B6; PLAY A LIVE DEMO](https://covid.jesse-riggs.com "Interact With BCT Live!")

[&#9992; DEPLOY TO YOUR SERVER](./web/deploying.html "Learn How To Deploy BCT On Your Server!")
