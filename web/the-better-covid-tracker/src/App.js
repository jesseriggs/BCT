import React, { Component } from 'react';
import { HomePage } from './Pages/Home/index.js';
import { Template } from './Templates/Template.js';
import { DataController } from './Data/Data.js';

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

const homepage = {
	headerText : "Home",
	content    : ()=>{
		return(
			<HomePage
				dataserver = { dataServer }
				controller = { dataController }
			/>
		);
	},
};

class App extends Component
{
	constructor( props )
	{
		super( props );
		this.state = { showInput : false };
		this.page  = homepage;
	}
	render()
	{
		return(
			<Template
				showInput  = { this.state.showInput }
				headerText = { this.page.headerText }
				controller = { dataController }
			    >
				{ this.page.content }
			</Template>
		);
	}
	componentDidMount()
	{
		if( !this.state.showInput )
			this.setState( { showInput : true } );
	}
};

export{ App };
