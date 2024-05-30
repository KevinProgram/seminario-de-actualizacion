<?php

include_once( "../database.php");

$json_body = file_get_contents('php://input');
$object = json_decode($json_body);

$user_id = $object->user_id;
$group_id = $object->group_id;

try
{
    $SQLCode = "SELECT * FROM `group` WHERE `group`.id = 1 "
	#$SQLCode = "INSERT INTO memberusergroup(group_id, user_id) VALUES ('$group_id','$user_id')";
	
	$connection->query($SQLCode);

	$status = array( 'status'=>'ok', 'description'=> $group_id.'-'.$user_id );
	
    echo json_encode($status);
}
catch( PDOException $connectionException )
{
    $status = array( 'status'=>'db-error (createMemberUserGroup.php', 'description'=>$connectionException->getMessage() );
    echo json_encode($status);
        
    die();
}

?>
