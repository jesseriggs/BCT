import React from 'react';
import ReactDOM from 'react-dom';
import { StartPage } from './index.js';
import { ThemeProvider, createTheme } from 'arwes';

const theme = createTheme();

it('Start page renders without crashing', ()=>{
	const div = document.createElement('div');
	ReactDOM.render(
		<ThemeProvider theme = { theme }>
			<StartPage theme = { theme } buttonLink = "asdf" />
		</ThemeProvider>, div);
});
