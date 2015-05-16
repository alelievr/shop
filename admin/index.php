<?php
require_once "auth.php";

include ("header.html");
if (isset($_SESSION['logged_as_admin']) && $_SESSION['logged_as_admin'] == true)
{
	include ("nav.php");
	include("admin.php");
}
else if (isset($_POST["login"]) && isset($_POST["passwd"]))
{
	include ("login_nav.html");
	if (auth($_POST["login"], $_POST["passwd"], true))
		include("login_success.html");
	else
		include("login_failed.html");
}
else
{
	include ("login_nav.html");
	include("login_form.html");
}

include ("footer.html");
?>
