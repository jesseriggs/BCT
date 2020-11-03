import React, { Component } from 'react';
import { Heading } from 'arwes';
import { Graph } from '../../Graphs/Graph.js';
import { DescriptionPane, MainContainer } from '../../Templates/Template.js'

class HomePage extends Component
{
	constructor( props )
	{
		super( props );
		this.title = "Home Page";
		this.text  = "This is the Home Page text.";
		this.state = {
			data : {
				title : "none",
				data  : []
			}
		};
	}
	render()
	{
		const datacontroller = this.props.datacontroller;
		return(
		    <div
			 style={{
			     display      : "flex",
			     paddingLeft  : "5vw",
			     paddingRight : "5vw",
		      }}>
			<MainContainer>
			  <div>
			    <Heading
				data-layer='alert'
				node = 'h5'
			      >
				Mortality
			    </Heading>
			    <Graph controller = { datacontroller } ></Graph>
			  </div>
			</MainContainer>
			<DescriptionPane
			    text  = { this.text }
			    title = { this.title }
			  />
		    </div>
		);
	}
	update( apiResponse )
	{
		this.setState( { data : apiResponse.data } );
	}
	getData()
	{
		fetch( this.props.dataserver )
			.then( res => res.json() )
			.then( res => this.setState({ apiResponse : res }) )
			.catch( err => err );
	}
	componentDidMount()
	{
		//this.getData();
	}
}

export { HomePage };
