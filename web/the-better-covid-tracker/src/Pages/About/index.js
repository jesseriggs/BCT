import React, { Component } from 'react';
import { MainContainer } from '../../Templates/Template.js';
import { Heading, Words } from 'arwes';

class AboutPage extends Component
{
	render()
	{
		return(
		  <div style = {{ marginLeft : "5vw" }} >
		    <MainContainer animate show>
			<div>
			  <Heading>About</Heading>
			  <Words animate show>
			    Welcome to Better Covid Tracker, your place for local CoVid-19 data.
			  </Words>
			</div>
		    </MainContainer>
		  </div>
		);
	}
}

export{ AboutPage }
