<?php

include_once( "../database.php");

$json_body = file_get_contents('php://input');
$object = json_decode($json_body);

$nickname = $object->nickname;
$password = $object->password;

try
{
	$SQLCode = "INSERT INTO user(nickname, password) VALUES ('$nickname','$password')";
	
	$connection->query($SQLCode);

	$status = array( 'status'=>'ok', 'description'=> $nickname.' - '.$password );
	
    echo json_encode($status);
}
catch( PDOException $connectionException )
{
    $status = array( 'status'=>'db-error (createUser.php', 'description'=>$connectionException->getMessage() );
    echo json_encode($status);
        
    die();
}

?>
