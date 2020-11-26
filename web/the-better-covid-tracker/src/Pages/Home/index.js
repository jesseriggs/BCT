import React, { Component } from 'react';
import { Heading, Words } from 'arwes';
import { Graph } from '../../Graphs/Graph.js';
import { HeatMap } from '../../HeatMap';
import { DescriptionPane, MainContainer } from '../../Templates';

/**
 * @class HomePage
 * @extends React.Component
 * @description instance renders a home page to be presented from a Template.
 * 	This page hosts a simple heatmap of CoVid related statistics and a
 * 	time-series graph.
 * @todo TODO: implement form switch to change between the graph and heatmap.
 */
class HomePage extends Component
{
	/**
	 * @constructor
	 * @overrides React.Component.constructor()
	 * @description sets initial values of page, initialized as heatmap
	 */
	constructor( props )
	{
		super( props );
		this.title = "heatmap";
		this.text  = "Better Covid Tracker's graph displays cases ( in"
			+ " cyan ) and deaths ( in magenta ), in thousands ( k"
			+ " ) of people, over the number of days that CoVid-19"
			+ " has been tracked in the US. Each graph shows data "
			+ "from a specific county. State and county may be sel"
			+ "ected from the dropdown menus above^.";
		this.state = {
			data : {
				graph : false,
				title : "none",
				data  : []
			}
		};
	}

	/**
	 * @method render
	 * @description renders page component to be presented in BCT Template,
	 * 	MainContainer presents this.state.data while DescriptionPane
	 * 	presents this.title and this.text.
	 */
	render()
	{
		const datacontroller = this.props.datacontroller;
		const graph = ()=>{ return (
			<Graph controller = { datacontroller } ></Graph>
		) };
		const heatmap = ()=>{ return (
			<HeatMap controller = { datacontroller } />
		) };
		const component = this.state.graph ? graph : heatmap;

		return(
		    <div className = "bct-pages-splitter" >
		      <div className = "bct-pages-lpane-wrap" >
			<MainContainer>
			  <div style = {{
				position     : "absolute",
				width        : "100%",
				height       : "100%",
				paddingRight : "10px",
				maxWidth     : "100%",
				maxHeight    : "100%",
			   }}>
			    <Heading
				data-layer='alert'
				node = 'h4'
			      >
				<Title controller = { datacontroller } />
			    </Heading>
			    { component() }
			  </div>
			</MainContainer>
		      </div>
		      <div className = "bct-pages-rpane-wrap" >
			<DescriptionPane
			    text  = { this.text }
			    title = { this.title }
			  />
		      </div>
		    </div>
		);
	}

	/**
	 * @method update
	 * @param Object apiResponse: object conatining data to be presented in
	 * 	content area.
	 */
	update( apiResponse )
	{
		this.setState( { data : apiResponse.data } );
	}
}

/**
 * @class Title
 * @extends React.Component
 * @description this is a modularized component whose purpose to to hold and
 * 	present a String, Title. Title may be updated and re-rendered
 * 	independently of its host HomePage.
 */
class Title extends Component
{
	/**
	 * @method constructor
	 * @overrides React.Component.constructor()
	 * @param Object props: object containing parameters, passed in by JSX
	 * @description sets this.state.title
	 */
	constructor( props )
	{
		super( props );
		this.state = { title : "" };
	}

	/**
	 * @method render
	 * @description required method of React.Component, renders Title
	 */
	render()
	{
		return (
			<Words animate = { true }>
				{ this.state.title }
			</Words>
		);
	}

	/**
	 * @method update
	 * @param String title: title to be presented
	 * @desciption updates this.state.title and re-renders view to match
	 * 	updated data.
	 */
	update( title )
	{
		this.setState( { title : title } );
	}

	/**
	 * @method componentDidMount
	 * @overrides React.Component.componentDidMount()
	 * @desctiption reports to controller of its existence, passes handle
	 * 	of self into DataController so it has an update method to call
	 */
	componentDidMount()
	{
		if( !this.state.controlled ){
			this.props.controller.setTitle( this );
			this.setState({ controlled : true });
		}
	}
}

export { HomePage };
