import React, { Component } from 'react';
import { Frame } from 'arwes';

/**
 * @class MainContainer
 * @extends React.Component
 * @description renders a container component used to hold page main content.
 */
class MainContainer extends Component
{
	/**
	 * @constructor
	 * @overrides React.Component constructor
	 * @description constructs new MainContainer component and sets it's
	 * 	state.show to false. This allows a delay in it's displaying.
	 * @param props.children children to render inside container.
	 */
	constructor( props )
	{
		super( props );
		this.state = { show : false };
	}
	/**
	 * @method render
	 * @description required method of React.Component. renders container
	 * 	for main content of page.
	 */
	render()
	{
		const children = this.props.children;

		return(
		      <div id = "bct-main-container-wrapper">
			<div className = { "bct-main-container" }>
			    <Frame
				animate = { true }
				className = "bct-full-size"
				corners = { 3 }
				show    = { this.state.show }
				style   = {{
					width : "100%",
					height : "100%",
					display : "grid",
				}}
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
		);
	}
	/**
	 * @method componentDidMount
	 * @overrides React.Component.componentDidMount
	 * @description called on after component mounts, in the React
	 * 	component lifecycle. We wish to change the state of this
	 * 	component to show, after mounting, so we can ensure that all
	 * 	parts are loaded before showing.
	 */
	componentDidMount()
	{
		if( !this.state.show )
		    setTimeout( ()=>{
			this.setState( { show : true } );
		    }, 100);
	}
}

export default MainContainer;
