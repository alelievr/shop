<?php
if (file_exists("connect.php"))
	require_once "connect.php";
else if (file_exists("../connect.php"))
	require_once "../connect.php";
session_start();

function auth($login, $pass, $admin_only)
{
	$_SESSION['logged_as_admin'] = false;
	if (empty($login) || empty($pass))
		return false;
	if (!isset($admin_only))
		$admin_only = false;
	$mysqli = ft_connect();
	$res = mysqli_query($mysqli, "SELECT * FROM users WHERE user='".$login."'");
	$row = mysqli_fetch_assoc($res);

	$pass = hash("whirlpool", "nyan".$pass);
	if ($row['passwd'] != $pass)
		return (false);
	if ($admin_only && $row['admin'] === false)
		return (false);
	if ($row['admin'])
		$_SESSION['logged_as_admin'] = true;
	return (true);
}

function is_access_forbidden()
{
	if (!isset($_SESSION['logged_as_admin']) || !$_SESSION['logged_as_admin'])

	{
		include "forbidden.php";
		include "footer.php";
		return true;
	}
	return false;
}
?>
