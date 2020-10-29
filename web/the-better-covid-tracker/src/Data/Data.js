import React, { Component } from 'react';

class DataController
{
	constructor( props )
	{
		this.url   = props.url;
		this.view  = null;
		this.model =
			{
				data  : [],
				title : props.title,
				desc  : props.desc,
				axis  : { x : props.axis.x, y : props.axis.y },
				ticks : { x : props.ticks.x, y : props.ticks.y },
			};
	}
	setData( data )
	{
		console.log("setting data");
		console.log(data.data[0]);
		this.model.data = data.data;
		if( this.view != null )
			this.view.update( this.model );
	}
	setView( view )
	{
		this.view = view;
		this.view.update( this.model );
		this.fetchData();
	}
	fetchData( filter = '' )
	{
		fetch( this.url + filter )
			.then( res => res.json() )
			.then( res => this.setData( res ) );
	}
}

class DataFilter extends Component
{
	constructor( props )
	{
		super( props );
		this.setState({
			filterBy : props.filterBy,
			title    : props.title,
			desc     : props.desc,
		});
	}
}

export { DataController, DataFilter };
