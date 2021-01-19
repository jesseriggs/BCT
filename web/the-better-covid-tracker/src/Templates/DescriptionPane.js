import React, { Component } from 'react';
import { Frame, Heading, Table, Words } from 'arwes';
import { Legend } from '../Legend';

/*
 * lorem ipsum: Fun for the whole family ;)
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
		this.state      = { show : false };
		this.statistics = props.stats;
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
		//const statistics = this.statistics;
		return(
		      <div id = "bct-description-pane-wrapper">
			<div className = { "bct-description-pane" }>
			  <div style = {{
			  	position : "absolute",
				width    : "100%",
				height   : "100%"
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
				<Legend controller = { this.props.controller } />
				<QuickStats
					controller = { this.props.controller } />
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

	/**
	 * @method getStats
	 * @para Function statistics: returns JSX.
	 * @description present statistics in this small wrapper
	 */
	getStats( statistics )
	{
		if( !statistics ) return( <></> );
		return(
			<div>
			<Heading node = 'h4'>Statistics</Heading>
			{ statistics() }
			</div>
		);
	}
}

/**
 * @class QuickStats
 * @extends React.Component
 * @description instance renders quick statistics in small table
 */
class QuickStats extends Component
{
	/**
	 * @constructor
	 * @description set state to default stats
	 */
	constructor( props )
	{
		super( props );
		this.state = {
			confirmed  : 0,
			deaths     : 0,
			mounted    : false,
			population : 0,
			title      : "none"
		};
	}

	/**
	 * @method render
	 */
	render()
	{
		const population = this.state.population;
		const popdesc    = "population of area"
		const confirmed  = this.state.confirmed;
		const confrate   = population
			? Math.floor( 1000 * confirmed / population )
			  / 10 + "%"
			: 0;
		const confdesc   = "confirmed cases to date, and confirmed"
		                 + " cases/population";
		const deaths     = this.state.deaths;
		const deathrate  = confirmed
			? Math.floor( 1000 * deaths / confirmed )
			  / 10 + "%"
			: 0;
		const deathdesc  = "deaths to date, and deaths/cases";
		const title      = this.state.title;

		const headers =
		    ["Name", "Total", "%", "Description"];
		const dataset = [
		    ["Pop", population, "NA", popdesc ],
		    ["Cases", confirmed, confrate, confdesc ],
		    ["Deaths", deaths, deathrate, deathdesc ]
		];

		return(
		    <div className = "bct-quickstat-wrapper">
			<Heading node = 'h4'>Statistics For { title }</Heading>
			<Table
				animate
				headers = { headers }
				dataset = { dataset } />
		    </div>
		);
	}

	/**
	 * @method componentDidMount
	 * @overrides React.Component.componentDidMount()
	 * @description reports to DataController
	 */
	componentDidMount()
	{
		if( this.state.mounted ) return;
		this.props.controller.setStats( this );
		this.setState( { mounted : true } );
	}

	/**
	 * @method update
	 * @param Integer confirmed: number of confirmed cases to date
	 * @param Integer deaths: number of deaths to date
	 * @param Integer population: population size of county
	 * @param String title: title of quickstats
	 * @description updates quickstats component with new stats
	 */
	update( confirmed, deaths, population, title )
	{
		this.setState({
			confirmed  : confirmed,
			deaths     : deaths,
			population : population,
			title      : title
		} );
	}
}

export default DescriptionPane;
