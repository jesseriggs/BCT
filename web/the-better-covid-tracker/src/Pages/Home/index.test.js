import React from 'react';
import ReactDOM from 'react-dom';
import { HomePage } from './index.js';
import { DataController } from '../../Data/Data.js';
import { ThemeProvider, createTheme } from 'arwes';

const dataServer     = "http://localhost:9000/data";
const dataController = new DataController(
	{
		title : "Title",
		desc  : "",
		axis  : { x : "x", y : "y" },
		ticks : { x : [0], y : [1] },
		url   : dataServer,
		map   : {}
	}
);

const theme = createTheme();

it('Home page renders without crashing', ()=>{
	const div = document.createElement('div');
	ReactDOM.render(
		<ThemeProvider theme = { theme }>
			<HomePage datacontroller = { dataController } />
		</ThemeProvider>, div);
});
