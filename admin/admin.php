<?php
require_once "auth.php";
if (is_access_forbidden())
	exit;
	if (isset($_GET['p']))
		switch (htmlspecialchars($_GET['p'])) {
		case "logout":
			include("logout.php");
			break;
		case "products":
			include("products.php");
			break;
		default:
			include("overview.php");
		}
?>
