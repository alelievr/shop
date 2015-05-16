// ************************************************************************** //
//                                                                            //
//                                                        :::      ::::::::   //
//   func.js                                            :+:      :+:    :+:   //
//                                                    +:+ +:+         +:+     //
//   By: alelievr <alelievr@student.42.fr>          +#+  +:+       +#+        //
//                                                +#+#+#+#+#+   +#+           //
//   Created: 2015/04/11 21:13:54 by alelievr          #+#    #+#             //
//   Updated: 2015/05/16 18:47:11 by alelievr         ###   ########.fr       //
//                                                                            //
// ************************************************************************** //

var		r = 1, rw = 0;

function rotate_wtf()
{
	if (rw % 2)
	{
		for (var i = 0; i < len; i++)
		{
			  objects[i].rotation.y += 0.015;
		/*	if (objects[i].rotation.y > Math.PI)
				objects[i].rotation.y = -Math.PI;
			if (objects[i].rotation.y <= Math.PI / 2 && objects[i].rotation.y >= -Math.PI / 2)
				console.log("other side !");*/
		}
	}
}

function rand_transform()
{
	var		tmp;

	while ((tmp = Math.ceil(Math.random() * 4)) == r)
		;
	r = tmp;

	if (r == 1)
		transform(targets.sphere, 2000);
	if (r == 2)
		transform(targets.helix, 2000);
	if (r == 3)
		transform(targets.random, 2000);
	if (r == 4)
		transform(targets.grid, 2000);
}

function init_var()
{
	count = 0;
	$("#item_prec_close").click(item_quit);
	$("#gear_img").click(rand_transform);
	$("#gear_img2").click(function (){rw++});
	$("#basket_img").click(toggle_basket);
	$("#select1").click(function(){$("#select1").focus()});
	$("#select2").click(function(){$("#select2").focus()});
	$("#searchbar").click(function(){$("#searchbar").focus()});
	basket = {};
	$.getJSON("../api/get_basket.php", {})
		.done(function( json ) {
			if (json)
			basket = json;
		console.log( "JSON Data: " + json);
		//adding basket content to basket bar:
		fill_basket_list()
		})
	.fail(function( jqxhr, textStatus, error ) {
		var err = textStatus + ", " + error;
		console.log( "Request Failed: " + err );
	});
}

function launchOrbit()
{
	setTimeout(function(){
		if (autoRotateForce && autoRotateForce2)
			controls.autoRotate = true;
	}, 1000);
}

function stopOrbit(event)
{
	switch (event.button)
	{
		case 0: // left 
			$("input").blur();
			console.log("left button !");
			break;
		case 1: // middle
			console.log("middle button !");
			break;
		case 2: // right
			console.log("right button !");
			break;
	}
	controls.autoRotate = false;
}

function item_hover(id)
{
	$("#" + id + " .item_title").css("opacity", 1);
	$("#" + id + " .item_title_price").css("opacity", 1);
}

function item_blur(id)
{
	$("#" + id + " .item_title").css("opacity", 0);
	$("#" + id + " .item_title_price").css("opacity", 0);
}

function item_buy()
{
	var val = parseInt($("#item_prec_quantity_val").val());
	if (val <= 0 || !val || products[$("#item_prec_id").html()].qty
			- parseInt($("#item_prec_quantity_val").val()) < 0)
		return ;

	products[$("#item_prec_id").html()].qty -= parseInt($("#item_prec_quantity_val").val());
	update_prec_info($("#item_prec_id").html());
	//animation for image
	var	clone = $("#item_prec_img").clone();
	clone.attr("id", "item_img_slide" + count);
	clone.css("position", "absolute");
	clone.css("float", "left");
	clone.css("top", $("#item_prec_img").offset().top);
	clone.css("left", $("#item_prec_img").offset().left);
	clone.css("width", $("#item_prec_img").width());
	clone.css("height", $("#item_prec_img").height());
	clone.css("z-index", "4200");
	var id_img_slide = "#item_img_slide" + count;
	$("#img_prec_slide_contener").append(clone);
	$(id_img_slide).animate(
			{
				opacity: 0.5,
		left: $("#basket_img").position().left,
		top:  $("#basket_img").position().top,
		width: $("#basket_img").width(),
		height: $("#basket_img").height()
			}, 1000, function() {
				$(id_img_slide).css("display", "none");
				$(id_img_slide).remove();
			});

	//sending new basket to server
	if (!basket[$("#item_prec_id").html()])
		basket[$("#item_prec_id").html()] = 0;
	basket[$("#item_prec_id").html()] += parseInt($("#item_prec_quantity_val").val());
	var jsonbasket = JSON.stringify(basket);
	$.getJSON( "../api/set_basket.php", "basket=" + jsonbasket)
		.done(function( json ) {
			console.log("content = " + json);
		})
	.fail(function( jqxhr, textStatus, error ) {
		console.log("error = " + textStatus + ", " + error);
	});

	//update the basket
	addTo_basket($("#item_prec_img").attr("src"), $("#item_prec_id").html(),
			$("#item_pre_title").html(), $("#item_prec_price").html(), /*basket[$("#item_prec_id").html()]*/
			$("#item_prec_quantity_val").val());
	count++;
}

function keyPressItemPrec(ev)
{
	if (ev.keyCode == 27)
		item_quit();
	if (ev.keyCode == 13)
		item_buy();
}

function item_click(id)
{
	autoRotateForce = false;
	controls.autoRotate = false;
	controls.enabled = false;


	$('#test_modal').modal('show');
	$("#item_prec").css("display", "block");
	$(document).keydown(keyPressItemPrec);
	$("#item_prec_content").html($("#" + id + " .description .content").html());
	$("#item_prec_title").html($("#" + id + " .item_title").html());
	$("#item_prec_price").html("unit price: " + $("#" + id + " .description .price").html() + "$");
	$("#item_prec_quantity").html("stock: " + $("#" + id + " .description .quantity").html());
	$("#item_prec_id").html($("#" + id + " .description .item_id").html());
	$("#item_prec_img").attr("src", $(("#" + id + " img")).attr("src"));
	$("#item_prec").css("height", "60%");
	$("#item_prec").css("width", "60%");
	$("#item_buy").click(item_buy);
}

function item_quit()
{
	$('#test_modal').modal('hide');
	$("#item_prec").css("display", "none");
	controls.enabled = true;
	autoRotateForce = true;
	if (autoRotateForce2)
		controls.autoRotate = true;
	$("#item_buy").unbind();
	$(document).unbind();
	update_qty_products();
	$("#item_prec_quantity_val").val(1);
}

function update_prec_info(id)
{
	console.log(id);
	$("#item_prec_quantity").html("stock: " + products[id].qty);
}

function update_qty_products()
{
	var		doc = document.getElementsByClassName("item");

	for (var s of products)
		if (s && s.qty <= 0)
			remove_elem(s.obj_id);
}
