import React, { Component } from 'react';
import { Buttons, StartButton } from '../Buttons/Button.js';
import { ToolBar } from '../ToolBars/ToolBar.js';
import { Arwes, Frame, Heading, Loading, ThemeProvider, Words, createTheme } from 'arwes';
import { maxH } from '../globals.js';
import '../styles/index.css';

const lorem = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";

const theme    = createTheme();
theme.animTime = 1000;

class MainContainer extends Component
{
	constructor( props )
	{
		super( props );
		this.state = { show : false };
	}
	render()
	{
		const children = this.props.children;

		return(
		    <ThemeProvider theme = { theme }>
			<div className = { "main-container" }>
			    <Frame
				animate = { true }
				corners = { 3 }
				show    = { this.state.show }
			    >
				    <div style = {{
					backgroundColor : "#02111488",
					padding         : "20px",
					maxHeight       : maxH,
					overflowY       : "scroll",
					scrollbarWidth  : "none"
				    }}>
					    { typeof children === 'function' ?
						     children() :
						     children }
				    </div>
			    </Frame>
			</div>
		    </ThemeProvider>
		);
	}
	componentDidMount()
	{
		if( !this.state.show )
		    setTimeout( ()=>{
			this.setState( { show : true } );
		    }, 100);
	}
}

class DescriptionPane extends Component
{
	constructor( props ){
		super( props );
		this.state = { show : false };
	}
	render()
	{
		const text  = typeof this.props.text === 'undefined' ?
				lorem :
				this.props.text;
		const title = typeof this.props.title === 'undefined' ?
				"Lorem Ipsum" :
				this.props.title;
		return(
		    <ThemeProvider theme = { theme }>
			<div className = { "description-pane" }>
			    <Frame
				animate = { true }
				show    = { this.state.show }
				corners = { 3 }
			    >
				<div style = {{
					padding        : "20px",
					maxHeight      : maxH,
					overflowY      : "scroll",
					scrollbarWidth : "none"
				}}>
					<Heading node='h3'>{ title }</Heading>
					<p>
					    <Words
						animate = { true }
						theme   = {{ animTime : 3000 }}
						>
						    { text }
					    </Words>
					</p>
				</div>
			    </Frame>
			</div>
		    </ThemeProvider>
		);
	}
	componentDidMount()
	{
		if( !this.state.show ){
		    setTimeout( ()=>{
			this.setState( { show : true } );
		    }, 300 );
		}
	}
}

class Footer extends Component
{
	render()
	{
		const children = this.props.children;
		return(
			<ThemeProvider theme = { theme }>
			    <div className = { "bct-footer" }>
				<Frame
				    style = {{
					height  : "50px",
					padding : "5px"
				    }}
				    hover = { false }
				    >
					{ children }
				</Frame>
			    </div>
			</ThemeProvider>
		);
	}
}

class ContentInitialized extends Component
{
	render()
	{
		return(
		  <ThemeProvider theme = { theme }>
		    <div
			 style={{
			     display      : "flex",
			     paddingLeft  : "5vw",
			     paddingRight : "5vw",
		    }}>
			<MainContainer>
				{ this.props.children }
			</MainContainer>
			<DescriptionPane />
		    </div>
		  </ThemeProvider>
		);
	}
}

class StartMessage extends Component
{
	constructor( props )
	{
		super( props );
		this.state = { show : false };
	}
	render()
	{
		return(
			<div style={{
			    width:"240px",
			    height:maxH,
			    marginTop:"10px",
			    marginLeft:"auto",
			    marginRight:"auto"
			}}>
			    <Frame
				animate = { true }
				corners = { 3 }
				show    = { this.state.show }
			      >
			      <div style = {{ padding : "10px" }} >
				<Words animate = { true } show = { this.state.show } >
					BCT has sounds. Click Start to begin.
				</Words>
				<Buttons style = {{
				    marginLeft  : "auto",
				    marginRight : "auto"
				}}>
					<StartButton
					    show       = { this.state.show }
					    target     = "content-area"
					    controller = { this }
					    component  = {
						<ContentInitialized>
						  {this.props.children}
						</ContentInitialized>
					    }
					/>
				</Buttons>
			      </div>
			    </Frame>
			    <div style = {{
				    position : 'relative',
				    width    : "200px",
				    height   : "200px"
			    }} >
				<Loading
				    animate
				    full
				    classes = {{
					    circle  : "circle",
					    circle1 : "circle1",
					    circle2 : "circle2",
				    }}
				    show = { !this.state.show }
				/>
			    </div>
			</div>
		);
	}
	fadeOut()
	{
		this.setState( { show : false } );
	}
	componentDidMount()
	{
		if( !this.state.show )
			this.setState( { show : true } );
	}
}

class Template extends Component
{
	constructor( props )
	{
		super( props );
		this.state      = { play : false };
		this.controller = props.controller;
	}
	render()
	{
		return(
			<ThemeProvider theme = { theme }>
			  <Arwes
				classes = {{ pattern : "corona-pattern" }}
				animate
				show
			  >
			    <div>
				<ToolBar
					theme = { theme }
					controller = { this.controller }
				   >
				    <span style = {{ marginLeft : "60px" }}>
				        This is where tools go
				    </span>
				</ToolBar>
				<Heading
				    node='h3'
				    style={{
					marginTop    : "60px",
					marginBottom : "0",
					marginLeft   : "2vw",
					height       : "30px"
				    }}
				>
					{ this.props.headerText }
				</Heading>
				<div
				  id    = "content-area"
				  style = {{ height : maxH }}
				>
					<StartMessage>
						{ this.props.children }
					</StartMessage>
				</div>
				<Footer>
					<span>Better Covid Tracker (C) 2020</span>
				</Footer>
			    </div>
			  </Arwes>
			</ThemeProvider>
		);
	}
	componentDidMount()
	{
		if( !this.state.show ){
			this.setState( { play : true } );
		}
	}
}

export { DescriptionPane, Footer, MainContainer, Template };
