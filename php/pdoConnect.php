<?php
	include 'config.php';
	
	error_reporting(E_ALL | E_STRICT);
    	ini_set("display_errors", 2);	

	
if($_POST['action'] == "getTimecode") {

try {
	$connection = new PDO("mysql:host=$server;dbname=videoAnnotation", $username, $password);
	
	$connection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
	echo "Connected successfully";
    }

catch(PDOException $e)
    {
	echo "Connection failed: " . $e->getMessage();
    }
    

	
$filmName = $_POST['filmName'];
$markerType = $_POST['markerType'];
$timestamp = $_POST['timecode'];
$start = $_POST['start'];
$end = $_POST['end'];
$text = $_POST['text'];
$target = $_POST['target'];


$insertTest = $connection->prepare("INSERT INTO $filmName SET filmName=:filmName, markerType=:markerType, timestamp=:timestamp, start=:start, end=:end, text=:text, target=:target");

$insertTest->bindValue(':filmName', $filmName, PDO::PARAM_STR);
$insertTest->bindValue(':markerType', $markerType, PDO::PARAM_STR);
$insertTest->bindValue(':timestamp', $timestamp, PDO::PARAM_STR);
$insertTest->bindValue(':start', $start, PDO::PARAM_STR);
$insertTest->bindValue(':end', $end, PDO::PARAM_STR);
$insertTest->bindValue(':text', $text, PDO::PARAM_STR);
$insertTest->bindValue(':target', $target, PDO::PARAM_STR);

$insertTest->execute();

echo 'Data logged:';

}


$myResult = $connection->query("SELECT start, end, text, target FROM $filmName");

$results = $myResult->fetchAll(PDO::FETCH_ASSOC);

$resultsJSON = json_encode($results);

echo($resultsJSON);

$connection = null;



?>
