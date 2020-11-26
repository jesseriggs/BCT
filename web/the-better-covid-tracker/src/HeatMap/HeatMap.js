import React, { Component } from 'react';
import countiesJSON from './map.svg.json';
import './index.css';

/**
 * @class HeatMap
 * @extends React.Component
 * @description instance renders a HeatMap to be presented in page view
 */
class HeatMap extends Component
{
	/**
	 * @constructor
	 * @overrides React.Component.constructor
	 * @param DataController props.controller: controller to calllback to
	 * 	when componentDidMount(); HeatMap view will be controlled and
	 * 	updated from this controller.
	 */
	constructor( props )
	{
		super( props );
		this.state = {
			mounted : false,
			heatmap : false,
			opacity : 0
		};
	}

	/**
	 * @method render
	 * @description method required by React.Component, renders html view
	 * 	of HeatMap, which contains an SVG heat map of the contenental
	 * 	United States.
	 */
	render()
	{
		const opacity = this.state.opacity;
		return (
		  <div
		  	className = "bct-heatmap-wrapper"
			style     = {{ opacity : opacity }}
		    >
		      <div className = "bct-heatmap">
			<svg
				xmlns   ="http://www.w3.org/2000/svg"
				height  = "100%"
				width   = "100%"
				viewBox = "0 0 327 198"
			    >
				{ this.getCounties() }
			</svg>
		      </div>
		  </div>
		);
	}

	/**
	 * @method getCounties
	 * @description get a map of React.Fragments containing SVG cirlce
	 * 	elements, each of which represents a county in the US; Circle
	 * 	x, y coorodinates correspond to county's lattitude and
	 * 	longitudal coordinates. Circle radius is logarithmically
	 * 	proportional to the population of the county. Circle Opacity
	 * 	corresponds to a value attained from CoVid statistics.
	 */
	getCounties()
	{
		const counties = countiesJSON;
		const heatmap  = this.state.heatmap;
		if( !heatmap ) return (<></>);
		return(
		  <g>
		    { counties.map( county => (
			<React.Fragment key = { county.id }>
				<circle
					id          = { county.id }
					cx          = { county.cx }
					cy          = { county.cy }
					r           = { this.getFrom(
							county.id, 'r' ) }
					stroke      = "rgb(38,218,253)"
					strokeWidth = { this.getFrom(
							county.id, 'stroke' ) }
					fill        = "transparent"
					opacity     = { this.getFrom(
							county.id, 'opacity' ) }
				    />
			</React.Fragment>
		    ))}
		  </g>
		);
	}

	/**
	 * @method getFrom
	 * @param String id: key to county Object
	 * @param String key: key to property to be returned
	 * @return Obj property: value of property mapped to by id and key
	 */
	getFrom( id, key )
	{
		var i = "840" + ( "00000" + id ).slice( -5 );
		var c = this.state.heatmap[ i ];
		if( !c ) return 1;
		var v = c[key];
		return v;
	}

	/**
	 * @method componentDidMount
	 * @overrides React.Component.componentDidMount()
	 * @description reports this instance of view to controller
	 */
	componentDidMount()
	{
		if( this.state.mounted ) return;
		this.props.controller.setHeatView( this );
		this.setState( { mounted : true } );
	}

	/**
	 * @method update
	 * @description updates state of HeatMap instance and triggers
	 * 	re-render. This is called by controller when model updates.
	 */
	update( heatmap )
	{
		this.setState( { heatmap : heatmap, opacity : 1 } );
	}
}

export default HeatMap;
