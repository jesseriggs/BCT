import React from 'react';
import ReactDOM from 'react-dom';
import { AboutPage } from './index.js';

it('About page renders without crashing', ()=>{
	const div = document.createElement('div');
	ReactDOM.render(<AboutPage />, div);
});
