import React, { Component } from 'react';
import { ToolBar } from '../ToolBars/ToolBar.js';
import { Arwes, Frame, ThemeProvider, createTheme } from 'arwes';
import '../styles/index.css'

class MainContainer extends Component
{
	render(){
		const children = this.props.children;

		return(
			<div className={"main-container"}>
			  <Frame
				show={true}
				style={{height:"85%"}} >
				<div style={{
					backgroundColor:"#02111488",
					opacity:"1"}}>
				  {typeof children === 'function'?
					  children():
					  children}
				</div>
			  </Frame>
			</div>
		);
	}
}

class DescriptionPane extends Component
{
	render(){
		var text = this.props.text;
		text = typeof text === 'undefined'? "blah blah blah...": text;
		return(
			<div className={"description-pane"}>
			<Frame>
			<p>{text}</p>
			</Frame>
			</div>
		);
	}
}

class Template extends Component
{
	constructor(){
		super(...arguments);

	}
	render(){
		return(
			<ThemeProvider theme={createTheme()}>
			  <Arwes classes={{pattern:"corona-pattern"}} animate show>
			    <div>
				<p>This is a template.</p>
				<ToolBar>
				    <div style={{float:"right"}}>
				        This is where tools go
				    </div>
				</ToolBar>
				<div style={{display:"flex"}}>
				<MainContainer>
					{this.props.children}
				</MainContainer>
				<DescriptionPane />
				</div>
			    </div>
			  </Arwes>
			</ThemeProvider>
		);
	}
}

export {Template};
