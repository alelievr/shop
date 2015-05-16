<?php
require_once "admin/auth.php";
include "header.html";
if (isset($_GET['p']))
{
	switch (htmlspecialchars($_GET['p'])) {
	case "logout":
		include("logout.php");
		break;
	case "login":
		include("login.php");
		break;
	case "Buy !":
		include("buy.php");
		break ;
	case "register":
		include("register.php");
		break;
	default:
		echo "<p>404 - not found!</p>";
		break;
	}
}
else
{
?>
<div class="row">
<div class="col-sm-3 col-md-2 sidebar" id="sidebar_left">
<?php
include "menu.php";
?>
	</div>
	<div class="col-sm-8 col-md-8 main">
<?php
	include "products.php";
	include "popup.php";
}
?>
	</div>
<div id="basket">
		<img id="basket_img" src="img/basket.png" />
</div>
<div id="searchbar_div">
	<input id="searchbar" type="text" onkeyup="call_search(this.value)" onchange="call_search(this.value)">
</div>
</div>
<?php
include "basket.html";
include "footer.html";
?>
