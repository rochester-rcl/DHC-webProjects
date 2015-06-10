<?php
	include 'config.php';
	
	error_reporting(E_ALL | E_STRICT);
    	ini_set("display_errors", 2);	
        
$action = filter_input(INPUT_POST,'action');
	
if ($action == "getTimecode") {

try {
	$connection = new PDO("mysql:host=$server;dbname=videoAnnotation", $username, $password);
	
	$connection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
	//echo "Connected successfully";
    }

catch(PDOException $e)
    {
	//echo "Connection failed: " . $e->getMessage();
    }
    

	

$filmName = filter_input(INPUT_POST, 'filmName');
$markerType = filter_input(INPUT_POST, 'markerType');
$timestamp = filter_input(INPUT_POST, 'timecode');
$start = filter_input(INPUT_POST, 'start');
$end = filter_input(INPUT_POST, 'end');
$text = filter_input(INPUT_POST, 'text');
$target = filter_input(INPUT_POST, 'target');


$insertTest = $connection->prepare("INSERT INTO $filmName SET filmName=:filmName, markerType=:markerType, timestamp=:timestamp, start=:start, end=:end, text=:text, target=:target");

$insertTest->bindValue(':filmName', $filmName, PDO::PARAM_STR);
$insertTest->bindValue(':markerType', $markerType, PDO::PARAM_STR);
$insertTest->bindValue(':timestamp', $timestamp, PDO::PARAM_STR);
$insertTest->bindValue(':start', $start, PDO::PARAM_STR);
$insertTest->bindValue(':end', $end, PDO::PARAM_STR);
$insertTest->bindValue(':text', $text, PDO::PARAM_STR);
$insertTest->bindValue(':target', $target, PDO::PARAM_STR);

$insertTest->execute();

//echo 'Data logged:';

}


$myResult = $connection->query("SELECT start, end, text, target FROM $filmName");

$results = $myResult->fetchAll(PDO::FETCH_ASSOC);

$resultsJSON = json_encode($results);

echo($resultsJSON);

$connection = null;



?>
