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
		this.legend   = null;
		this.map      = props.map;
		this.states   = Object.keys( props.map );
		this.model    = {
			axis  : { x : props.axis.x, y : props.axis.y },
			data  : { confirmed : [], deaths : [] },
			desc  : props.desc,
			map   : {},
			pop   : 0,
			ticks : { x : props.ticks.x, y : props.ticks.y },
			title : props.title,
		};
		this.heatmap  = {};
		this.heatView = null;
		this.natAVG   = 0;
		this.natSTD   = 0;
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
		if( !confirmed || !deaths ){
			console.log("DataController.setHeatmap recieved NULL.");
			return;
		}
		var caption =
			"number of confirmed cases per 100 citizens";
		var tot_confirmed  = 0;
		var tot_deaths     = 0;
		var tot_cpp        = 0;
		var population     = 0;
		var heatmap        = {};
		var hiop           = 0;
		var lowop          = 1;
		for( let i = 0; i < confirmed.length; i++ ){
			let cum  = confirmed[ i ].cum_total_confirmed_to_date;
			let fips = confirmed[ i ].fips + '';
			let pop  = deaths[ i ].population;
			let d    = deaths[ i ].cum_total_deaths_to_date;
			let r    = Math.sqrt( pop / 10000 );
			let op   = ( cum / pop ) < 1 ? ( cum / pop ) : 0;
			let str  = 0.8;

			tot_confirmed  += cum;
			tot_deaths     += d;
			tot_cpp        += pop !== 0 ? cum / pop : 0;
			population     += pop;
			hiop            = ( hiop < op )  ? op : hiop;
			lowop           = ( lowop > op ) ? op : lowop;

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

		var avg  = tot_cpp / confirmed.length;
		var std  = 0;
		for( let i = 0; i < confirmed.length; i++ ){
			let fips = confirmed[ i ].fips + '';
			let h    = heatmap[ fips ];
			let o    = h.opacity - avg;
			std     += o * o;
		}
		std = Math.sqrt( std / confirmed.length );

		this.natAVG = avg;
		this.natSTD = std;

		/*
		 * The idea here is that shades of cyan are confirmation rates
		 * below the first standard deviation. Yellow are within the
		 * first standard deviation. Reds are above the first standard
		 * deviation. TODO: pull this out into it's own funciton. We
		 * can reuse this code for deaths, 14 day avg, etc...
		 */
		var norm = 1 / ( hiop - lowop );
		avg      = norm * ( avg - lowop );
		std      = norm * std;
		var lo   = avg - std;
		lo       = lo > 0 ? lo : 0;
		var hi   = avg + std;
		hi       = hi < 1 ? hi : 1;
		console.log("avg:" + avg + ";std:" + std + ";hi:" + hi + ";lo:"
			+ lo + ";\n");
		for( let i = 0; i < confirmed.length; i++ ){
			let fips  = confirmed[ i ].fips + '';
			let h     = heatmap[ fips ];
			let o     = h.opacity;

			o = ( o - lowop ) * norm;
			o = ( o < 1 ) ? o : 1;
			h.opacity = 0.3;

			let r = 38;
			let g = 38;
			let b = 38;
			if( o < lo ){
				b  = 255;
				g  = 255 * ( o / lo );
			} else if( o < hi ){
				g  = 255;
				r  = 255 * ( o - lo ) / ( hi - lo );
			} else {
				r  = 255;
				g  = 255 - ( 255 / std ) * ( o - hi );
				g  = ( g >= 0 ) ? g : 0;
			}
			let c = 'rgb(' + r + ',' + g + ',' + b + ')';
			h.color = c;
		}
		this.heatmap = heatmap;

		this.heatView && this.heatView.update( this.heatmap );
		this.title    && this.title.update( "US Heat Map" );
		this.stats    && this.stats.update(
				tot_confirmed, tot_deaths, population, 'US' );
		this.setHeatmapLegend(
				100 * this.natAVG,
				100 * this.natSTD,
				100 * hiop,
				caption );
	}

	/**
	 * @method setHeatmapLegend
	 * @param String met: metric that map measures
	 * @param Float avg: average for a county
	 * @param Float std: standard deviation among counties
	 * @param Float hi: highest value among counties
	 * @description wrapper passes arguments to Legend component
	 */
	setHeatmapLegend( avg, std, hi, capt )
	{
		//const h  = Number.parseFloat( hi ).toFixed( 1 );
		const u3 = Number.parseFloat( 2 * std + avg ).toFixed( 1 );
		const u2 = Number.parseFloat( std + avg ).toFixed( 1 );
		const mn = Number.parseFloat( avg ).toFixed( 1 );
		//const l2 = Number.parseFloat( avg - std ).toFixed( 1 );
		const l3 = Number.parseFloat( avg - 2 * std ).toFixed( 1 );

		const headers = [ 'Value','STD' ];
		const data    = [
			[ ( '_ ' + u3 ), '3rd' ],
			[ ( '_ ' + u2 ), '2nd' ],
			[ ( '_ ' + mn ), '1st' ],
			[ ( '_ ' + l3 ), '2nd' ],
			[ '_ 0', '3rd' ]
		];

		this.legend && this.legend.update(
				capt, headers, data, 'heatmap' );
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
		var model              = this.model;
		model.data.confirmed   = [];
		model.data.deaths      = [];
		model.population       = 0;
		model.title            = "";

		var county = data.counties[ this.county ];
		if( county ){
			model.title          = county.combined;
			model.data.confirmed = county.confirmed;
			model.data.deaths    = county.deaths;
			model.population     = county.population;
		}

		this.view  && this.view.update( model );
		this.title && this.title.update( model.title );

		var confirmed =
			county.confirmed[ county.confirmed.length - 1 ];
		var deaths    =
			county.deaths[ county.deaths.length - 1 ];
		var population = model.population;
		this.stats && this.stats.update(
			confirmed, deaths, population, model.title );
		this.setGraphLegend();
	}

	/**
	 * @method setDataLegend
	 * @description sets the legend to describe graph
	 */
	setGraphLegend()
	{
		const caption = 'cumulative number per county';
		const headers = [ 'description' ];
		const data    = [
			[ 'cumulative number of cases' ],
			[ 'cumulative number of deaths' ]
		];
		this.legend && this.legend.update(
				caption, headers, data, 'graph' );
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
	 * @method setStats
	 * @param React.Component stats: view to present quick stats
	 * @description sets DataController's stats view to new
	 * 	React.Component.
	 */
	setStats( stats )
	{
		this.stats = stats;
	}

	/**
	 * @method setLegend
	 * @param React.Component legend: view to present legend
	 * @description sets DataController's legend biew to new
	 * 	React.Component
	 */
	setLegend( legend )
	{
		this.legend = legend;
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
		var request = "/static/data/" + state + ".json";
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
		const production   = false;
		const confirmed    = production ? "/api/state/confirmed"
					: "/api/confirmed.json";
		const deaths       = production ? "/api/state/deaths"
					: "/api/deaths.json";
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
