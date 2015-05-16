// ************************************************************************** //
//                                                                            //
//                                                        :::      ::::::::   //
//   main.js                                            :+:      :+:    :+:   //
//                                                    +:+ +:+         +:+     //
//   By: alelievr <alelievr@student.42.fr>          +#+  +:+       +#+        //
//                                                +#+#+#+#+#+   +#+           //
//   Created: 2015/04/12 18:57:33 by alelievr          #+#    #+#             //
//   Updated: 2015/05/16 21:11:36 by alelievr         ###   ########.fr       //
//                                                                            //
// ************************************************************************** //

var camera, scene, renderer, geometry, material, mesh, basket = {},
	rendererCSS, objects, len, controls, count, autoRotateForce = true, autoRotateForce2 = true;
var targets = {random: [], sphere: [], helix: [], grid: []};
var mouse = new THREE.Vector3(), contain, raycaster, count1 = 1, pivot, item_visible = false;
var	save_pos = [], save_pos_del = [];
var products = [];
var rotWorldMatrix;
var rotObjectMatrix;
const	speed = 0.004;
const	del_top = 60000;

init();
animate();

function create_rep(pos)
{
	pivot = new THREE.Object3D();
	pivot.position.x = pos.x;
	pivot.position.y = pos.y;
	pivot.position.z = pos.z;
	scene.add(pivot);

	for (i = 0; i < len; i++)
		pivot.add(objects[i]);
}

function rotate_y(rep, speed) { rep.rotation.y += speed; }
function rotate_x(rep, speed) { rep.rotation.x += speed; }
function rotate_z(rep, speed) { rep.rotation.z += speed; }

function anim_remove_item(src, state, id)
{
	src.position.x = state.x;
	src.position.y = state.y;
	src.position.z = state.z;
}

function remove_elem(id)
{
	var src = new THREE.Vector3(objects[id].position.x, objects[id].position.y, objects[id].position.z);
	if (!save_pos[id])
	{
		save_pos[id] = new THREE.Vector3();
		save_pos[id].x = src.x;
		save_pos[id].y = src.y;
		save_pos[id].z = src.z;
		save_pos_del[id] = new THREE.Vector3();
		save_pos_del[id].x = src.x;
		save_pos_del[id].y = src.y + del_top;
		save_pos_del[id].z = src.z;
	}
	var	tmp = new THREE.Vector3(src.x, src.y + del_top, src.z);

	new TWEEN.Tween(src)
		.to(save_pos_del[id], 2000)
		.delay(0)
		.easing(TWEEN.Easing.Exponential.InOut)
		.onUpdate(function(){anim_remove_item(objects[id], src, id)})
//		.onComplete(function(){$("#" + id).css("display", "none")})
		.start();
}

function readd_elem(id)
{
	var src = new THREE.Vector3(objects[id].position.x, objects[id].position.y, objects[id].position.z);

	new TWEEN.Tween(src)
		.to(save_pos[id], 2000)
		.delay(0)
		.easing(TWEEN.Easing.Exponential.InOut)
		.onUpdate(function(){anim_remove_item(objects[id], src, id)})
//		.onStart(function(){$("#" + id).css("display", "block")})
		.start();
}

function create_elem(class_name, scene)
{
	var dom = document.getElementsByClassName(class_name);
	objects = [];
	$(dom).attr('onmouseover', 'item_hover(this.id)');
	$(dom).attr('onmouseout', 'item_blur(this.id)');
	$(dom).attr('onclick', 'item_click(this.id)');
	$(dom).css("display", "block");
	$("." + class_name + " .description").css("display", "none");

	for (var i = 0; i < dom.length; i++)
	{
		var		path = "#" + i + " .description ";

		objects[i] = new THREE.CSS3DObject(dom[i]);
		objects[i].position.x = dom[i].offsetLeft;
		objects[i].position.y = dom[i].offsetTop;
		dom[i].id = i;
		products[$(path + ".item_id").html()] = {
			obj_id: i,
			price: $(path + ".price").html(),
			qty: parseInt($(path + ".quantity").html()),
			name: $("#" + i + " .item_title").html(),
			description: $(path + " .content").html()
		};
		scene.add(objects[i]);
	}
	len = dom.length;
	setTimeout(apply_css, 200);
	return (objects);
}

function apply_css()
{
	var dom = document.getElementsByClassName("item");

	for (var i = 0; i < dom.length; i++)
	{
		$("#" + i + " .item_title").css("bottom", "-50px");
		var		height = $("#" + i + " .item_img").innerHeight();
		$("#" + i + " .item_title_price").css("bottom", "-" + height + "px");
	}
}

function sphere()
{
	var vector = new THREE.Vector3();

	for (var i = 0, l = len; i < len; ++i)
	{
		var phi = Math.acos(-1 + ( 2 * i ) / l);
		var theta = Math.sqrt(l * Math.PI) * phi;
		var obj = new THREE.Object3D();

		obj.position.x = 800 * Math.cos( theta ) * Math.sin( phi );
		obj.position.y = 800 * Math.sin( theta ) * Math.sin( phi );
		obj.position.z = 800 * Math.cos( phi );

		vector.copy(obj.position).multiplyScalar(1.1);
		obj.lookAt(vector);
		targets.sphere.push(obj);
	}
}

