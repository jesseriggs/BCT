import React, {Component} from 'react';

class ToolBar extends Component
{
	constructor(){
		super(...arguments);
	}
	render(){
		return(
			<div>
				<p>This is a toolbar.</p>
				{this.props.children}
			</div>
		);
	}
}

export {ToolBar};
