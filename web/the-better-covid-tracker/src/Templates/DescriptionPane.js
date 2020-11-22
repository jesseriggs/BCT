import React, { Component } from 'react';
import { Frame, Heading, Words } from 'arwes';

/*
 * lorem ipsum: fo when ya need ta say shit but you ain't got shit ta say...
 */
const lorem = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do"
	+ "eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim"
	+ "ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut "
	+ "aliquip ex ea commodo consequat. Duis aute irure dolor in reprehend"
	+ "erit in voluptate velit esse cillum dolore eu fugiat nulla pariatur"
	+ ". Excepteur sint occaecat cupidatat non proident, sunt in culpa qui"
	+ "officia deserunt mollit anim id est laborum.";

/**
 * @class DescriptionPane
 * @extends React.Component
 * @description instance renders pane with content describing the contend in
 * 	MainContainer.
 */
class DescriptionPane extends Component
{
	/**
	 * @constructor
	 * @overrides React.Component constructor
	 * @param props.text text string holding description.
	 * @param props.title text string holding title of description content.
	 * @description constructs new DescriptionPane, and then sets its
	 * 	state.show prop to false, so that it can be set to true after
	 * 	mounting.
	 */
	constructor( props ){
		super( props );
		this.state = { show : false };
	}
	/**
	 * @method render
	 * @description required method of React.Component.
	 */
	render()
	{
		const text  = typeof this.props.text === 'undefined' ?
				lorem :
				this.props.text;
		const title = typeof this.props.title === 'undefined' ?
				"Lorem Ipsum" :
				this.props.title;
		return(
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
		);
	}
	/**
	 * @method componentDidMount
	 * @overrides React.Component.componentDidMount
	 * @description delays render until after mount to ensure that all is
	 * 	loaded before displaying content. Checks state.show to ensure
	 * 	it's not set after initial set. This prevents the method
	 * 	from infinite loop.
	 */
	componentDidMount()
	{
		if( !this.state.show ){
		    setTimeout( ()=>{
			this.setState( { show : true } );
		    }, 100 );
		}
	}
}

export default DescriptionPane;
