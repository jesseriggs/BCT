import React, { Component } from 'react';
import { ToolBar } from '../ToolBars/ToolBar.js';
import { Arwes, Frame, ThemeProvider, createTheme } from 'arwes';
import '../styles/index.css'

const lorem = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";

const elem = (document.compatMode === "CSS1Compat") ? 
	document.documentElement :
	document.body;

const height = elem.clientHeight;
const width = elem.clientWidth;

const maxH = ( height - 132 ) + "px";

class MainContainer extends Component
{
	render(){
		const children = this.props.children;

		return(
			<div className={"main-container"}>
			  <Frame
				show={true}
				style={{height:"100%"}} >
				<div style={{
					backgroundColor:"#02111488",
					padding:"20px",
					maxHeight:maxH,
					overflowY:"scroll",
					scrollbarWidth:"none"}}>
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
		text = typeof text === 'undefined'? lorem: text;
		return(
			<div className={"description-pane"}>
			<Frame
				style={{height:"100%"}}>
				<div style={{
					padding:"20px",
					maxHeight:maxH,
					overflowY:"scroll",
					scrollbarWidth:"none"}}
					>
					<h1>Text Pane</h1>
					<p>{text}</p>
				</div>
			</Frame>
			</div>
		);
	}
}

class Footer extends Component
{
	render(){
		const children = this.props.children;
		return(
			<div style={{
				height:"50px",
				position:"relative",
				backgroundColor:"#02111488",
				marginTop:"10px",
				fontSize:"12px"}}
				>
				<Frame style={{height:"50px",padding:"5px"}}>
					{children}
				</Frame>
			</div>
		);
	}
}

class Template extends Component
{
	render(){
		return(
			<ThemeProvider theme={createTheme()}>
			  <Arwes classes={{pattern:"corona-pattern"}} animate show>
			    <div>
				<ToolBar>
				    <span style={{marginLeft:"60px"}}>
				        This is where tools go
				    </span>
				</ToolBar>
				<div style={{display:"flex",paddingLeft:"5vw",paddingRight:"5vw",marginTop:"60px"}}>
					<MainContainer>
						{this.props.children}
					</MainContainer>
					<DescriptionPane />
				</div>
				<Footer>
					<span>This is a footer</span>
				</Footer>
			    </div>
			  </Arwes>
			</ThemeProvider>
		);
	}
}

export {Template};
