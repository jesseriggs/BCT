<?php

$jstring  = file_get_contents( 'config.json' );
$config   = json_decode( $jstring );
$server   = $config->server;
$username = $config->username;
$password = $config->password;
$database = $config->database;

class Entry
{
	public $uuid    = 0;
	public $county  = "";
	public $state   = "";
	public $total   = 0;
	public $deaths  = 0;
	public $pop     = 0;
	public $series  = [];
	public $dseries = [];

	function __construct(
			$uuid,
			$county,
			$state,
			$total,
			$pop,
			$series)
	{
		$this->uuid   = $uuid;
		$this->county = $county;
		$this->state  = $state;
		$this->total  = $total;
		$this->pop    = $pop;
		$this->series = $series;
	}
}

function parse_line( $line )
{
	$arr   = explode( "\"", $line );
	$left  = explode( ",", $arr[0] );
	$right = trim( substr( $arr[2], 1 ) );

	$uuid   = $left[0];
	$fips   = $left[4];
	$county = $left[5];
	if( empty( $county ) ) $county = "_NA";
	$state  = $left[6];
	$lat    = $left[8];
	$lon    = $left[9];
	$comb   = $arr[1];
	$pop    = 0;
	$series = explode( "," , $right );
	$total  = $series[count($series) - 1];

	$ent    = new Entry( $uuid, $county, $state, $total, $pop, $series );
	return $ent;
}

function query( $query, $con )
{
	$result = mysqli_multi_query( $con, $query );
	$indx = 0;
	while( mysqli_next_result( $con ) ){
		$result = mysqli_store_result( $con );
		$indx++;
	}
	if( mysqli_errno( $con ) ){
		echo "\nError: #" . mysqli_errno( $con ) . " Line: " . $indx;
		return $indx + 1;
	}
	return 0;
}

function update_db( $entries, $server, $database, $username, $password )
{
	$con = mysqli_connect( $server, $username, $password )
		or die( 'Could not connect: ' . mysqli_error( $con ) . "\n" );
	echo "Connection successful\n";

	mysqli_select_db( $con, $database )
		or die( 'Could not select db' );

	// start by creating new tables in the db. Remove anything that may
	// already be there...
	$drop_counties = 'DROP TABLE IF EXISTS counties';
	$result = mysqli_query( $con, $drop_counties )
		or die( 'Query failed: ' . mysqli_error( $con ) . "\n" );

	$create_counties =
		'CREATE TABLE counties ('
		. 'uuid INTEGER PRIMARY KEY,'
		. 'state VARCHAR(30) NOT NULL,'
		. 'name TEXT NOT NULL,'
		. 'population INT,'
		. 'confirmed INT,'
		. 'deaths INT,'
		. 'seriesc JSON,'
		. 'seriesd JSON,'
		. 'INDEX(state(7)))';
	$result = mysqli_query( $con, $create_counties )
		or die( 'Query failed: ' . mysqli_error( $con ) . "\n");

	// Insert counties
	$insert_counties = '';
	$indx            = 0;
	foreach( $entries as $entry ){
		$insert_counties .=
		'INSERT INTO counties VALUES('
		. $entry->uuid . ',"'
		. $entry->state . '","'
		. $entry->county . '",'
		. $entry->pop . ","
		. $entry->total . ","
		. $entry->deaths . ",'"
		. $entry->series . "','"
		. $entry->dseries . "'"
		. ");";
		$indx++;
	}
	echo "\nInserting counties entries: " . $indx;
	if( ( $indx = query( $insert_counties, $con ) ) > 0 ){
		$e = $entries[ $indx - 1 ];
		echo "\n[ " . $e->uuid . ", '" . $e->county . "', '" . $e->state
			. "', " . $e->deaths . ",\n" . $e->series . ",\n"
			. $e->dseries . " ]\n";
	}

	echo "\nNumber of insertions: " . $indx;

	$con->close();
}


$entities = [];

// Open csv files and enter their values into the db.
$confirmed_csv = "time_series_covid19_confirmed_US.csv";
$confirmed_handle = fopen( $confirmed_csv, "r" );
// prune the first entry, as it is a header, not data
fgets( $confirmed_handle );
while( $line = fgets( $confirmed_handle ) ){
	$ent = parse_line( $line );
	$ent->series = json_encode( $ent->series, true );
	array_push( $entities, $ent );
}
fclose( $confirmed_handle );

// open deaths
$deaths_csv = "time_series_covid19_deaths_US.csv";
$deaths_handle = fopen( $deaths_csv, "r" );
// prune juice
fgets( $deaths_handle );
$indx = 0;
while( $line = fgets( $deaths_handle ) ){
	$ent    = $entities[$indx];
	$deaths = parse_line( $line );
	if( $ent->uuid != $deaths->uuid ){
		echo "\nError: uuid missmatch : " . $ent->uuid . ", "
			. $deaths->uuid . ";";
		break;
	}
	$ent->deaths  = $deaths->total;
	$ent->pop     = array_shift( $deaths->series );
	$ent->dseries = json_encode( $deaths->series, true );
	$indx++;
}
fclose( $deaths_handle );

update_db( $entities, $server, $database, $username, $password );
echo "\n";

?>
