from flask import request, jsonify, Blueprint
import json

from flaskr.db import get_db

bp = Blueprint('data', __name__)


@bp.route('/state/confirmed')
def state_level_confirmed():
    db = get_db()
    values = db.execute(
        'SELECT *'
        ' FROM confirmed c'
    ).fetchall()
    data = [dict(row) for row in values]
    return jsonify(data)

@bp.route('/state/deaths')
def state_level_deaths():
    db = get_db()
    values = db.execute(
        'SELECT *'
        ' FROM deaths d'
    ).fetchall()
    data = [dict(row) for row in values]
    return jsonify(data)


# Num of confirmed cases divided by the population
@bp.route('/state/confirmed/population')
def state_level_confirmed_population():
    db = get_db()
    values = db.execute(
        'SELECT c.city, c.state, (cast(c.cum_total_confirmed_to_date AS float) / cast(d.population AS float)) AS confirmed_per_pop'
        ' FROM confirmed c JOIN deaths d ON (c.fips == d.fips)'
    ).fetchall()
    data = [dict(row) for row in values]
    return jsonify(data)
    

# Num of deaths divided by the population
@bp.route('/state/deaths/population')
def state_level_deaths_population():
    db = get_db()
    values = db.execute(
        'SELECT city, state, (cast(cum_total_deaths_to_date AS float) / cast(population AS float)) AS deaths_div_pop'
        ' FROM deaths d'
    ).fetchall()
    data = [dict(row) for row in values]
    return jsonify(data)
    

# Num of deaths divided by num cases in that state
@bp.route('/state/dpc')
def state_level_deaths_per_case():
    db = get_db()
    values = db.execute(
        'SELECT d.city, d.state, (cast(d.cum_total_deaths_to_date AS float) / cast(c.cum_total_confirmed_to_date AS float)) AS deaths_per_case'
        ' FROM deaths d JOIN confirmed c ON (d.fips == c.fips)'
    ).fetchall()
    data = [dict(row) for row in values]
    return jsonify(data)
