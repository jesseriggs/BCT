import React, {Component} from 'react';
import {ToolBar} from '../ToolBars/ToolBar.js';

class Template extends Component
{
	constructor(){
		super(...arguments);

	}
	render(){
		return(
			<div>
				<p>This is a template.</p>
				<ToolBar>This is where tools go</ToolBar>
				{this.props.children}
			</div>
		);
	}
}

export {Template};
