import React, { Component } from 'react';
import { Heading } from 'arwes';
import './index.css';

/**
 * @class Legend
 * @description renders a Legend to describe symbols used in graphs and charts.
 * 		Symbol keys are described with css. Create a class in your
 * 		style sheet called "bct-legend-(class name)" and add table
 * 		stylings for each row.
 */
class Legend extends Component
{
	/**
	 * @constructor
	 * @description set state to default dataset.
	 */
	constructor( props )
	{
		super( props );
		this.state = {
			caption : '',
			dataset : null,
			haeders : null,
			mounted : false,
			name    : ''
		};
	}

	/**
	 * @method render
	 * @description Renders a Legend component. This is the only required
	 * 	method of the abstract Component class.
	 */
	render()
	{
		const caption = this.state.caption;
		const headers = this.state.headers;
		const dataset = this.state.dataset;
		const name    = this.state.name;

		if( dataset == null ) return( <></> );

		return(
		  <div class = 'bct-legend' >
		    <Heading data-layer = 'alert' node = 'h4' >
		      Legend
		    </Heading>
		    <table id = { 'bct-legend-' + name } >
		      <caption>{ caption }</caption>
		      <thead>
		        <tr>
			  <th>Key</th>
			  { headers.map( head => (
		            <th scope = 'col'>{ head }</th>
			  ))}
			</tr>
		      </thead>
		      <tbody>
		        { dataset.map( datarow => (
			  <tr><th scope = 'row'></th>{ datarow.map( data => (
			    <td>{ ( typeof(data) === 'function' )
			            ? data() : data }</td>
			  ))}</tr>
			))}
		      </tbody>
		    </table>
		  </div>
		);
	}

	/**
	 * @method componentDidMount
	 * @overrides React.Component.componentDidMount()
	 * @description reports to DataController
	 */
	componentDidMount()
	{
		if( this.state.mounted ) return;
		this.props.controller.setLegend( this );
		this.setState( { mounted : true } );
	}

	/**
	 * @method update
	 * @param String caption: caption of legend
	 * @param Array headers: array of strings that describe each column
	 * @param Array dataset: array of data
	 * @description updates the legend to match current data
	 */
	update( caption, headers, dataset, name )
	{
		this.setState({
			caption : caption,
			headers : headers,
			dataset : dataset,
			name    : name
		});
	}
}
export default Legend;
