<!-- *********************************************************************** -->
<!--                                                                         -->
<!--                                                      :::      ::::::::  -->
<!-- index.html                                         :+:      :+:    :+:  -->
<!--                                                  +:+ +:+         +:+    -->
<!-- By: alelievr <alelievr@student.42.fr>          +#+  +:+       +#+       -->
<!--                                              +#+#+#+#+#+   +#+          -->
<!-- Created: 2015/04/11 13:39:40 by alelievr          #+#    #+#            -->
<!-- Updated: 2015/04/12 14:16:14 by alelievr         ###   ########.fr      -->
<!--                                                                         -->
<!-- *********************************************************************** -->

<?php

require_once "connect.php";
$mysqli = ft_connect();

function disp_item($product)
{
	echo '<div class="item">'.
		'<div class="item_title">'.
		$product['name'].
		'</div>'.
		'<div class="item_title_price">'.
		$product['price']."$".
		'</div>'.
		'<img class="item_img" src="'.$product['img'].'" />'.
		'<div class="description">'.
		'<div class="content">'.$product['descr'].'</div>'.
		'<div class="price">'.$product['price'].'</div>'.
		'<div class="quantity">'.$product['quantity'].'</div>'.
		'<div class="item_id">'.$product['id'].'</div>'.
		'</div>'.
		'</div>';
}

if (isset($_GET['cat']) && $_GET['cat'] != "0")
{
	$cat = $_GET['cat'];

	if ($cat == "1" || $cat == "2" || $cat == "3" || $cat == "4")
	{
		$res = mysqli_query($mysqli, "SELECT * FROM category_link WHERE category_id='$cat'");
		$row = mysqli_num_rows($res);
		$res2 = "SELECT * FROM products WHERE ";
		$i = 0;
		while ($data = mysqli_fetch_assoc($res))
		{
			$i++;
			$res2 .= "id='".$data['product_id']."' ";
			if ($i != $row)
				$res2 .= "OR ";
		}
		$res = mysqli_query($mysqli, $res2);
		echo '<div id="canvas"></div>';
		while ($product = mysqli_fetch_assoc($res))
			disp_item($product);
	}
	else
		header("Location: http://".$_SERVER['SERVER_NAME'].":8080/index.php");
}
else
{
	$res = mysqli_query($mysqli, "SELECT * FROM products");
	echo '<div id="canvas"></div>';
	while ($product = mysqli_fetch_assoc($res))
		disp_item($product);
}

?>
