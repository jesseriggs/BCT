/**
 * Data contains abstractions for implementing an MVC in React.
 */
import { Component } from 'react';

/**
 * @class DataController
 * @extends React.Component
 * @description
 * DataController contains a state model, and methods for business logic. This
 * is built to attach to some React component. The component acts as a view
 * that will present data when it is updated.
 */
class DataController
{
	/**
	 * @constructor
	 * @overrides React.Compnent.constructor
	 */
	constructor( props )
	{
		this.county   = "";
		this.url      = props.url;
		this.view     = null;
		this.map      = props.map;
		this.states   = Object.keys( props.map );
		this.model    = {
			data   : { confirmed : [], deaths : [] },
			title  : props.title,
			desc   : props.desc,
			axis   : { x : props.axis.x, y : props.axis.y },
			ticks  : { x : props.ticks.x, y : props.ticks.y },
			map    : {}
		};
		this.heatmap  = {};
		this.heatView = null;
	}

	/**
	 * @method getStates
	 * @returns states an array of states [ Idaho ].
	 */
	getStates()
	{
		return this.states;
	}

	/**
	 * @method getCounties
	 * @param string state: key to state's coresponding counties
	 * @returns counties, a, array of counties.
	 */
	getCounties( state )
	{
		if( !Boolean( state ) ) return [];
		return this.map[ state ].counties;
	}

	/**
	 * @method setHeatmap
	 * @param Object confirmed: array of objects, each object contains
	 * 	county name, state name, FIPS code and number of confirmed
	 * 	CoVid19 cases to date.
	 * @param Object deaths: array of objects, each object contains county
	 * 	name, state name, FIPS code, number of CoVid19 attributed
	 * 	deaths, and county population.
	 * @description uses parameters to generate a HeatMap view, which can
	 * 	be passed into page's view
	 */
	setHeatmap( confirmed, deaths )
	{
		var heatmap = {};
		if( !confirmed || !deaths ){
			console.log("DataController.setHeatmap recieved NULL.");
			return;
		}
		for( var i = 0; i < confirmed.length; i++ ){
			let cum  = confirmed[ i ].cum_total_confirmed_to_date;
			let fips = confirmed[ i ].fips + '';
			let pop  = deaths[ i ].population;
			let d    = deaths[ i ].cum_total_deaths_to_date;
			let r    = Math.sqrt( pop / 10000 );
			let op   = 8 * cum / pop;
			let str  = 0.8;

			heatmap[ fips ] = {
				fips    : fips,
				cum     : cum,
				pop     : pop,
				r       : r,
				opacity : op,
				stroke  : str,
				deaths  : d,
			};
		}
		this.heatmap = heatmap;
		this.heatView && this.heatView.update( this.heatmap );
		this.title && this.title.update( "US Heat Map" );
	}

	/**
	 * @method setData
	 * @param Object data: object containing an array of county objects,
	 *	each county contains two arrays corresponding to that county's
	 *	daily confirmed cases of CoVid19 and related deaths.
	 * @description recieves data to populate DataController's model, also
	 * 	calls update methods on view elements so that they match the
	 * 	current state of the model.
	 */
	setData( data )
	{
		console.log("setting data");
		var county = data.counties[ this.county ];
		this.model.title = county ? county.combined : "";
		this.model.data = {
				confirmed : county ? county.confirmed : [],
				deaths    : county ? county.deaths : []
			};
		this.view &&  this.view.update( this.model );
		this.title && this.title.update( this.model.title );
	}

	/**
	 * @method setTitle
	 * @param String title: title string to be displayed in page view.
	 * @description updates title and updates view to match new title.
	 */
	setTitle( title )
	{
		this.title = title;
		this.title.update( this.model.title );
	}

	/**
	 * @method setView
	 * @param React.Component view: view component to present data
	 * @description sets DataController's view to new React.Component and
	 * 	then triggers model to update to most current data.
	 */
	setView( view )
	{
		this.view = view;
		this.view.update( this.model );
		this.fetchData();
	}

	/**
	 * @method fetchData
	 * @param String state: key to state object that holds county data
	 * @param String county: key to county data
	 * @description fetches timeseries data from state, county for CoVid19
	 * 	relevant data from backend server; this function is
	 * 	asynchronous and so calls back to this.setData() on completion
	 */
	fetchData( state = 'Idaho', county = 'Ada' )
	{
		this.county = county;
		var request = this.url + "/" + state + ".json";
		console.log( request );
		fetch( request )
			.then( responce => responce.json() )
			.then( responce => this.setData( responce ) );
	}

	/**
	 * @method fetchHeatmap
	 * @desctiption pulls information regaurding current, by county data
	 * 	on confirmed cases and deaths, from database server; this
	 * 	method is asynchronous, so it calls back to this.setHeatmap()
	 * 	with parameters confirmed and deaths
	 */
	fetchHeatmap()
	{
		const confirmed    = "/state/confirmed";
		const deaths       = "/state/deaths";
		const fetchheatmap = async() => {
			const respconf   = await fetch( confirmed, {
				headers : {
					"accepts" : "application/json"
				}});
			const respdeaths  = await fetch( deaths, {
				headers : {
					"accepts" : "application/json"
				}});
			const jsonconf    = await respconf.json();
			const jsondeaths  = await respdeaths.json();
			await this.setHeatmap( jsonconf, jsondeaths );
		};
		fetchheatmap();
	}

	/**
	 * @method setHeatView
	 * @param React.Component heatView: view component for heatmap
	 * @description sets vew for DataController's heatmap, and then calls
	 * 	this.fetchHeatmap() to update view to most current data.
	 */
	setHeatView( heatView )
	{
		this.heatView = heatView;
		this.fetchHeatmap();
	}
}

class DataFilter extends Component
{
	constructor( props )
	{
		super( props );
		this.setState({
			filterBy : props.filterBy,
			title    : props.title,
			desc     : props.desc,
		});
	}
}

export { DataController, DataFilter };
