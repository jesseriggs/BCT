import React, { Component } from 'react';
import { ToolBar } from '../ToolBars';
import { Footer, masterSounds } from './';
import { Arwes, Heading, Link, SoundsProvider, ThemeProvider, createTheme, createSounds } from 'arwes';
import '../styles/index.css';

const theme    = createTheme();
theme.animTime = 1000;

/**
 * @class Templare
 * @extends React.Component
 * @description component renders template for bct app.
 */
class Template extends Component
{
	/**
	 * @contructor
	 * @param props.controller DataController handles requests for data and
	 * 	triggers render of view components after reciecing update
	 * @param props.pageController holds resorces for rendering pages and
	 * 	"client side routing".
	 * @param props.children holds Page object, has elements: boolean
	 * 	showInput, string pageName, and function content();
	 */
	constructor( props )
	{
		super( props );
		this.children       = props.children;
		this.controller     = props.dataController;
		this.pageController = props.pageController;
		this.sounds         = createSounds( masterSounds );
	}
	/**
	 * @method render
	 * @description required method for React.Component, instance renders
	 * 	an html body, provides layout for page components, and renders
	 * 	with sounds, styles and animations
	 */
	render()
	{
		const links      = this.getLinks();
		const page       = this.children;
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
	/**
	 * @method componentDidMount
	 * @overrides React.Component.componentDidMount
	 * @description Template and Page load asynchronously. If Page loads
	 * 	before Template, then template will check to see if Page
	 * 	exists. Otherwise, Page will notify Template of its existance.
	 */
	componentDidMount()
	{
		if( this.pageController )
			this.pageController.setTemplate( this );
	}
	/**
	 * @method getLinks
	 * @description returns a set of links to Pages provided to Template
	 * 	by PageController. Template can decide where to place these
	 * 	links, independed of pages. They currently display in ToolBar.
	 */
	getLinks()
	{
		if( !this.children.showLinks )
			return <div></div>;
		var hrefs = this.pageController.getHrefs();
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
	/**
	 * @method setPage
	 * @description Page and Template load asynchronously. If Page loads
	 * 	last, then it will call the Template to set itself as page.
	 * @param page a object instanciated from ../Pages/Pages.js.
	 */
	setPage( page )
	{
		this.setState({ page : page });
	}
}

export default Template;
