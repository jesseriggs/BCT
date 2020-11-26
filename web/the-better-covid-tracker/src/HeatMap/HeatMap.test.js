import React from 'react';
import ReactDOM from 'react-dom';
import { HeatMap } from './';
import { DataController } from '../Data/Data.js';

const dataserver = "http://localhost:8000";
const datacontroller = new DataController(
	{
		title : "",
		desc  : "",
		axis  : { x : 'x', y : 'y' },
		ticks : { x : [ 0 ], y : [ 1 ] },
		url   : dataserver,
		map   : {}
	}
);

it( "HeatMap renders without crashing", () => {
	const div = document.createElement('div');
	ReactDOM.render( <HeatMap controller = { datacontroller } />, div );
});
