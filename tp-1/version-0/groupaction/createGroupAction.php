<?php

include_once( "../database.php");

$json_body = file_get_contents('php://input');
$object = json_decode($json_body);

$Action = $object->Action;
$memberUserGroup_id = $object->memberUserGroup_id;

try
{
	$SQLCode = "INSERT INTO groupaction(Action, memberUserGroup_id) VALUES ('$memberUserGroup_id','$Action')";
	
	$connection->query($SQLCode);

	$status = array( 'status'=>'ok', 'description'=> $memberUserGroup_id.' - '.$Action );
	
    echo json_encode($status);
}
catch( PDOException $connectionException )
{
    $status = array( 'status'=>'db-error (createGroupAction.php', 'description'=>$connectionException->getMessage() );
    echo json_encode($status);
        
    die();
}

?>
