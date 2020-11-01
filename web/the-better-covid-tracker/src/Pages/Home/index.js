import React, { Component } from 'react';
import { Heading } from 'arwes';
import { Graph } from '../../Graphs/Graph.js';

class HomePage extends Component
{
	constructor( props )
	{
		super( props );
		this.state = {
			data : {
				title : "none",
				data : []
			}
		};
	}
	render()
	{
		const controller = this.props.controller;
		return(
			<div>
			    <Heading
				data-layer='alert'
				node = 'h5'
			      >
				Mortality
			    </Heading>
			  <Graph controller = { controller } ></Graph>
			</div>
		);
	}
	update( apiResponse )
	{
		this.setState( { data : apiResponse.data } );
	}
	getData()
	{
		fetch( this.props.dataserver )
			.then( res => res.json() )
			.then( res => this.setState({ apiResponse : res }) )
			.catch( err => err );
	}
	componentDidMount()
	{
		//this.getData();
	}
}

export { HomePage };
