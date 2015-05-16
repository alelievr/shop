<?php
session_start();
if (isset($_SESSION['BASKET']))
{
	echo $_SESSION['BASKET'];
}
else
	echo "{}";
?>
