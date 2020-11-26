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

	if( county.substring( 0, 5 ) == "Outof" ) return false;
	if( county == "Unassigned" ) return false;
	if( state == "Alaska" ) return false;
	if( state == "PuertoRico" ) return false;
	if( state == "AmericanSamoa" ) return false;
	if( state == "DiamondPrincess" ) return false;
	if( state == "GrandPrincess" ) return false;
	if( state == "Guam" ) return false;
	if( state == "Hawaii" ) return false;
	if( state == "NorthernMarianaIslands" ) return false;
	if( state == "VirginIslands" ) return false;
	if( state == "Unassigned" ) return false;


	var data = {
		"uuid"      : uuid,
		"fips"      : fips,
		"lat"       : Math.abs(lat),
		"lon"       : Math.abs(lon),
		"combined"  : combined,
		"confirmed" : vals,
		"deaths"    : []
	};

	if( data.lat > largestLat ) largestLat = data.lat;
	if( data.lat < smallestLat ) smallestLat = data.lat;
	if( data.lon > largestLon ) largestLon = data.lon;
	if( data.lon < smallestLon ) smallestLon = data.lon;

	var ret = { "fips" : data.fips, "lat" : data.lat, "lon" : data.lon };

	return ret;
}

var largestLon = -1000;
var smallestLon = 1000;
var largestLat = -1000;
var smallestLat = 1000;

async function parseFile( filename )
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
					return;
				}
				var data = parseLine( line );
				if( !data ) return;
				usa[ data.fips ] = data;
				console.log( "    fips: "
					+ data.fips + "" );
			}
		);

		await ev.once( rl, "close" );

		saveToSVG( usa );

	} catch ( err ) {
		console.error( err );
	}
}

function stringify( counties )
{
	const latScaler = 400 / ( largestLat - smallestLat );
	const lonScaler = 700 / ( largestLon - smallestLon );
	var usmap = [];
	var string = "";
		/* "<svg width='325' height='200' xmlns='http://www.w3.org/2000/svg"
		+ "' version='1.1'>";*/

	Object.values( counties ).forEach( county => {
		var x = ( 3 + lonScaler * ( largestLon - county.lon ) ).toFixed( 1 );
		var y = ( 3 + latScaler * ( largestLat - county.lat ) ).toFixed( 1 );
		var fips = Math.trunc( county.fips );
		var plot = { "cx" : x, "cy" : y, "id" : fips };
		usmap.push( plot );
		/*string += "<circle cx='" + x + "' cy='" + y + "' r='3' stroke='"
			+ "rgb(38,218,253)' fill='transparent' stroke-width='1'"
			+ " id='" + fips + "' opacity='1'/>";*/
	} );
	string = JSON.stringify( usmap );

	return string;
}

function saveToSVG( counties )
{
	const fileName = "map.svg.json";
	const data = stringify( counties );
	fs.writeFile( fileName, data, 'utf8', ( err ) => {
		if( err ){
			console.error( "error writing file: " + fileName );
			throw( err );
		}
		console.log( "    => " + fileName + "" );
	} );
}

parseFile( "time_series_covid19_confirmed_US.csv" );

