## Welcome to GitHub Pages

You can use the [editor on GitHub](https://github.com/Pewcrafter/BetterCovidTracker/edit/gh-pages/index.md) to maintain and preview the content for your website in Markdown files.

Whenever you commit to this repository, GitHub Pages will run [Jekyll](https://jekyllrb.com/) to rebuild the pages in your site, from the content in your Markdown files.

### Markdown

Markdown is a lightweight and easy-to-use syntax for styling your writing. It includes conventions for

```markdown
Syntax highlighted code block

# Header 1
## Header 2
### Header 3

- Bulleted
- List

1. Numbered
2. List

**Bold** and _Italic_ and `Code` text

[Link](url) and ![Image](src)
```

Welcome to Covid Tracker Backened

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
