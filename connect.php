<?php
function ft_connect()
{
/*	$domain = "mysql.hostinger.fr";
	$user = "u690510777_42";
	$pass = "wz|a~rLVtRoa7~Gw|!";
	$db = "u690510777_42";*/

	$domain = "localhost";
	$user = "root";
	$pass = "root42";
	$db = "rush00";

	return (mysqli_connect($domain, $user, $pass, $db));
}
?>
