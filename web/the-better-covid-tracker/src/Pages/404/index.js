import React, { Component } from 'react';
import { MainContainer } from '../../Templates/Template.js';
import { Heading, Words } from 'arwes';

class NotFoundPage extends Component
{
	render()
	{
		return(
		  <div style = {{ marginLeft : "5vw" }} >
		    <MainContainer animate show>
			<div>
			  <Heading>Page Not Found</Heading>
			  <Words animate show>
			    The robot overlords have denied your request.
			  </Words>
			</div>
		    </MainContainer>
		  </div>
		);
	}
}

export{ NotFoundPage }
