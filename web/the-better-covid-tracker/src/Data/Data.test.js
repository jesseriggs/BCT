/**
 * Test Suite for Data
 *
 * Data is an abstraction of a controller and model.
 */

import { DataController } from './Data.js';

test(
	'DataController assingment',
	()=>{
		const model      =
			{
				data  : [],
				title : "Title",
				desc  : "Description",
				axis  : { x : 'xaxis', y : 'yaxis' },
				ticks : { x : 'xticks', y : 'yticks' },
			};
		const controller = new DataController( model );
		expect( controller.model ).toEqual( model );
	}
);
