import React from 'react';
import ReactDOM from 'react-dom';
import { NotFoundPage } from './index.js';
import { masterSounds } from '../../Templates/Template.js'
import { SoundsProvider, createSounds } from 'arwes'

it('404 page renders without crashing', ()=>{
	const div = document.createElement('div');
	ReactDOM.render(
		<SoundsProvider
			sounds = { createSounds( masterSounds ) }
		    >
			<NotFoundPage />
		</SoundsProvider>, div);
});
