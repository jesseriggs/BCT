import React, { Component } from 'react';
import { VictoryAxis, VictoryChart, VictoryLine } from 'victory';
import material, { colors } from './material.js';

class Graph extends Component
{
	constructor( props )
	{
		super( props );
		const controller = props.controller;
		const model      = controller.model;
		this.state =
			{
				axis  : {
					x : model.axis.x,
					y : model.axis.y,
				},
				data  : model.data,
				show  : false,
				title : model.title
			};
	}
	render()
	{
		const op = ()=>{ return this.state.show ? 1 : 0; };
		return(
		    <div style = {{
			    opacity    : op(),
			    marginTop  : "-40px",
			    marginLeft : "-10px",
			    transition : "opacity 2s",
			    position   : "relative",
			    maxHeight  : "100%",
			    maxWidth   : "100%",
			    height     : "100%",
			    paddingBottom : "10px",
		      }}>
			<VictoryChart
			    appears       = { true }
			    domainPadding = { 0 }
			    theme         = { material }
			    height        = { 430 }
			    width         = { 700 }
			    animate       = {{
				duration : 2000,
				easing   : "exp"
			    }}
			>
				<VictoryAxis
				    label      = { this.state.axis.x }
				    style      = {{
		    			axisLabel  : { padding : 20 },
				 	tickLabels : { padding : 2 }
				    }}
				/>
				<VictoryAxis
				    dependentAxis
				    tickFormat = { ( x )=>(
					    		`${ x / 1000 }K` )}
				    label      = { this.state.axis.y }
				    style      = {{
		    			axisLabel  : { padding: 37 },
				 	tickLabels : { padding: 2 }
				    }}
				/>
				<VictoryLine
					data  = { this.state.data.confirmed }
					x     = "day"
					y     = "confirmed"
					style = {{
					    data : { stroke : colors[ 5 ]}
					}}
				/>
				<VictoryLine
					data  = { this.state.data.deaths }
					x     = "day"
					y     = "deaths"
					style = {{
					    data : { stroke : colors[ 7 ]}
					}}
				/>
			</VictoryChart>
		    </div>
		);
	}
	update( model )
	{
		this.setState({
			axis : {
				x : model.axis.x,
				y : model.axis.y,
			},
			data  : model.data,
			title : model.title,
		});
	}
	componentDidMount()
	{
		if( !this.state.show )
			setTimeout( ()=>{
				this.setState({ show : true });
			}, 100 );
		this.props.controller.setView( this );
	}
}

export { Graph };
