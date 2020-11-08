import React, { Component } from 'react';
import { Buttons, MenuButton } from '../Buttons/Button.js';
import { Animation, Frame, Heading, List, ThemeProvider } from 'arwes';
import { maxH, theme } from '../globals.js';

const getUniqueID = () =>
{
	var id = Math.floor( Math.random() * Number.MAX_SAFE_INTEGER );
	return id;
}

class CountySelector extends Component
{
	constructor( props )
	{
		super( props );
		this.form       = props.form;
		this.controller = props.controller;
		this.countyItem = { value : "" };
		this.state      = { state : props.init, mounted : false };
	}
	render()
	{
		const counties =
			this.controller.getCounties( this.state.state );
		return ( <> { this.getOptions( counties ) } </> );
	}
	componentDidMount()
	{
		if( this.state.mounted ) return;
		this.props.form.setCountySelector( this );
		this.setState( { mounted : true } );
	}
	update( state )
	{
		this.setState( { state : state } );
	}
	getOptions( counties )
	{
		const form = this.form;
		return(<select
			    ref = { ( c ) => form.countyItem = c }
			    onChange = { ( e ) => { form.onSubmit( e ) } }
			  >
			<option value = "" hidden>
				--County--</option>
			{counties.map( county => (
				<React.Fragment key = { getUniqueID() }>
					<option
						value = { county }
					  >
					    { county }
					</option>
				</React.Fragment>
			))}</select>);
	}
}
/*
class SoundController extends Component
{
	constructor( props )
	{
		super( props );
		this.form = props.form;

		const cnt = this;

		this.withSounds = withSounds()( props => (
			<div style = {{
				color : " transparent", height : "0px"
			    }}>
				{ cnt.setSounds( props.sounds ) }
			</div>
		));
	}
	render()
	{
		return( <div style = {{
				color : "transparent", height : "0px"
			    }} >
			</div> );
	}
	setSounds( sounds )
	{
		this.sounds = sounds;
	}
	componentDidMount()
	{
		this.form.setSounds( this.sounds );
	}
}
*/
class ToolForm extends Component
{
	constructor( props )
	{
		super( props );
		this.stateItem    = "";
		this.countyItem   = "";
		this.onSubmit     = this.onSubmit.bind( this );
		this.onStateClick = this.onStateClick.bind( this );
		this.controller   = props.controller;
		this.statesArr    = this.controller.getStates();
	}
	onSubmit( e )
	{
		if( Boolean( this.stateItem.value )
				&& this.controller ){
			this.controller.fetchData(
				this.stateItem.value,
				this.countyItem.value
					? this.countyItem.value
					: "" );
		}
		e.preventDefault();
	}
	render()
	{
		const display    = this.props.showInput ? "flex" : "none";
		const controller = this.controller;
		return(
			<div style = {{
					float   : "right",
					padding : "5px",
					display : display
			    }}>
				<form
				    onSubmit = { this.onSubmit }
				    style    = {{
					position : "relative",
					display  : "flex"
				    }}>
					<div style = {{
						width        : "160px",
						paddingRight : "5px"
					}}>
					  <Frame>
					    <select
						id = "stateselector"
						onChange = { this.onStateClick }
						ref = { ( a ) =>
							this.stateItem = a } >
						{ this.getOptions() }
					    </select>
					  </Frame>
					</div>
					<div style = {{
						width        : "160px",
						paddingRight : "5px"
					}}>
					  <Frame>
					  	<CountySelector
						    form       = { this }
						    controller = { controller }
						    init       = ""
						  >
						</CountySelector>
					  </Frame>
					</div>
				</form>
			</div>
		);
	}
	setCountySelector( countySelector )
	{
		this.countySelector = countySelector;
	}
	setSounds( sounds )
	{
		this.sounds = sounds;
	}
	onStateClick( event )
	{
		this.sounds &&
			this.sounds.logo.play();
		this.countySelector &&
			this.countySelector.update( event.target.value );
	}
	getOptions()
	{
		const states  = this.controller.getStates();
		return(
			<>
			<option value = "" hidden>
				--State--</option>
			{ states.map( state => (
				<React.Fragment key = { getUniqueID() }>
				  <option value = { state }>
				     { state }</option>
				</React.Fragment>
			       ))
			}</>
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
		this.controller = props.controller;
		this.state      = {
			menuVisible : false
		};
	}
	toggleMenu()
	{
		this.setState( prevState=>({
			menuVisible: !prevState.menuVisible
		}));
	}
	render()
	{
		const children   = this.props.children;
		const controller = this.controller;
		const showInput  = this.props.showInput;
		const showMenu   = this.props.showMenu;
		const state      = this.state;
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
		    <div>
			<div className = { "toolbar" }>
			    <ThemeProvider theme = { theme }>
				<Frame>
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
