<?php
if (isset($_GET['p']))
	$p = htmlentities($_GET['p']);
else
	$p = "overview";
?>
			<div class="masthead clearfix">
				<div class="inner">
					<h3 class="masthead-brand">Panneau d&apos;administration</h3>
					<nav>
					<ul class="nav masthead-nav">
					<li<?php if ($p == "overview") echo ' class="active"';?>><a href="#">Overiew</a></li>
						<li<?php if ($p == "users") echo ' class="active"';?>><a href="#">Users</a></li>
						<li<?php if ($p == "products") echo ' class="active"';?>><a href="?p=products">Products</a></li>
						<li<?php if ($p == "category") echo ' class="active"';?>><a href="#">Category</a></li>
						<li><a href="/">retour au site</a></li>
						<li><a href="?p=logout">logout</a></li>
					</ul>
					</nav>
				</div>
			</div>
