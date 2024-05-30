<?php

include_once( "../database.php");

$json_body = file_get_contents('php://input');
$object = json_decode($json_body);

$description = $object->description;
$groupname = $object->groupname;

try
{
	$SQLCode = "INSERT INTO `group`(name, description) VALUES ('$groupname','$description')";

    #echo json_encode($SQLCode);
	
	$connection->query($SQLCode);

	$status = array( 'status'=>'ok', 'description'=> $groupname.'-'.$description );
	
    echo json_encode($status);
}
catch( PDOException $connectionException )
{
    $status = array( 'status'=>'db-error (createGroup.php', 'description'=>$connectionException->getMessage() );
    echo json_encode($status);
        
    die();
}

?>
