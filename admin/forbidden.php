<?php
unset($_SESSION['logged_as_admin']);
?>
<p class="lead">
Access Forbidden !
	Bye!
</p>
<script>
	setTimeout(function () {window.location.href = "/admin/";}, 2000);
</script>
