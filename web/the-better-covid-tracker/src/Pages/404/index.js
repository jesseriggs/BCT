import React, { Component } from 'react';
import { MainContainer } from '../../Templates/Template.js';
import { Heading, Words, withSounds } from 'arwes';

const PlayError = withSounds()( props => (
	<div style = {{ color : "transparent", height : "0px" }} >
		{ props.sounds.error.play() }</div>
));

class NotFoundPage extends Component
{
	render()
	{
		return(
		  <div style = {{ marginLeft : "5vw" }} >
		    <MainContainer animate show>
			<div>
			  <PlayError />
			  <Heading>Page Not Found</Heading>
			  <Words animate show sounds = { false }>
			    The robot overlords have denied your request.
			  </Words>
			</div>
		    </MainContainer>
		  </div>
		);
	}
}

export{ NotFoundPage }
