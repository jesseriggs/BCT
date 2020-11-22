import React from 'react';
import ReactDOM from 'react-dom';
import { NotFoundPage } from './index.js';
import { masterSounds } from '../../Templates'
import { SoundsProvider, ThemeProvider, createSounds, createTheme } from 'arwes'

const theme = createTheme();

it('404 page renders without crashing', ()=>{
	const div = document.createElement('div');
	ReactDOM.render(
		<ThemeProvider theme = { theme } >
			<SoundsProvider
				sounds = { createSounds( masterSounds ) }
			    >
				<NotFoundPage />
			</SoundsProvider>
		</ThemeProvider>, div);
});
