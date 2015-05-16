// ************************************************************************** //
//                                                                            //
//                                                        :::      ::::::::   //
//   basket.js                                          :+:      :+:    :+:   //
//                                                    +:+ +:+         +:+     //
//   By: alelievr <alelievr@student.42.fr>          +#+  +:+       +#+        //
//                                                +#+#+#+#+#+   +#+           //
//   Created: 2015/04/12 19:19:22 by alelievr          #+#    #+#             //
//   Updated: 2015/05/16 21:05:53 by alelievr         ###   ########.fr       //
//                                                                            //
// ************************************************************************** //

var		count_item_list = 0, toggle = 1;
var		local_basket = [];

$("#basket_bar input").css("display", "none");
$(".sidebar").css("background-color", "rgba(10, 10, 10, 0.5)");
$("#basket_bar").hover(function (){controls.noZoom = true}, function (){controls.noZoom = false});

function fill_basket_list()
{
	for (var key in basket)
	{
		$.ajax({
			type: "GET",
			url: "api/get_item.php?id=" + key,
		}).done(function (res) {
			var data = res.split("\n");
			addTo_basket(data[1], data[2], data[0], data[3], data[4]);
		});
	}
}

function toggle_basket()
{
	$("#basket_bar").css("right", "-10%");
	if (toggle % 2)
		$("#basket_bar").css("right", "0%");
	toggle++;
}

function check_double_bascket(id, quantity)
{
	var		doc = document.getElementsByClassName("basket_list_item");

	for (var i = 0; i < doc.length; i++)
	{
		if ($("#" + doc[i].id + " .basket_list_item_id").html() == id)
		{
			var		html = $("#" + doc[i].id + " .basket_list_item_quantity").html();
			var		qtyid = parseInt(html.split("qty_")[1]);
			var		newqty = parseInt(html.split(">")[1]) + parseInt(quantity);
			local_basket[i - 1].qty += parseInt(quantity);
			$("#" + doc[i].id + " .basket_list_item_quantity").html("quantity: <div id=qty_"
				+ qtyid + ">" + newqty + "</div>");
			$("#qty_"  + qtyid).css("display", "inline");
			return (1);
		}
	}
	return (0);
}

function update_basket_total_price()
{
	var		total = 0;
	
	for (var b of local_basket)
		if (b)
			total += b.qty * b.price;
	total = Math.round(total * 100) / 100;
	$("#basket_total_price").html("Total: " + total + "$");
}

function addTo_basket(src, id_item, title, price, quantity)
{
	if (!check_double_bascket(id_item, quantity))
	{
		var item_list = $("#item_list_patern");
		var list_container = $("#basket_list");
		var id = "basket_list_item_" + count_item_list;
		var item = item_list.clone();

		list_container.append(item);
		item.attr("id", id);
		$("#" + id + " .basket_list_item_img img").attr("src", src);
		$("#" + id + " .basket_list_item_title").html(title);
		$("#" + id + " .basket_list_item_price").html("unit price: <div id=price_"
				+ count_item_list + ">" + price + "</div>$");
		$("#" + id + " .basket_list_item_quantity").html("quantity: <div id=qty_"
				+ count_item_list + ">" + quantity + "</div>");
		$("#" + id + " .basket_list_item_id").html(id_item);
		$("#price_" + count_item_list).css("display", "inline");
		$("#qty_" + count_item_list).css("display", "inline");
		$("#" + id).css("display", "block");
		$("#" + id).css("margin", "5px");
		local_basket.push({
			id: count_item_list,
			qty: parseInt(quantity),
			price: price,
			title: title
		})
	//	$("#" + id).click(function (){count_item_list--; $(this).remove();update_basket_total_price()});
		count_item_list++;
	}
	if (count_item_list > 0)
		$("#basket_bar input").css("display", "block");
	update_basket_total_price();
}
