import React, { Component } from 'react';
import { Buttons, MenuButton } from '../Buttons/Button.js';
import { Animation, Frame, ThemeProvider } from 'arwes';
import { theme } from '../globals.js';
import { Menu, ToolForm } from './';


/**
 * @class ToolBar
 * @description instance renders toolbar for BCT
 */
class ToolBar extends Component
{
	/**
	 * @constructor
	 * @param props.showInput toggles visibility of form input: that is,
	 * 	state and county selectors.
	 * @param props.showMenu toggles visibility of menu button.
	 * @param props.controller DataController that facilitates actions on
	 * 	data. controller also triggers view rendering.
	 * @param props.children links and buttons to pass into	toolbar.
	 * */
	constructor( props )
	{
		super( props );
		this.controller = props.controller;
		this.state      = {
			menuVisible : false
		};
	}
	/**
	 * @method
	 * @description toggles menu visibility. only works when props.showMenu
	 * 	is true.
	 */
	toggleMenu()
	{
		this.setState( prevState=>({
			menuVisible: !prevState.menuVisible
		}));
	}
	/**
	 * @method
	 * @description required method of React.Component. renders DOM object.
	 */
	render()
	{
		const children   = this.props.children;
		const controller = this.controller;
		const showInput  = this.props.showInput;
		const showMenu   = this.props.showMenu;
		const state      = this.state;
		// menu animation lifecycle styles, hides menu when not visible
		const styles     = {
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
		    <div id = "bct-toolbar-wrapper" >
			<div className = { "toolbar" }>
			    <ThemeProvider theme = { theme }>
				<Frame corners = { 3 } >
					<div style = {{
						float   : "left",
						padding : showMenu
							? "5px"
							: "0px",
						height  : "50px",
					}}>
					    < div style = {{
						display : showMenu ?
							"block" :
							"none"
					      }}>
						<Buttons
							show = { showMenu } >
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
					    controller   = { controller }
					    showInput    = { showInput }
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
				        maxH ="100%"
				    	theme={ theme } />
				</div>
			    }
			</Animation>
		    </div>
		);
	}
}

export default ToolBar;
