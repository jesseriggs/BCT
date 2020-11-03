import React from 'react';
import ReactDOM from 'react-dom';
import { NotFoundPage } from './index.js';

it('404 page renders without crashing', ()=>{
	const div = document.createElement('div');
	ReactDOM.render(<NotFoundPage />, div);
});
