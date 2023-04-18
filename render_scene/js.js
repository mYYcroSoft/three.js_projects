import * as THREE from 'three';
import * as TWEEN from '@tweenjs/tween.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight);

var renderer = new THREE.WebGLRenderer({antialias: true});



renderer.setSize(window.innerWidth,window.innerHeight);
$('body').append(renderer.domElement);
 
camera.position.x = 0
camera.position.y = 1
camera.position.z = 0
camera.rotation.y = 0.1
camera.rotation.x = -0.1

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

  function changeRot(target, targetPosition, speed) {
    const rotation = {  
      x: target.rotation.x,
      y: target.rotation.y,
      z: target.rotation.z
    };
  
    new TWEEN.Tween(rotation)
      .to(targetPosition, speed)
      .onUpdate(() => {
        target.rotation.x = rotation.x;
        target.rotation.y = rotation.y;
        target.rotation.z = rotation.z;
      })
      .start();
      return true;
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


// ADD OBJECT FUNTIONrender_scene/js.jschan

// ----------------------------------------
// SCENE
// PLAYER



var p_geometry = new THREE.BoxGeometry(1,1,1);
var p_material = new THREE.MeshBasicMaterial({color: new THREE.Color('rgb(118, 52, 250)')});
var p_cube = new THREE.Mesh(p_geometry,p_material);
p_cube.position.z = -6;
p_cube.position.x = -6;
p_cube.receiveShadow = true;
scene.add(p_cube)



// player controls:

let mode = 'camera'

const player_data = p_cube

window.addEventListener("keydown", function(event) {

if (mode == 'game'){
    if (event.key === "w") {
      // Spuštění funkce při stisknutí klávesy "W"
      console.log("[Cube] > Go front")
      player_data.position.x = player_data.position.x + 0.1
        camera.position.x = camera.position.x + 0.1
      renderer.render(scene,camera);

      if(player_data.position.x == cube.position.x){
        console.log("DANGER")
        player_data.position.x = -4
      }
    }
    if (event.key === "s") {
        // Spuštění funkce při stisknutí klávesy "W"
        console.log("[Cube] > Go back")
        player_data.position.x = player_data.position.x - 0.1
        camera.position.x = camera.position.x - 0.1
        renderer.render(scene,camera);
    }
    if (event.key === "a") {
      // Spuštění funkce při stisknutí klávesy "B"
      console.log("[Cube] > Go back")
      changePos(player_data, { y: 1}, 50);

      animate();
      renderer.render(scene,camera);
    }
  if (event.key === "d") {
      // Spuštění funkce při stisknutí klávesy "B"
      console.log("[Cube] > Go back")
      changePos(player_data, { y: 0}, 50);
      animate();
      renderer.render(scene,camera);
    }
  }
    
  })
  ;
  
      window.addEventListener("keydown", function(event) {
        // Change movment mode
        if (event.key == "p"){
          if (mode == 'camera'){
            mode = 'game'
            console.log("Mode set to: " + mode)
          } else{
            mode = 'camera'
            console.log("Mode set to:" + mode)
          }

        }
     

        // Camera roation
        if (mode == 'camera'){
        if(event.key === "8"){
          changeRot(camera, { x:camera.rotation.x +0.1}, 100);
          animate();
        } 
        if(event.key === "5"){
          changeRot(camera, { x:camera.rotation.x -0.1}, 100);
          animate();
        } 
        if(event.key === "4"){
          changeRot(camera, { y:camera.rotation.y +0.1}, 100);
          animate();
        } 
        if(event.key === "6"){
          changeRot(camera, { y:camera.rotation.y -0.1}, 100);
          animate();
        } 
        if(event.key === "w"){
          changePos(camera, { z:camera.position.z -0.1}, 100);
          animate();
        } 
        if(event.key === "s"){
          changePos(camera, { z:camera.position.z +0.1}, 200);
          animate();
        } 
        if(event.key === "a"){
          changePos(camera, { x:camera.position.x +0.1}, 200);
          animate();
        } 
        if(event.key === "d"){
          changePos(camera, { x:camera.position.x -0.1}, 200);
          animate();
        } 

      }
      })







// ----------------------------------------

// FLOOR
var f_geometry = new THREE.BoxGeometry(20,1,2);
var f_color = new THREE.Color( 404040 );
var f_material = new THREE.MeshBasicMaterial({color: new THREE.Color('rgb(104, 62, 125 )')});
var floor = new THREE.Mesh(f_geometry,f_material);
var floor_up = new THREE.Mesh(f_geometry,f_material);
floor.receiveShadow = true;
floor_up.receiveShadow = true;
scene.add(floor, floor_up)  
floor.position.z= -6;
floor.position.y= -1; 
floor.position.x= 0;
floor_up.position.z= -6;
floor_up.position.y= 2; 
floor_up.position.x= 0;






// TERRAIN SCENE
const light = new THREE.AmbientLight( 0x404040 ); // soft white light
scene.add( light );
light.position.z = -6;
renderer.render(scene,camera);

