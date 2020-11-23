import React, { Component } from 'react';
import { Frame, Heading, List, ThemeProvider} from 'arwes';

// default "placeholder" elements for Menu.
const defaultElems = (
	<ul>
		<li>Put</li>
		<li>Menu</li>
		<li>Items</li>
		<li>Here</li>
	</ul>
);

/**
 * @class Menu
 * @description instance renders menu component for BCT
 */
class Menu extends Component
{
	/**
	 * @method render
	 * @description renders menu DOM object.
	 * @param props.animation animation lifecycle for menu rendering.
	 * @param props.elems elements to be displayed in menu instance.
	 * @param props.theme Arwes theme: see createTheme.
	 * @param props.show boolean initial state of menu display.
	 * @param props.maxH integer maximum height of menu.
	 */
	render()
	{
		const animation = this.props.animation;
		const elems  = typeof this.props.elems === 'undefined' ?
				defaultElems :
				this.props.elems;
		const theme  = this.props.theme;
		const show   = this.props.show;
		const maxH   = this.props.maxH;
		// lifecycle style ( opacity ) for inner menu divs. This will
		// fade in.
		const insty  = {
			entering: { opacity : "1", },
			entered:  { opacity : "1", },
			exiting:  { opacity : "0", },
			exited:   { opacity : "0", },
		};
		// lifecycle styles for outer menu divs. This will exand, but
		// keep maximum opacity so the user can watch the Arwes.Frame
		// animation.
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
				id        = { "bct-main-menu" }
				className = { "bct-menu-container" }
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

export default Menu;
