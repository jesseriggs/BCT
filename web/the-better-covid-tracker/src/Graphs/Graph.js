import React, { Component } from 'react';
import { VictoryChart, VictoryBar, VictoryLine } from 'victory';
import material from './material.js';
import { createTheme } from 'arwes';

const TestData = [
	{ quarter: 1, earnings: 13000 },
	{ quarter: 2, earnings: 16500 },
	{ quarter: 3, earnings: 14250 },
	{ quarter: 4, earnings: 16000 },
	{ quarter: 5, earnings: 15000 },
	{ quarter: 6, earnings: 17500 },
	{ quarter: 7, earnings: 18250 },
	{ quarter: 8, earnings: 19000 }
];

class Graph extends Component
{
	render(){
		return(
			<VictoryChart
			    domainPadding={20}
			    theme={material}
			    height={430}
			    width={700}
			>
				<VictoryLine
					data={TestData}
					x = "quarter"
					y = "earnings"
				/>
			</VictoryChart>
		);
	}
}

export { Graph };
