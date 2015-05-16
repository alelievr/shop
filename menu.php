<?php
if (isset($_SESSION['log_name']))
	$logged = true;
else
	$logged = false;

?>
		  <ul class="nav nav-sidebar">
<h1>LOGO</h1>
<?php
if ($logged)
	echo '<li><a href="?p=logout">Logout</a></li>';
else
{
?>
<h1 class="cover-heading">Please login:</h1><br />
<div class="inner cover">
	<form action="?p=login" method="POST">
		<div class="form-group">
			<label for="login">Identifiant:</label>
			<input type="login" class="form-control" name="login" placeholder="Enter login" id="select1">
		</div>
		<div class="form-group">
			<label for="passwd">Mot de passe:</label>
			<input type="password" class="form-control" name="passwd" placeholder="Password" id="select2">
		</div>
		<button type="submit" class="btn btn-default" formaction="?p=login">Login</button>
<br />
<br />
		<button type="submit" class="btn btn-default" formaction="?p=register">Register</button>
	</form>
</div>
<?php
}
?>
		  <hr />
		  </ul>
		  <ul class="nav nav-sidebar">
<h4>Category:</h4>
			<li class="active"><a href="?cat=0">Overview</a></li>
			<li><a href="?cat=1">Goodies</a></li>
			<li><a href="?cat=2">Food</a></li>
			<li><a href="?cat=3">Annimals</a></li>
			<li><a href="?cat=4">Wtf</a></li>
<hr />
		  </ul>
