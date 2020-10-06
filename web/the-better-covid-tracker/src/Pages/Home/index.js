import React, { Component } from 'react';
import { Graph } from '../../Graphs/Graph.js';

class HomePage extends Component
{
	constructor(props){
		super(props);
	}

	render(){
		return(
			<div>
			  <p>Hello Home</p>
			  <Graph></Graph>
			</div>
		);
	}
}

export {HomePage};
