# The Better Covid Tracker
The Better Covid Tracker is a React App. Get started by cloning this repo, and then running:
### `npm install`
### `npm start`

## Docker
BCT is ready to be deployed from Docker. From Powershell run:
### `docker build  -t the-better-covid-tracker:dev .`
### `docker run -it --rm -v ${PWD}:/app -v /app/node_modules -p 3001:3000 -e CHOKIDAR_USEPOLLING=true the-better-covid-tracker:dev`
BCT can now be accessed from [http://localhost:3001](http://localhost:3000).

## Available Scripts
In the project directory, you can run:
### `npm start`
Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
The page will reload if you make edits.<br />
**Note:** In order to use HeatMap, an instance of flaskr database server must also be running on port 5000. After installing Python and Flask, from `../../flaskr` run:
```sh
bash$ export FLASK_APP=__init__.py
bash$ flask run
```
### `npm test`
Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.
### `npm run build`
Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.
The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!
## Preparing For Deployment
This is done in three steps:
* prepare Apache server to run an instance of a Flask app
* prepare and build Better Covid Tracker web app
* scp the newly built application to the Apache server
### Preparing Apache
**Note:** If you'd like to run this on your personal server, without CPanel, chekc out [mod wsgi](https://modwsgi.readthedocs.io/en/master/) for more information.
The easiest way to do this is probably with Apache Passenger, from `CPanel > Software > Setup Python App`, and then click `CREATE APPLICATION`.
Select Python 3.
Now enter the application root `/path/to/application/root/api`. And then enter your application URL `host/api`.
**Note:** Both of these paths must end with `api`.
Application startup file must be `data.py` and entry point must be `application`.
Now, hit `SAVE` and then `RESTART`.
### Prepare And Build Web App
First, we want to change the database server from localhost to our new Appache entry point.
```javascript
// src/Data/Data.js
// const confirmed    = "/state/confirmed";
// const deaths       = "/state/deaths";
const confirmed    = "/api/state/confirmed";
const deaths       = "/api/state/deaths";
```
Now, from `BetterCovidTracker/web/the-better-covid-tracker/` run:
```sh
bash$ npm run build
```
After this script completes, there will be a directory `build/`, which contains the new build. This is where we will copy flaskr.
```sh
bash$ cp -r ../../flaskr build/api/
bash$ cp -r ../../instance build/api/
```
Now, if all goes well?, we should be able to scp everything to our server, and things will just magically run.
```sh
bash$ scp -r ./ user@host.com:/path/to/application/root/
```
**Note:** this will overwrite the data.js entrypoint that was automatically created by Passenger. This is correct. :)
Now, check your page to see if it's installed correctly.
