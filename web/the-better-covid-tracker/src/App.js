import React, { Component } from 'react';
import { Template } from './Templates/Template.js';
import { DataController } from './Data/Data.js';
import { PageController } from './Pages/Pages.js';

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
