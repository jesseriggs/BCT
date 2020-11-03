import React, { Component } from 'react';
import { Frame, Words, Loading } from 'arwes';
import { Buttons, StartButton } from '../../Buttons/Button.js';

class StartPage extends Component
{
	constructor( props )
	{
		super( props );
		this.state = { show : false };
	}
	render()
	{
		return(
			<div style={{
			    width:"240px",
			    height:"400px",
			    marginTop:"10px",
			    marginLeft:"auto",
			    marginRight:"auto"
			}}>
			    <Frame
				animate = { true }
				corners = { 3 }
				show    = { this.state.show }
			      >
			      <div style = {{ padding : "10px" }} >
				<Words animate = { true } show = { this.state.show } >
					BCT has sounds. Click Start to begin.
				</Words>
				<Buttons style = {{
				    marginLeft  : "auto",
				    marginRight : "auto"
				}}>
					<StartButton
					    buttonLink = { this.props.buttonLink }
					    controller = { this }
					    show       = { this.state.show }
					  />
				</Buttons>
			      </div>
			    </Frame>
			    <div style = {{
				    position : 'relative',
				    width    : "200px",
				    height   : "200px"
			    }} >
				<Loading
				    animate
				    full
				    theme   = { this.props.theme }
				    classes = {{
					    circle  : "circle",
					    circle1 : "circle1",
					    circle2 : "circle2",
				    }}
				    show = { !this.state.show }
				/>
			    </div>
			</div>
		);
	}
	fadeOut()
	{
		this.setState( { show : false } );
	}
	componentDidMount()
	{
		if( !this.state.show )
			this.setState( { show : true } );
	}
}

export { StartPage };
