import React, {Component} from 'react';
import { Buttons, SubmitButton, MenuButton } from '../Buttons/Button.js';
import { Frame } from 'arwes';

class ToolForm extends Component
{
	render(){
		const onSubmit = (e)=>{
			console.log("submit");
			e.preventDefault();
		};
		return(
			<div style={{float:"right", padding:"5px"}}>
				<form
				    onSubmit={onSubmit}
				    style={{position:"relative",display:"flex"}}
				>
					<div style={{width:"160px",paddingRight:"5px"}}>
					  <Frame>
					    <input placeholder="enter text">
					    </input>
					  </Frame>
					</div>
					<Buttons><SubmitButton /></Buttons>
				</form>
			</div>
		);
	}
}

class ToolBar extends Component
{
	render(){
		const children = this.props.children;
		return(
			<div className={"toolbar"}>
				<Frame>
					<div style={{float:"left",padding:"5px"}}>
						<Buttons><MenuButton /></Buttons>
					</div>
					{typeof children === 'function'?
						children():
						children}
					<ToolForm />
				</Frame>
			</div>
		);
	}
}

export {ToolBar};
