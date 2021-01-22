const ev       = require( "events" );
const fs       = require( "fs" );
const readline = require( "readline" );

console.log( "Parsing CSV files into JSON  files.\n" );

function parseLine( input )
{
	var uuid, state, county, fips, lat, lon, combined;
	var arr0 = input.split( "\"" );
	var arr  = arr0[0].split( "," );
	var vals = arr0[2].substring( 1 ).split( "," );

	uuid     = arr[0];
	fips     = arr[4];
	county   = arr[5].split( " " ).join( "" );
	if( !Boolean( county ) ) county = "_NA";
	state    = arr[6].split( " " ).join( "" );
	lat      = arr[8];
	lon      = arr[9];
	combined = arr0[1];

	var data = {
		"uuid"      : uuid,
		"fips"      : fips,
		"lat"       : lat,
		"lon"       : lon,
		"combined"  : combined,
		"confirmed" : vals,
		"deaths"    : []
	};

	var ret = { "state" : state, "county" : county, "data" : data };

	return ret;
}

async function parseFile( filename, deathfile )
{
	try{
		const map   = {};
		const usa   = {};
		var   ticks = [];
		const rl    = readline.createInterface(
			{
				input     : fs.createReadStream( filename ),
				crlfDelay : Infinity
			});
		rl.on( 'line',
			( line ) => {
				if( line.charAt( 0 ) === 'U' ){
					ticks = line.split( "," );
					for( var i =0; i < 11; i++ )
						ticks.shift();
					return;
				}
				var data = parseLine( line );
				!( usa[ data.state ] ) &&
					( usa[ data.state ] =
						{
							name : data.state,
							counties : {}
						} );
				usa[ data.state ].counties[ data.county ]
					= data.data;
				console.log( "    confirmed "
					+ data.data.combined + "" );
			}
		);

		await ev.once( rl, "close" );

		const rldeath = readline.createInterface(
			{
				input     : fs.createReadStream( deathfile ),
				clrfDelay : Infinity
			});
		rldeath.on( 'line',
			( line ) => {
				if( line.charAt( 0 ) === 'U' ) return;
				var data   = parseLine( line );
				var deaths = data.data.confirmed;
				var county = usa[ data.state ]
					.counties[ data.county ];
				county.population = deaths.shift();
				county.deaths     = deaths;
				console.log("    deaths "
					+ data.data.combined );
			}
		);

		await ev.once( rldeath, "close" );

		Object.values( usa ).forEach( state => {
			saveToJSON( state );
		} );

		Object.values( usa ).forEach( state => {
			map[ state.name ] = {
				name     : state.name,
				counties : Object.keys( state.counties )
			};
		} );
		fs.writeFile( "data/map.json", JSON.stringify( map ), 'utf8',
			( err ) => {
				if( err ){
					console.error(
						"error writting map.json" );
					throw( err );
				}
				console.log( "    => map.json" );
			}
		);

		fs.writeFile( "data/ticks.json", JSON.stringify( ticks ), 'utf8',
			( err ) => {
				if( err ){
					console.error(
						"error writting ticks.json" );
					throw( err );
				}
				console.log( "    => ticks.json" );
			}
		);
	} catch ( err ) {
		console.error( err );
	}
}

function saveToJSON( state )
{
	const fileName = "data/" + state.name + ".json";
	const data = JSON.stringify( state );
	fs.writeFile( fileName, data, 'utf8', ( err ) => {
		if( err ){
			console.error( "error writing file: " + fileName );
			throw( err );
		}
		console.log( "    => " + fileName + "" );
	} );
}

parseFile( "time_series_covid19_confirmed_US.csv", "time_series_covid19_deaths_US.csv" );