function helix()
{
	var vector = new THREE.Vector3();

	for (var i = 0, l = len; i < l; ++i)
	{
		var phi = i * 0.375 + Math.PI;
		var obj = new THREE.Object3D();

		obj.position.x = 900 * Math.sin( phi );
		obj.position.y = - ( i * 16 ) + 450;
		obj.position.z = 900 * Math.cos( phi );
		vector.x = obj.position.x * 2;
		vector.y = obj.position.y;
		vector.z = obj.position.z * 2;
		obj.lookAt( vector );
		targets.helix.push(obj);
	}
}

function grid()
{
	for (var i = 0; i < len; ++i)
	{
		var obj = new THREE.Object3D();

		obj.position.x = ( ( i % 3 ) * 400 ) - 400;
		obj.position.y = ( - ( Math.floor( i / 3 ) % 3 ) * 400 ) + 400;
		obj.position.z = Math.floor(i / 9) * 600 - (len / 9 / 2) * 600;
		targets.grid.push(obj);
	}
}

function random()
{
	for (var i = 0; i < len; i++)
	{
		var obj = new THREE.Object3D();

		obj.position.x = (Math.random() - 0.5) * (window.innerWidth);
		obj.position.y = (Math.random() - 0.5) * (window.innerHeight);
		obj.position.z = (Math.random() - 0.5) * ((window.innerWidth + window.innerHeight) / 2);
		targets.random.push(obj);
	}
}

function transform(targets, duration)
{
	for (var i = 0; i < len; ++i)
	{
		var object = objects[i];
		var target = targets[i];

		new TWEEN.Tween(object.position)
			.to( { x: target.position.x, y: target.position.y, z: target.position.z },
					Math.random() * duration + duration )
			.easing( TWEEN.Easing.Exponential.InOut )
			.start();

		new TWEEN.Tween(object.rotation)
			.to( { x: target.rotation.x, y: target.rotation.y, z: target.rotation.z },
					Math.random() * duration + duration )
			.easing( TWEEN.Easing.Exponential.InOut )
			.start();
	}
	new TWEEN.Tween( this )
		.to( {}, duration * 2 )
		.onUpdate( render )
		.start();
}

function check_writing()
{
	if ($("input").is(":focus"))
		return (1);
	return (0);
}

function init()
{
	init_var();
	scene = new THREE.Scene();
	contain = document.getElementById("canvas");

	raycaster = new THREE.Raycaster();
	camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 10000);
	camera.position.z = 1000;
	scene.add(camera);
	$("body").keydown(function (ev){
		console.log(ev.keyCode);
		if (ev.keyCode == 32 && !check_writing())
	{
		if (count1 % 2)
	{
		controls.autoRotate = false;
		autoRotateForce2 = false;
		autoRotateForce = true;
	}
		else
	{
		controls.autoRotate = true;
		autoRotateForce2 = true;
		autoRotateForce = true;
	}
	count1++;
	}
	});

	objects = create_elem("item", scene);
	create_rep({x: 0, y: 0, z: 0});
	renderer = new THREE.CSS3DRenderer();
	renderer.setSize(window.innerWidth, window.innerHeight);
	contain.appendChild(renderer.domElement);
	contain.addEventListener('mousedown', stopOrbit);
	contain.addEventListener('mouseup', launchOrbit);

	controls = new THREE.OrbitControls(camera);
	controls.minDistance = 1300;
	controls.maxDistance = 6000;
	controls.autoRotate = true;
	controls.zoomSpeed = 2;
	controls.noPan = true;
	controls.autoRotateSpeed = 0;
	controls.rotateSpeed = 0.1;

	helix();
	grid();
	sphere();
	random();
	if (len < 9)
		transform(targets.grid, 2000);
	else if (len < 42)
		transform(targets.sphere, 2000);
	else if (len < 100)
		transform(targets.helix, 2000);
	else if (len < 200)
		transform(targets.random, 2000);
	window.addEventListener('resize', onWindowResize, false);
}

function animate()
{
	if (controls.autoRotate)
		rotate_y(pivot, speed);
	requestAnimationFrame(animate);
	rotate_wtf();
	render();
	TWEEN.update();
	controls.update();
}

function onWindowResize()
{
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize( window.innerWidth, window.innerHeight );
	render();
}

function render()
{
	renderer.render(scene, camera);
}

function call_search(str)
{
	for (p of products)
		if (p && p.qty > 0)
		{
			if ((p.name.indexOf(str) == -1 && p.description.indexOf(str) == -1))
				remove_elem(p.obj_id);
			else
			{
				if (save_pos[p.obj_id])
					readd_elem(p.obj_id);
			}
		}
}
