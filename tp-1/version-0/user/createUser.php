<?php

include_once( "../database.php");

$json_body = file_get_contents('php://input');
$object = json_decode($json_body);

$password = $object->password;
$username = $object->username;

try
{
	$SQLCode = "INSERT INTO user(name, password) VALUES ('$username','$password')";
	
	$connection->query($SQLCode);

	$status = array( 'status'=>'ok', 'description'=> $username.' - '.$password );
	
    echo json_encode($status);
}
catch( PDOException $connectionException )
{
    $status = array( 'status'=>'db-error (createUser.php', 'description'=>$connectionException->getMessage() );
    echo json_encode($status);
        
    die();
}

?>
