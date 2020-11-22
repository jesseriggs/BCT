import React, { Component } from 'react';
import { Template } from './Templates';
import { DataController } from './Data/Data.js';
import { PageController } from './Pages/Pages.js';

const countyMap      = require( "./map.json" );
const dataServer     = "http://localhost:3000/static/data";
const dataController = new DataController(
	{
		title : "Title",
		desc  : "",
		axis  : { x : "days", y : "people" },
		ticks : { x : [0], y : [1] },
		url   : dataServer,
		map   : countyMap,
	}
);
const pageController = new PageController( dataController );

class App extends Component
{
	constructor( props )
	{
		super( props );
		this.state = {
			inputDisplay : "none",
			page         : pageController.getPage(),
		};
	}
	render()
	{
		return(
			<Template
				inputDisplay   = { this.state.inputDisplay }
				headerText     = { this.state.page.pageName }
				dataController = { dataController }
				pageController = { pageController }
				showMenu       = { false }
			    >
				{ this.state.page }
			</Template>
		);
	}
	componentDidMount()
	{
		if( this.state.inputDisplay !== "flex" )
			this.setState( { inputDipslay : "flex" } );
	}
};

export{ App };
