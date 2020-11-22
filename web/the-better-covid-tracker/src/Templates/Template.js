import React, { Component } from 'react';
import { ToolBar } from '../ToolBars';
import { Arwes, Frame, Heading, Link, SoundsProvider, ThemeProvider, Words, createTheme, createSounds } from 'arwes';
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
		      <div id = "bct-main-container-wrapper">
			<div className = { "bct-main-container" }>
			    <Frame
				animate = { true }
				className = "bct-full-size"
				corners = { 3 }
				show    = { this.state.show }
				sounds  = { createSounds( masterSounds ) }
				style   = {{ width : "100%", height : "100%", display : "grid", }}
			      >
				    <div style = {{
					backgroundColor : "#02111488",
					paddingLeft     : "20px",
					paddingRight    : "20px",
					paddingBottom   : "20px",
					paddingTop      : "10px",
					overflow        : "hidden",
					scrollbarWidth  : "none",
					height          : "100%",
					width           : "100%",
					position        : "absolute",
				    }}>
					    { typeof children === 'function' ?
						     children() :
						     children }
				    </div>
			    </Frame>
			</div>
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

class GeneralContainer extends Component
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
			<div className = { "bct-general-container" }>
			    <Frame
				animate = { true }
				corners = { 3 }
				show    = { this.state.show }
				sounds  = { createSounds( masterSounds ) }
			    >
				    <div style = {{
					backgroundColor : "#02111488",
					paddingLeft     : "20px",
					paddingRight    : "20px",
					paddingBottom   : "20px",
					paddingTop      : "15px",
					maxHeight       : "100%",
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
		      <div id = "bct-description-pane-wrapper">
			<div className = { "bct-description-pane" }>
			  <div style = {{
			  	position : "absolute",
				width : "100%",
				height : "100%"
			   }}>
			    <Frame
				animate   = { true }
				show      = { this.state.show }
				corners   = { 3 }
				className = "bct-full-size"
			      >
				<div></div>
			    </Frame>
			    <div style = {{
				paddingLeft     : "20px",
				paddingRight    : "20px",
				paddingBottom   : "20px",
				paddingTop      : "15px",
				maxHeight       : "100%",
				overflowY       : "scroll",
				scrollbarWidth  : "none",
				position        : "absolute",
				top             : "0",
				left            : "0",
				bottom          : "0",
				backgroundColor : "#021117c5"
			      }}>
				<Heading node = 'h4'>{ title }</Heading>
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
			  </div>
			</div>
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
				    corners = { 3 }
				    hover   = { false }
				    style   = {{
					height  : "50px",
					padding : "5px"
				    }}
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
				style   = {{ overflow : "hidden" }}
				animate
				show
			  >
			   <SoundsProvider sounds = { sounds }>
			    <div id = "bct-template-wrapper">
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
				    node='h4'
				    style={{
					marginTop    : "77px",
					marginBottom : "-5px",
					marginLeft   : "27px",
					height       : "28px"
				    }}
				>
					{ page.pageName }
				</Heading>
				<div id = "bct-content-area">
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

export { DescriptionPane, Footer, GeneralContainer, MainContainer, Template, masterSounds };
