import * as THREE from 'three';
import * as TWEEN from '@tweenjs/tween.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight);

var renderer = new THREE.WebGLRenderer({antialias: true});

renderer.setSize(window.innerWidth,window.innerHeight);
$('body').append(renderer.domElement);
 
camera.position.x = 0
camera.position.y = 0
camera.position.z = 0

var geometry = new THREE.BoxGeometry(1,1,1);

var material = new THREE.MeshBasicMaterial({color: 0xff0000});

var cube = new THREE.Mesh(geometry,material);

var door = new THREE.Mesh(geometry,new THREE.MeshBasicMaterial({color: 0xff0000}));
scene.add(cube, door);

door.position.z= -6;
door.position.x= 0;

cube.position.x = 3;
cube.position.z = -6;

// ---------------------------
// ANIMATE CHANGE POS
// ---------------------------
function animate() {
    requestAnimationFrame(animate);
    TWEEN.update();
    renderer.render(scene, camera);
  }
  
  function changePos(target, targetPosition, speed) {
    const position = {  
      x: target.position.x,
      y: target.position.y,
      z: target.position.z
    };
  
    new TWEEN.Tween(position)
      .to(targetPosition, speed)
      .onUpdate(() => {
        target.position.x = position.x;
        target.position.y = position.y;
        target.position.z = position.z;
      })
     // .onComplete(() => {
       // TWEEN.remove(tween);
      //})
      .start();
      return true;
  }
  
  
  window.three_js_pos = function() {
      console.log("S")
      changePos(cube, {x: 5, z: -4});
      console.log()
      animate();
  }


// ADD OBJECT FUNTIONrender_scene/js.js

// ----------------------------------------
// SCENE
// PLAYER


var player = new THREE.Mesh( new THREE.BoxGeometry(0.01,0.01,0.01), new THREE.MeshBasicMaterial({color: new THREE.Color("rgb( 5, 250, 206)")}));
scene.add(player)
player.position.z= -1;
player.position.y= 0.1; 
player.position.x= -1;



// player controls:

window.addEventListener("keydown", function(event) {
    if (event.key === "w") {
      // Spuštění funkce při stisknutí klávesy "W"
      console.log("[Cube] > Go front")
      cube.position.x = cube.position.x + 0.1
        camera.position.x = camera.position.x + 0.1
      renderer.render(scene,camera);
    }
    if (event.key === "s") {
        // Spuštění funkce při stisknutí klávesy "W"
        console.log("[Cube] > Go back")
        cube.position.x = cube.position.x - 0.1
        camera.position.x = camera.position.x - 0.1
        renderer.render(scene,camera);
    }
    if (event.key === "b") {
        // Spuštění funkce při stisknutí klávesy "W"
        console.log("[Cube] > Go back")
        changePos(cube, {x: cube.position.x, y: 2}, 100);
  
        setTimeout(function() {
            changePos(cube, {x: cube.position.x, y: 0}, 100);
        }, 100);
        animate();
        renderer.render(scene,camera);
      }

  });





// ----------------------------------------

// FLOOR
var f_geometry = new THREE.BoxGeometry(20,1,6);
var f_color = new THREE.Color( 404040 );
var f_material = new THREE.MeshBasicMaterial({color: f_color});
var floor = new THREE.Mesh(f_geometry,f_material);
scene.add(floor)
floor.position.z= -6;
floor.position.y= -2; 
floor.position.x= 0;





renderer.render(scene,camera);

