<?php
require_once "connect.php";
if (isset($_SESSION['log_name']))
{
	$mysqli = ft_connect();
	$res = mysqli_query($mysqli, "INSERT INTO basket(name, basket) VALUES(".$_SESSION['log_name'].", ".$_SESSION['BASKET'].")");

	unset($_SESSION['BASKET']);

	echo '<style>#basket_img{display:none;}<style><div class="thanks">Thanks !</div>';

	header("refresh:5;url=http://".$_SERVER['SERVER_NAME']);
}
else
{
	echo "You Must be logged-in !";
	header("refresh:2;url=http://".$_SERVER['SERVER_NAME']);
}
?>
