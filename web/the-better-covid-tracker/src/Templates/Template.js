import React, { Component } from 'react';
import { ToolBar } from '../ToolBars/ToolBar.js';
import { Arwes, Frame, ThemeProvider, createTheme } from 'arwes';
import '../styles/index.css'

class MainContainer extends Component {
	render(){
		const children = this.props.children;

		return(
			<div className={"main-container"}>
			  <Frame
			  	animate={true}
				show={true}
				style={{height:"90%"}}
				theme={{animTime:2000}} >
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
				<ToolBar>This is where tools go</ToolBar>
				<MainContainer>
					{this.props.children}
				</MainContainer>
			    </div>
			  </Arwes>
			</ThemeProvider>
		);
	}
}

export {Template};
