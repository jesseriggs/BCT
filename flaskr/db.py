import sqlite3

import click
from flask import current_app, g
from flask.cli import with_appcontext


def get_db():
    if 'db' not in g:
        g.db = sqlite3.connect(
            current_app.config['DATABASE'],
            detect_types=sqlite3.PARSE_DECLTYPES
        )
        g.db.row_factory = sqlite3.Row

    return g.db


def close_db(e=None):
    db = g.pop('db', None)

    if db is not None:
        db.close()

def init_db():
    db = get_db()

    with current_app.open_resource('schema.sql') as f:
        db.executescript(f.read().decode('utf8'))

def clean_data():
    import pandas as pd
    from datetime import date, timedelta


    todays_str = (date.today() - timedelta(days=1)).strftime("%m/%d/%y")
    cols = ["UID", "Admin2","Province_State", "Population", todays_str]

    # Deaths data
    deaths_data = pd.read_csv("https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_deaths_US.csv", usecols=cols)
    deaths_data.columns = ["fips", "city", "state", "population", "cum_total_deaths_to_date"]

    deaths_data.to_csv("data/deaths.csv",index=False)

    cols.remove("Population")
    # Confirmed Data
    confirmed_data = pd.read_csv("https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_confirmed_US.csv", usecols=cols)

    confirmed_data.columns = ["fips", "city", "state", "cum_total_confirmed_to_date"]

    confirmed_data.to_csv("data/confirmed.csv", index=False)
    print("Latest data gathered and cleaned.")

def load_db():
    import csv, sqlite3
    import pandas as pd


    db = get_db()
    cur = db.cursor()

    # Confirmed
    with open('data/confirmed.csv','r') as fin:
        dr = csv.DictReader(fin)
        data = [(i['fips'], i['city'], i['state'], i['cum_total_confirmed_to_date']) for i in dr]
    cur.executemany("INSERT INTO confirmed (fips, city, state, cum_total_confirmed_to_date) VALUES (?, ?, ?, ?);",data)

    # Deaths
    with open('data/deaths.csv','r') as fin:
        dr = csv.DictReader(fin)
        data = [(i['fips'], i['city'], i['state'], i['population'], i['cum_total_deaths_to_date']) for i in dr]
    cur.executemany("INSERT INTO deaths (fips, city, state, population, cum_total_deaths_to_date) VALUES (?, ?, ?, ?, ?);",data)

    db.commit()
    db.close()
    print("DB loaded with data.")


@click.command('init-db')
@with_appcontext
def init_db_command():
    """Clear the existing data and create new tables."""
    init_db()
    clean_data()
    load_db()
    print('Initialized the database.')

def init_app(app):
    app.teardown_appcontext(close_db)
    app.cli.add_command(init_db_command)

init_db_command()
