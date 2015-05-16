<?php
require_once "../connect.php";
session_start();

if (isset($_GET['id']))
{
	$mysqli = ft_connect();
	$id = mysqli_real_escape_string($mysqli, $_GET['id']);
	$res = mysqli_query($mysqli, "SELECT * FROM products WHERE id=".$id."");

	while ($product = mysqli_fetch_assoc($res))
	{
		echo $product['name']."\n".
			$product['img']."\n".
			$product['id']."\n".
			$product['price']."\n";
		//quantiter commender:
		$arr = json_decode($_SESSION['BASKET']);
		if ($arr->$product['id'])
			echo $arr->$product['id']."\n";
		else
			echo "0\n";
	}
}
?>
