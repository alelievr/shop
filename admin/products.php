<?php
require_once("auth.php");
require_once "connect.php";
if (is_access_forbidden())
	exit;

$mysqli = ft_connect();
$edit = false;
if (isset($_GET['action']))
{
	switch ($_GET['action']) {
	case "add":
		add_product($mysqli);
		break;
	case "remove":
		delete_product($mysqli);
	case "edited":
		edit_product($mysqli);
		break;
	case "edit":
		if (isset($_GET['id']))
			$edit = true;
		break;
	}
}
if ($edit)
	$res = mysqli_query($mysqli, "SELECT * FROM products WHERE id=".$_GET['id']);
else
	$res = mysqli_query($mysqli, "SELECT * FROM products");
?>
<h1 class="cover-heading">Product list:</h1><br />
	<div class="inner cover">
		<div class="table-responsive">
			<table class="table table-striped">
			  <thead>
				<tr>
				  <th>id</th>
				  <th>Visible</th>
				  <th>name</th>
				  <th>Description</th>
				  <th>Image</th>
				  <th>Price</th>
				  <th>Quantity avaible</th>
				  <th>Action</th>
				</tr>
			  </thead>
			  <tbody>
<?php
if ($edit)
{
	$product = mysqli_fetch_assoc($res);
?>
</tr>
	<form action="?p=products&action=edited&id=<?php echo $product['id'];?>" method="POST">
		<td><?php echo $product['id'];?><input type="hidden" name="id" value="<?php echo $product['id'];?>"></td>
		<td><input class="checkbox" type="checkbox" name="enabled" <?php echo ($product['enabled'] == true) ? "checked" : "off";?>></td>
		<td><input type="text" class="form-control" name="name" value="<?php echo $product['name']?>" placeholder="Name"></td>
		<td><textarea  c="20" rows="5" class="form-control" name="desc" placeholder="Description"><?php echo $product['descr']?></textarea></td>
		<td><input type="url" class="form-control" name="img" placeholder="Image Url" value="<?php echo $product['img']?>"></td>
		<td>
			<input type="number" min="0" step="0.01" class="form-control" name="price" placeholder="price" value="<?php echo $product['price']?>">$
		</td>
		<td><input type="number" min="0" class="form-control" name="quantity" placeholder="quantity" value="<?php echo $product['quantity']?>"></td>
		<td>
			<button class="btn-default" type="submit"> Apply <a/>
		</td>
	</form>
</tr>
<?php
}
else
{
	while ($product = mysqli_fetch_assoc($res)) {
		echo "<tr>";
		echo "<td>".$product['id']."</td>";
		echo "<td>".$product['enabled']."</td>";
		echo "<td>".$product['name']."</td>";
		echo "<td>".$product['descr']."</td>";
		echo "<td><img src='".$product['img']."' style='max-width: 60px'></img></td>";
		echo "<td>".$product['price']." $</td>";
		echo "<td>".$product['quantity']."</td>";
		echo "<td>",
			"<a href='?p=products&id=".$product['id']."&action=edit'> edit <a/>",
			"<a href='?p=products&id=".$product['id']."&action=remove'> remove <a/>",
			"</td>";
		echo "</tr>";
	}
?>
</tr>
	<form action="?p=products&action=add" method="POST">
		<td> - </td>
		<td><input class="checkbox" type="checkbox" name="enabled"></td>
		<td><input type="text" class="form-control" name="name" placeholder="Name"></td>
		<td><textarea  c="20" rows="5" class="form-control" name="desc" placeholder="Description"></textarea></td>
		<td><input type="url" class="form-control" name="img" placeholder="Image Url" value="http://"></td>
		<td>
			<input type="number" min="0" step="0.01" class="form-control" name="price" placeholder="price">$
		</td>
		<td><input type="number" min="0" class="form-control" name="quantity" placeholder="quantity"></td>
		<td>
			<button class="btn-default" type="submit"> add <a/>
		</td>
	</form>
</tr>
<?php
}
?>
				</tbody>
			</table>
		  </div>
	 </div>
<?php
function add_product($conn) {
	if (!(isset($_POST['name']) && isset($_POST['desc'])
		&& isset($_POST['img']) && isset($_POST['price']) && isset($_POST['quantity'])))
		return;
	$enabled = (isset($_POST['enabled']) == "on") ? 1 : 0;
	$req = "INSERT INTO products (enabled, name, descr, img, price, quantity) 
		VALUES ('".$enabled."', '".$_POST['name']."', '".$_POST['desc']."', '".$_POST['img']."', '".$_POST['price']."', '".$_POST['quantity']."')";
	if (!mysqli_query($conn, $req))
		echo "Error record: " . mysqli_error($conn);
}

function edit_product($conn) {
	if (!(isset($_POST['id']) && isset($_POST['enabled']) && isset($_POST['name']) && isset($_POST['desc'])
		&& isset($_POST['img']) && isset($_POST['price']) && isset($_POST['quantity'])))
		return;
	$enabled = ($_POST['enabled'] == "on") ? true : false;
	$req = "UPDATE products SET enabled='".$enabled."', name='".$_POST['name']."', descr='".$_POST['desc']."', img='".$_POST['img']."', price='".$_POST['price']."', quantity='".$_POST['quantity']."' WHERE id=".$_POST['id'];
	if (!mysqli_query($conn, $req))
		echo "Error record: " . mysqli_error($conn);
}


function delete_product($conn) {
	if (!(isset($_GET['id'])))
		return;
	$req = "DELETE FROM products WHERE id=".$_GET['id'];
	if (!mysqli_query($conn, $req))
		echo "Error record: " . mysqli_error($conn);
}
?>
