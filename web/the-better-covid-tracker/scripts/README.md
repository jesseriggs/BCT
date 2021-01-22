# JSON Hard Coding
## Contents
This directory contains the following files:
* `autogen.sh` a script that downloads CSV files and then parses them into JSON by running `node parser.js`
* `clean.sh` a script that cleans this directory of generated data
* `parser.js` a script for parsing CSV files into JSON files, named by state
* `mapmaker.js` a script that uses csv data to generate map.svg.json, which holds lattitude and longitude data mapped to FIPS/UUID as key
* `update.php` a php script used to update the database with latest data
* `README.md` You are here.
## Requirements
Versions listed bellow are tested versions. Earlier versions may still work, but I haven't tried.
* `NodeJS` version 12+
* `PHP` version 7+
* `MySql`
* `Bash` or equivilant shell
* `wget`
## Generate Data And Update
**Run :**
### `./autogen.sh`
This will generate data for servering to app. This script calls the following scripts:
* `clean.sh`
* `parser.js`
* `mapmaker.js`
* `update.php`
This **Bash** script was developed to be run from a chron job, as CSSEGIS data updates daily.
### `./clean.sh`
This **Bash** script clears out all json files from data, and removes csv files from this directory.
### `./parser.sh`
This **Node** script uses csv files, pulled by `autogen.sh`, to generate json files corresponding to specific US states. These files hold timeseries data.
### `mapmaker.js`
This **Node** script generates map.svg.json, which holds longitude and latitude data of each US county, mapped to a FIPS code. map.svg.json is used by the BCT client to build an svg map of the contiguous 48 US states.
### `update.php`
This **PHP** script pulls data from updated csv files, and then populates a **MySQL** database.
## Data Pulled
Data pulled from:
`https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_confirmed_US.csv`
`https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_deaths_US.csv`
`https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/UID_ISO_FIPS_LookUp_Table.csv`
