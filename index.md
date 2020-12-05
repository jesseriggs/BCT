# Welcome To The Better CoVid Tracker GitHub Page
Better CoVid Tracker is built on a philosophy of objective accuracy to bring current information to the public.

## Welcome to Covid Tracker Backened

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

## Web Frontend
Better CoVid Tracker utilizes the power of React JS to build comprehensive presentations of US CoVid-19 data. Follow the links to learn about BCT features, play a live version of BCT, or build and deploy your own copy.

[&#9881; CHECK OUT FEATURES](./web/features.html "See What BCT Features!")

[&#x25B6; PLAY A LIVE DEMO](https://covid.jesse-riggs.com "Interact With BCT Live!")

[&#9992; DEPLOY TO YOUR SERVER](./web/deploying.html "Learn How To Deploy BCT On Your Server!")

