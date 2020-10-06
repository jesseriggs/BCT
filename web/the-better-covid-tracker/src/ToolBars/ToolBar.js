import React, {Component} from 'react';
import { Buttons } from '../Buttons/Button.js';
import { Frame } from 'arwes';

class ToolForm extends Component
{
	render(){
		const onSubmit = ()=>{console.log("submit")};
		return(
			<div style={{float:"right"}}>
				<form
				    onSubmit={onSubmit}
				    style={{position:"relative",display:"flex"}}
				>
					<div style={{width:"160px"}}>
					  <Frame>
					    <input placeholder="enter text">
					    </input>
					  </Frame>
					</div>
					<Buttons />
				</form>
			</div>
		);
	}
}

class ToolBar extends Component
{
	constructor(){
		super(...arguments);
	}
	render(){
		const children = this.props.children;
		return(
			<div className={"toolbar"}>
				<ToolForm />
				{typeof children === 'function'?
					children():
					children}
			</div>
		);
	}
}

export {ToolBar};
