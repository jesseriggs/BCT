/**
 * Data contains abstractions for implementing an MVC in React.
 */
import { Component } from 'react';

/**
 * DataController contains a state model, and methods for business logic. This
 * is built to attach to some React component. The component acts as a view
 * that will present data when it is updated.
 */
class DataController
{
	constructor( props )
	{
		this.county = "";
		this.url    = props.url;
		this.view   = null;
		this.map    = props.map;
		this.states = Object.keys( props.map );
		this.model  = {
			data   : { confirmed : [], deaths : [] },
			title  : props.title,
			desc   : props.desc,
			axis   : { x : props.axis.x, y : props.axis.y },
			ticks  : { x : props.ticks.x, y : props.ticks.y },
			map    : {}
		};
	}
	getStates()
	{
		return this.states;
	}
	getCounties( state )
	{
		if( !Boolean( state ) ) return [];
		return this.map[ state ].counties;
	}
	setData( data )
	{
		console.log("setting data");
		var county = data.counties[ this.county ];
		this.model.title = county ? county.combined : "";
		this.model.data = {
				confirmed : county ? county.confirmed : [],
				deaths    : county ? county.deaths : []
			};
		this.view &&  this.view.update( this.model );
		this.title && this.title.update( this.model.title );
	}
	setTitle( title )
	{
		this.title = title;
		this.title.update( this.model.title );
	}
	setView( view )
	{
		this.view = view;
		this.view.update( this.model );
		this.fetchData();
	}
	fetchData( state = 'Idaho', county = 'Ada' )
	{
		this.county = county;
		var request = this.url + "/" + state + ".json";
		console.log( request );
		fetch( request )
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
