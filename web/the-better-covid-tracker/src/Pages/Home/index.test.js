import React from 'react';
import ReactDOM from 'react-dom';
import { HomePage } from './index.js';
import { DataController } from '../../Data/Data.js';

const dataServer     = "http://localhost:9000/data";
const dataController = new DataController(
	{
		title : "Title",
		desc  : "",
		axis  : { x : "x", y : "y" },
		ticks : { x : [0], y : [1] },
		url   : dataServer,
	}
);

it('Home page renders without crashing', ()=>{
	const div = document.createElement('div');
	ReactDOM.render(<HomePage datacontroller = { dataController } />, div);
});
