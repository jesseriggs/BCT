<?php

$routes = [];

function route( $action, Closure $callback )
{
	global $routes;
	$action = trim( $action, '/' );
	$routes[ $action ] = $callback;
}

function dispatch( $action )
{
	global $routes;
	$action   = trim( $action, '/' );
	$callback = $routes[ $action ];
	if( $callback === null ){
		$callback = function(){
			echo '{"invalid action":"The action requested is not'
			. ' valid","ACTION":"' . $action . '"}';
		};
	}
	call_user_func( $callback );
}

function get_connection()
{
	$jstring  = file_get_contents( __DIR__ . '/../../scripts/config.json' );
	$config   = json_decode( $jstring );
	$server   = $config->server;
	$username = $config->username;
	$password = $config->password;
	$dbname   = $config->database;
	echo $server . "; " . $username . "; " . $password . "; " . $dbname;

	$con = mysqli_connect( $server, $username, $password )
		or die( 'Could not connect: ' . mysqli_error( $con ) );
	mysqli_select_db( $con, $dbname ) or die( 'Could not select db' );
	return $con;
}

function print_query( $query )
{
	$con    = get_connection();

	$result = mysqli_query( $con, $query ) or die('Query failed: '
		. mysqli_error( $con ) );
	$resarr = [];

	while( $row = mysqli_fetch_assoc( $result ) ){
		array_push( $resarr, $row );
	}

	$data = json_encode( $resarr, JSON_NUMERIC_CHECK );
	echo $data;
	echo "\n";

	$result = null;
	$resarr = null;
	$data   = null;

	$con->close();
}

function print_confirmed_legacy()
{
	$query  = 'SELECT uuid as fips, confirmed as cum_total_confirmed_to_date'
		. ', name as city, state FROM counties;';
	print_query( $query );
}

function print_deaths_legacy()
{
	$query  = 'SELECT uuid as fips, deaths as cum_total_deaths_to_date'
		. ', name as city, state, population FROM counties;';
	print_query( $query );
}

header('Content-Type: application/json');

route('/state/confirmed/', function() {
	print_confirmed_legacy();
});

route('/state/deaths/', function() {
	print_deaths_legacy();
});

route('/', function() {
	echo '{"response":"Hello world!"}';
});

$action = $_SERVER[ 'PATH_INFO' ];
if( $action === null ) $action = '/';
dispatch( $action );
?>
