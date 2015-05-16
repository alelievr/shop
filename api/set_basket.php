<?php
session_start();
if (isset($_GET['basket']))
{
	$basket = $_GET['basket'];
	$_SESSION['BASKET'] = $basket;
	echo '{"status":"ok"}';
}
?>
