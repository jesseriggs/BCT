import React, { Component } from 'react';
import { Heading, Words } from 'arwes';
import { Graph } from '../../Graphs/Graph.js';
import { DescriptionPane, MainContainer } from '../../Templates/Template.js'

class HomePage extends Component
{
	constructor( props )
	{
		super( props );
		this.title = "graph";
		this.text  = "Better Covid Tracker's graph displays cases ( in"
			+ "cyan ) and deaths ( in magenta ), in thousands ( k "
			+ ") of people, over the number of days that CoVid-19 "
			+ "has been tracked in the US. Each graph shows data f"
			+ "rom a specific county. State and county may be sele"
			+ "cted from the dropdown menus above^.";
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
				<Title controller = { datacontroller } />
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

class Title extends Component
{
	constructor( props )
	{
		super( props );
		this.state = { title : "" };
	}
	render()
	{
		return (
			<Words animate = { true }>
				{ this.state.title }
			</Words>
		);
	}
	update( title )
	{
		this.setState( { title : title } );
	}
	componentDidMount()
	{
		if( !this.state.controlled ){
			this.props.controller.setTitle( this );
			this.setState({ controlled : true });
		}
	}
}

export { HomePage };
