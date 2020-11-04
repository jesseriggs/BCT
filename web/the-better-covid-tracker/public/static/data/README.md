# JSON Hard Coding
## Contents
This directory contains four files:
* parser.js a script for parsing CSV files into JSON files, named by state.
* autogen.sh a script that downloads CSV files and then parses them into JSON by running `node parser.js`
* clean.sh a script that cleans this directory of generated data.
* README
## Generate JSON Files
Run :
### `./autogen.sh`
This will generate hard-coded json files for servering to app.
## Data Pulled
Data pulled from:
`https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_confirmed_US.csv`
`https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_deaths_US.csv`
`https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/UID_ISO_FIPS_LookUp_Table.csv`
