import React, { Component } from 'react';
import { Frame } from 'arwes';

/**
 * @class Footer
 * @extends React.Component
 * @description instance renders footer component for BCT.
 */
class Footer extends Component
{
	/**
	 * @method render
	 * @description required method of React.Component, renders footer
	 * @param props.children elements to render inside footer.
	 */
	render()
	{
		const children = this.props.children;
		return(
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
		);
	}
}

export default Footer;
