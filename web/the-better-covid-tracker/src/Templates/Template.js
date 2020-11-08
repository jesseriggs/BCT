import React, { Component } from 'react';
import { ToolBar } from '../ToolBars/ToolBar.js';
import { Arwes, Frame, Heading, Link, SoundsProvider, ThemeProvider, Words, createTheme, createSounds } from 'arwes';
import { maxH } from '../globals.js';
import '../styles/index.css';

/**
 * lorem ipsum: fo when ya need ta say shit but you ain't got shit ta say...
 */
const lorem = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do"
	+ "eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim"
	+ "ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut "
	+ "aliquip ex ea commodo consequat. Duis aute irure dolor in reprehend"
	+ "erit in voluptate velit esse cillum dolore eu fugiat nulla pariatur"
	+ ". Excepteur sint occaecat cupidatat non proident, sunt in culpa qui"
	+ "officia deserunt mollit anim id est laborum.";

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
				sounds  = { createSounds( masterSounds ) }
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
					<Heading node='h4'>{ title }</Heading>
					<p>
					    <Words
						animate = { true }
						theme   = {{ animTime : 3000 }}
						style   = {{ fontSize : "18px" }}
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
		    }, 100 );
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

class Template extends Component
{
	constructor( props )
	{
		super( props );
		this.controller     = props.dataController;
		this.pageController = props.pageController;
		this.sounds         = createSounds( masterSounds );
		this.state          = {
			play : false,
			page : props.children,
		};
	}
	render()
	{
		const links      = this.getLinks();
		const page       = this.props.children;
		const controller = this.controller;
		const showMenu   = this.props.showMenu;
		const sounds     = this.sounds;

		return(
			<ThemeProvider theme = { theme }>
			  <Arwes
				classes = {{ pattern : "corona-pattern" }}
				animate
				show
			  >
			   <SoundsProvider sounds = { sounds }>
			    <div>
				<ToolBar
					theme        = { theme }
					controller   = { controller }
					showInput    = { page.showInput }
					showMenu     = { showMenu }
				   >
				    <span style = {{
					    bottom     : "0",
					    position   : "absolute"
				      }}>
					{ links }
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
					{ page.pageName }
				</Heading>
				<div
				    id    = "content-area"
				    style = {{ height : maxH }}
				  >
					{ page.content() }
				</div>
				<Footer>
				    <span>Better Covid Tracker (C) 2020</span>
				</Footer>
			    </div>
			   </SoundsProvider>
			  </Arwes>
			</ThemeProvider>
		);
	}
	componentDidMount()
	{
		if( !this.state.show ){
			this.setState( { play : true } );
		}
		if( this.pageController )
			this.pageController.setTemplate( this );
	}
	getLinks()
	{
		if( !this.props.children.showLinks )
			return <div></div>;
		var hrefs = this.props.pageController.getHrefs();
		return ( <div>
			    {
				hrefs.map( item => (
				  <React.Fragment key = { item.key }>
				    <Link
				    	href  = { item.path }
					style = {{ marginLeft : "15px" }}
				     >
				      { item.pageName }
				    </Link>
				  </React.Fragment>
				))
			    }
			</div> );
	}
	setPage( page )
	{
		this.setState({ page : page });
	}
}

const masterSounds = {
	shared  : { volume : 1, },
	players : {
		click : {
			sound : { src : [ 'static/sound/click.mp3' ] }
		},
		deploy : {
			sound : { src : [ 'static/sound/deploy.mp3' ] }
		},
		error : {
			sound : { src : [ 'static/sound/error.mp3' ] }
		},
		expand : {
			sound : { src : [ 'static/sound/expand.mp3' ] }
		},
		fade : {
			sound : { src : [ 'static/sound/fade.mp3' ] }
		},
		hover : {
			sound : { src : [ 'static/sound/hover.mp3' ] }
		},
		logo : {
			sound : { src : [ 'static/sound/logo.mp3' ] }
		},
		start : {
			sound : { src : [ 'static/sound/logo.mp3' ] }
		},
		transmission : {
			sound : { src : [ 'static/sound/transmission.mp3' ] }
		},
		typing : {
			sound : { src : [ 'static/sound/typing.mp3' ] }
		},
	}
};

export { DescriptionPane, Footer, MainContainer, Template, masterSounds };
