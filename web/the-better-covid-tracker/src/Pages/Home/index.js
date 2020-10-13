import React, { Component } from 'react';
import { Heading } from 'arwes';
import { Graph } from '../../Graphs/Graph.js';

class HomePage extends Component
{
	render()
	{
		return(
			<div>

			    <Heading
				data-layer='alert'
				node = 'h5'
			    >
				Mortality
			    </Heading>

			  <Graph></Graph>
			</div>
		);
	}
}

export { HomePage };
