import React, { Component } from 'react';
import { VictoryAxis, VictoryChart, VictoryLine } from 'victory';
import material, { colors } from './material.js';
//import { Heading } from 'arwes';

const TestData = [
	{ quarter: 1, earnings: 13000 },
	{ quarter: 2, earnings: 16500 },
	{ quarter: 3, earnings: 14250 },
	{ quarter: 4, earnings: 16000 },
	{ quarter: 5, earnings: 15000 },
	{ quarter: 6, earnings: 17500 },
	{ quarter: 7, earnings: 17250 },
	{ quarter: 8, earnings: 19000 }
];

const TestData2 = [
	{ quarter: 1, earnings: 18000 },
	{ quarter: 2, earnings: 14500 },
	{ quarter: 3, earnings: 16250 },
	{ quarter: 4, earnings: 16000 },
	{ quarter: 5, earnings: 14500 },
	{ quarter: 6, earnings: 16500 },
	{ quarter: 7, earnings: 15250 },
	{ quarter: 8, earnings: 13000 }
];

class Graph extends Component
{
	render(){
		const dataset = Array.isArray(this.props.dataset) ?
					this.props.dataset :
					[ TestData, TestData2 ];
		return(
		    <div style = {{
			    marginTop:"-40px"
		    }}>
			<VictoryChart
			    domainPadding = { 0 }
			    theme         = { material }
			    height        = { 430 }
			    width         = { 700 }
			    animate       = {{
				duration : 2000,
				//delay    : 2000,
				easing   : "exp"
			    }}
			>
				<VictoryAxis
				    tickValues = {[ 1, 2, 3, 4, 5, 6, 7, 8 ]}
				    label      = "Mortality Rate"
				    style      = {{
		    			axisLabel  : { padding : 20 },
				 	tickLabels : { padding : 2 }
				    }}
				/>
				<VictoryAxis
				    dependentAxis
				    tickFormat = { ( x )=>(
					    		`$${ x / 1000 }M` )}
				    label      = "Earnings"
				    style      = {{
		    			axisLabel  : { padding: 37 },
				 	tickLabels : { padding: 2 }
				    }}
				/>
				<VictoryLine
					data  = { dataset[ 0 ] }
					x     = "quarter"
					y     = "earnings"
					style = {{
					    data : { stroke : colors[ 5 ]}
					}}
				/>
				<VictoryLine
					data  = { dataset[ 1 ]}
					x     = "quarter"
					y     = "earnings"
					style = {{
					    data : { stroke: colors[ 0 ]}
					}}
				/>
			</VictoryChart>
		    </div>
		);
	}
}

export { Graph };
