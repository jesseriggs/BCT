import React, { Component } from 'react';
import { Buttons, SubmitButton, MenuButton } from '../Buttons/Button.js';
import { Animation, Frame, Heading, List, ThemeProvider } from 'arwes';
import { maxH, theme } from '../globals.js';

class ToolForm extends Component
{
	constructor( props )
	{
		super( props );
		this.inputItem  = "";
		this.onSubmit   = this.onSubmit.bind( this );
		this.controller = props.controller;
	}
	onSubmit( e )
	{
		if( Boolean( this.inputItem.value )
				&& this.controller ){
			this.controller.fetchData( this.inputItem.value );
		}
		this.inputItem.value = "";
		e.preventDefault();
	}
	render()
	{
		const display = this.props.showInput ? "flex" : "none";
		return(
			<div style={{ float:"right", padding:"5px", display: display }}>
				<form
				    onSubmit = { this.onSubmit }
				    style    = {{
					position : "relative",
					display  : "flex"
				    }}>
					<div style={{
						width        : "160px",
						paddingRight : "5px"
					}}>
					  <Frame>
					    <input
						ref = { ( a ) =>
							this.inputItem = a }
						placeholder = "enter text">
					    </input>
					  </Frame>
					</div>
					<Buttons><SubmitButton /></Buttons>
				</form>
			</div>
		);
	}
}

const defaultElems = (
	<ul>
		<li>Put</li>
		<li>Menu</li>
		<li>Items</li>
		<li>Here</li>
	</ul>
);

class Menu extends Component
{
	render()
	{
		const animation = this.props.animation;
		const elems  = typeof this.props.elems === 'undefined' ?
				defaultElems :
				this.props.elems;
		const theme  = this.props.theme;
		const show   = this.props.show;
		const maxH   = this.props.maxH;
		const insty  = {
			entering: { opacity : "1", },
			entered:  { opacity : "1", },
			exiting:  { opacity : "0", },
			exited:   { opacity : "0", },
		};
		const outsty = {
			entering: {
				    width      : "62vw",
				    transition : "width 0.8s ease-in-out",
			},
			entered:  {
				    width : "62vw",
			},
			exiting:  {
				    width      : "150px",
				    transition : "width 0.5s linear",
			},
			exited:   {
				    width : "150px",
			},
		}
		return(
		    <ThemeProvider theme={ theme }>
			<div
				id        = { "main-menu" }
				className = { "menu-container" }
				style     = {{
					height : maxH,
					...outsty[ animation.status ]
				}}
			    >
			    <Frame
				    animation = { animation }
				    show      = { show }
				    animate   = { true }
				    level     = { 3 }
				    corners   = { 4 }
				    layer     = 'control'
				    timeout   = { 1000 }
				>
				<div style={{
					height         : maxH,
					marginLeft     : "10px",
					overflowY      : "scroll",
					scrollbarWidth : "none",
					transition     : "opacity 0.5s linear",
					...insty[ animation.status ]
				  }}>
				    <Heading node = 'h3' >Menu</Heading>
				    <List node = 'ul' >{ elems }</List>
				</div>
			    </Frame>
			</div>
		    </ThemeProvider>
		);
	}
}

class ToolBar extends Component
{
	constructor( props )
	{
		super( props );
		this.state = {
			menuVisible : false
		};
		this.controller = props.controller;
	}
	toggleMenu()
	{
		this.setState( prevState=>({
			menuVisible: !prevState.menuVisible
		}));
	}
	render()
	{
		const children = this.props.children;
		const state    = this.state;
		const styles   = {
			entering: { opacity   : "1", },
			entered:  { opacity   : "1", },
			exiting:  { opacity   : "1", },
			exited:   {
				    opacity   : "0",
				    transform : "translate(-30vw)",
			},
		};
		const baseStyles={
			position   : "relative",
			zIndex     : "6",
			transition : [ "opacity" ],
		};
		return(
		    <div>
			<div className = { "toolbar" }>
			    <ThemeProvider theme = { theme }>
				<Frame>
					<div style = {{
						float   : "left",
						padding : "5px",
						height  : "50px",
					}}>
					    < div style = {{
						display : this.props.showMenu ?
							"block" :
							"none"
					      }}>
						<Buttons
							show = {
							    this.props.showMenu
							} >
						    <MenuButton
							menu   = { this }
							toggle = { state } />
						</Buttons>
					    </div>
					</div>
					{typeof children === 'function' ?
						children() :
						children}
					<ToolForm
					    controller   = { this.controller }
					    showInput    = {
							this.props.showInput }
					  />
				</Frame>
			    </ThemeProvider>
			</div>
			<Animation
				show   ={ this.state.menuVisible }
				animate={ true }
				timeout={ 500 }
				>
			    { anim =>
				<div style={{
					...baseStyles,
					...styles[ anim.status ]
					}}>
				    <Menu
				        animation ={ anim }
				    	show ={ this.state.menuVisible }
				        maxH ={ maxH }
				    	theme={ theme } />
				</div>
			    }
			</Animation>
		    </div>
		);
	}
}

export { ToolBar };
