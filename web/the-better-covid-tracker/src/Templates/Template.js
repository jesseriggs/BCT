import React, { Component } from 'react';
import { ToolBar } from '../ToolBars/ToolBar.js';
import { Arwes, Frame, Heading, SoundsProvider, ThemeProvider, Words, createSounds, createTheme, withSounds } from 'arwes';
import { maxH } from '../globals.js';
import '../styles/index.css';

const lorem = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";

const theme    = createTheme();
theme.animTime = 1000;

const TemplateSounds = {
        shared  : { volume : 1, },
        players : {
                deploy : {
                        sound : { src : [ 'static/sound/deploy.mp3' ] }
                },
                expand : {
                        sound : { src : [ 'static/sound/expand.mp3' ] }
                },
                logo   : {
                        sound : { src : ['static/sound/logo.mp3' ] }
                },
		start  : {
			sound : { src : ['static/sound/start.mp3' ] }
		},
        }
};
const templateSounds = createSounds( TemplateSounds );
const sounds         = { start : "" };
const Sounds         = withSounds()( props =>{
	sounds.start = props.sounds.start;
	return(<div></div>);
} );

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
			this.setState( { show : true } );
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
		if( !this.state.show )
			this.setState( { show : true } );
	}
}

class Footer extends Component
{
	render()
	{
		const children = this.props.children;
		return(
			<ThemeProvider theme = { theme }>
			    <div style={{
				height          : "50px",
				position        : "relative",
				backgroundColor : "#021114e0",
				marginTop       : "10px",
				fontSize        : "12px"
			    }}>
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

class Template extends Component
{
	constructor( props )
	{
		super( props );
		this.state = { play : false };
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
				{ /* TODO: this is super hacky. I'll fix it when
				     I implement start screen. */ }
				<SoundsProvider sounds = { templateSounds }>
				    <Sounds />
				</SoundsProvider>
				<ToolBar theme = { theme }>
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
				<div style={{
				    display      : "flex",
				    paddingLeft  : "5vw",
				    paddingRight : "5vw",
				}}>
					<MainContainer>
						{ this.props.children }
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
	componentDidMount()
	{
		if( !this.state.show ){
			this.setState( { play : true } );
			sounds.start.play();
		}
	}
}

export { DescriptionPane, Footer, MainContainer, Template };
