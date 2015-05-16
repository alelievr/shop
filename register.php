<?php
require_once "connect.php";
echo "<br /><br /><br />";

if (isset($_POST['login']) && isset($_POST['passwd']))
{
	$mysqli = ft_connect();
	$res = mysqli_query($mysqli, "SELECT * FROM users WHERE user='".$_POST['login']."'");
	if (mysqli_num_rows($res))
	{
		echo "User already exist";
		return; exit;
	}
	$pass = hash("whirlpool", "nyan".$_POST['passwd']);
	$req = "INSERT INTO users (user, passwd) VALUES ('".$_POST['login']."', '".$pass."')";
	if (!mysqli_query($mysqli, $req))
		echo "Error record: " . mysqli_error($mysqli);
	echo "User Regitered !";
}
?>
