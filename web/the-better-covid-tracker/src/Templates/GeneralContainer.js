import React, { Component } from 'react';
import { Frame } from 'arwes';

/**
 * @class GeneralContainer
 * @extends React.Component
 * @description instance renders stand-alone container-component.
 */
class GeneralContainer extends Component
{
	/**
	 * @constructor
	 * @overrides React.Component constructor
	 * @param props.children content to display.
	 */
	constructor( props )
	{
		super( props );
		this.state = { show : false };
	}
	/**
	 * @method render
	 * @description required method of React.Component. renders container
	 * 	for general content.
	 */
	render()
	{
		const children = this.props.children;

		return(
			<div className = { "bct-general-container" }>
			    <Frame
				animate = { true }
				corners = { 3 }
				show    = { this.state.show }
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
		);
	}
	/**
	 * @method componentDidMount
	 * @overrides React.Component.componentDidMount
	 * @description called on after mount in the React Component lifecycle.
	 * 	delays displaying content until after everything is loaded.
	 */
	componentDidMount()
	{
		if( !this.state.show )
		    setTimeout( ()=>{
			this.setState( { show : true } );
		    }, 100);
	}
}

export default GeneralContainer;
