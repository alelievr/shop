<?php
echo "<br /><br /><br />";
if (isset($_POST['login']) && isset($_POST['passwd']))
{
	if (auth($_POST['login'], ($_POST['passwd'])))
	{
		$_SESSION['log_name'] = $_POST['login'];
		include "login_success.html";
	}
	else
		include "login_failed.html";
}
?>
