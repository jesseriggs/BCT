import React from 'react';
import ReactDOM from 'react-dom';
import { AboutPage } from './index.js';
import { ThemeProvider, createTheme } from 'arwes';

const theme = createTheme();

it('About page renders without crashing', ()=>{
	const div = document.createElement('div');
	ReactDOM.render(
		<ThemeProvider theme = { theme } >
			<AboutPage />
		</ThemeProvider>, div);
});
