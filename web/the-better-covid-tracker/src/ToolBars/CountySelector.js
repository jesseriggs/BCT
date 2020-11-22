import React, { Component } from 'react';

// create unique id for react fragments. This is required of React.
const getUniqueID = () =>
{
	var id = Math.floor( Math.random() * Number.MAX_SAFE_INTEGER );
	return id;
}

/**
 * @class CountySelector
 * @description instance renders selector that allows user to select a county.
 */
class CountySelector extends Component
{
	/**
	 * @constructor
	 * @param props.form form that holds reference to county, allows
	 * 	CountySelector instance to communicate with parent
	 * @param props.controller DataController to which selection will be
	 * 	passed.
	 * @param props.init initial state ( Idaho ) to which we set
	 * 	this.state.state.
	 */
	constructor( props )
	{
		super( props );
		this.form       = props.form;
		this.controller = props.controller;
		this.countyItem = { value : "" };
		this.state      = { state : props.init, mounted : false };
	}
	/**
	 * @methos render
	 * @description required method of Component, renders component. Before
	 * 	actual render, counties are updated to match state ( Idaho ).
	 * 	These counties are pulled from DataController.
	 */
	render()
	{
		const counties =
			this.controller.getCounties( this.state.state );
		return ( <> { this.getOptions( counties ) } </> );
	}
	/**
	 * @method componentDidMount
	 * @overrides Component.componentDidMount
	 * @description triggered on after component mount, in React lifecycle
	 * 	after we know that the component exists, we will notify the
	 * 	parent of its existance. This should only be done once, or it
	 * 	will loop infinitely. this.state.mounted ensures that this
	 * 	does not happen.
	 */
	componentDidMount()
	{
		if( this.state.mounted ) return;
		this.props.form.setCountySelector( this );
		this.setState( { mounted : true } );
	}
	/**
	 * @method update
	 * @description updates state of CountySelector Component. Called by
	 * 	parent when its state ( Idaho ) is updated.
	 * @param state object literal that contains properties of component.
	 * 	This method rerenders the component after update.
	 */
	update( state )
	{
		this.setState( { state : state } );
	}
	/**
	 * @method getOptions
	 * @description returns a fragmented list of counties: see
	 * 	React.Fragment. onChange is triggered on selection of county.
	 * 	This function will call props.form.onSubmit(); the parent form.
	 */
	getOptions( counties )
	{
		const form = this.form;
		return(<select
			    ref = { ( c ) => form.countyItem = c }
			    onChange = { ( e ) => { form.onSubmit( e ) } }
			  >
			<option value = "" hidden>
				--County--</option>
			{counties.map( county => (
				<React.Fragment key = { getUniqueID() }>
					<option
						value = { county }
					  >
					    { county }
					</option>
				</React.Fragment>
			))}</select>);
	}
}

export default CountySelector;
