import React, { Component } from 'react';
import { GeneralContainer } from '../../Templates';
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
		    <GeneralContainer animate show>
			<div>
			  <PlayError />
			  <Heading
			  	data-layer = "error"
				node       = "h4"
			    >Page Not Found</Heading>
			  <Words animate show sounds = { false }>
			    The robot overlords have denied your request.
			  </Words>
			</div>
		    </GeneralContainer>
		  </div>
		);
	}
}

export{ NotFoundPage }
