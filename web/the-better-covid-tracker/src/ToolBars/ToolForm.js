/**
 * @class ToolForm
 * @description class instance displays a dropdown selector where states may be
 * selected. This triggers state counties to be displayed in CountySelector
 * instance.
 * @param controller of type DataController
 */
import React, { Component } from 'react';
import { Frame } from 'arwes';
import { CountySelector } from './';

const getUniqueID = () =>
{
	var id = Math.floor( Math.random() * Number.MAX_SAFE_INTEGER );
	return id;
}

class ToolForm extends Component
{
	constructor( props )
	{
		super( props );
		this.stateItem    = "";
		this.countyItem   = "";
		this.onSubmit     = this.onSubmit.bind( this );
		this.onStateClick = this.onStateClick.bind( this );
		this.controller   = props.controller;
		this.statesArr    = this.controller.getStates();
	}
	onSubmit( e )
	{
		if( Boolean( this.stateItem.value )
				&& this.controller ){
			this.controller.fetchData(
				this.stateItem.value,
				this.countyItem.value
					? this.countyItem.value
					: "" );
		}
		e.preventDefault();
	}
	render()
	{
		const display    = this.props.showInput ? "flex" : "none";
		const controller = this.controller;
		return(
			<div style = {{
					float   : "right",
					padding : "5px",
					display : display
			    }}>
				<form
				    onSubmit = { this.onSubmit }
				    style    = {{
					position : "relative",
					display  : "flex"
				    }}>
					<div style = {{
						width        : "160px",
						paddingRight : "5px"
					}}>
					  <Frame>
					    <select
						id = "bct-stateselector"
						onChange = { this.onStateClick }
						ref = { ( a ) =>
							this.stateItem = a } >
						{ this.getOptions() }
					    </select>
					  </Frame>
					</div>
					<div style = {{
						width        : "160px",
						paddingRight : "5px"
					}}>
					  <Frame>
					  	<CountySelector
						    form       = { this }
						    controller = { controller }
						    init       = ""
						  >
						</CountySelector>
					  </Frame>
					</div>
				</form>
			</div>
		);
	}
	setCountySelector( countySelector )
	{
		this.countySelector = countySelector;
	}
	setSounds( sounds )
	{
		this.sounds = sounds;
	}
	onStateClick( event )
	{
		this.sounds &&
			this.sounds.logo.play();
		this.countySelector &&
			this.countySelector.update( event.target.value );
	}
	getOptions()
	{
		const states  = this.controller.getStates();
		return(
			<>
			<option value = "" hidden>
				--State--</option>
			{ states.map( state => (
				<React.Fragment key = { getUniqueID() }>
				  <option value = { state }>
				     { state }</option>
				</React.Fragment>
			       ))
			}</>
		);
	}
}

export default ToolForm;
