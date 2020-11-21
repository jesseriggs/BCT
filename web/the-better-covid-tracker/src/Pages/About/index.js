import React, { Component } from 'react';
import { GeneralContainer } from '../../Templates/Template.js';
import { Heading, Link, Words } from 'arwes';

const text = "Welcome to Better Covid Tracker, your place for local CoVid-19 data. This project was developed by Jesse Riggs, James Souder and Michael Stoneman. All data pertaining to Covid-19 cases, deaths comes from the data repository for the 2019 Novel Coronavirus Visual Dashboard operated by Johns Hopkins University Center For Systems Science and Engineering ( JHU CSSE ). For more information on this repository, follow the link below."
const csseURL = "https://github.com/CSSEGISandData/COVID-19"

class AboutPage extends Component
{
	render()
	{
		return(
		  <div>
		    <GeneralContainer animate show>
			<div>
			  <Heading node = 'h4' >About</Heading>
			  <Words animate show>
			    	{ text }
			  </Words>
			  <Link href = { csseURL } >
			  	CSSEGIS and Data COVID-19
			  </Link>
			</div>
		    </GeneralContainer>
		  </div>
		);
	}
}

export{ AboutPage }
