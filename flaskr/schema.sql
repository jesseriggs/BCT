DROP TABLE IF EXISTS confirmed;
DROP TABLE IF EXISTS deaths;

CREATE TABLE confirmed (
  fips INTEGER PRIMARY KEY,
  city TEXT NOT NULL,
  state TEXT NOT NULL,
  cum_total_confirmed_to_date INT
);

CREATE TABLE deaths (
  fips INTEGER PRIMARY KEY,
  city TEXT NOT NULL,
  state TEXT NOT NULL,
  population INTEGER,
  cum_total_deaths_to_date INT
);
