/*global THREE, requestAnimationFrame, console*/

var currCamera, scene, renderer;

var geometry, boxMaterial, ballMaterial, mesh;

var balls = new Array();

var clock = new THREE.Clock();

var magnClock = new THREE.Clock();

var level = 1;

var leftLimit = -200 + 10*Math.sqrt(5)

var rightLimit = 200 - 10*Math.sqrt(5)

var topLimit = -100 + 10*Math.sqrt(5)

var botLimit = 100 - 10*Math.sqrt(5)

var ballRadius= 10*Math.sqrt(5)

var ballNumber= 10

var camera;

var changeAxesHelper=0,changeCamera=0;
function addArenaFloor(obj, x, y, z) {
    'use strict';

    geometry = new THREE.CubeGeometry(400, 1, 200);
    mesh = new THREE.Mesh(geometry, boxMaterial);
    mesh.position.set(x, y, z);
    obj.add(mesh);
}

function addArenaBigWall(obj, x, y, z) {
	'use strict';
	
	geometry = new THREE.CubeGeometry(400, 20*Math.sqrt(5), 1);
	mesh = new THREE.Mesh(geometry, boxMaterial);
	mesh.position.set(x,y,z);
	obj.add(mesh);
}

function addArenaSmallWall(obj, x, y, z) {
	'use strict';
	geometry = new THREE.CubeGeometry(1, 20*Math.sqrt(5), 202);
	mesh = new THREE.Mesh(geometry, boxMaterial);
	mesh.position.set(x,y,z);
	obj.add(mesh);
}


function createArena(x, y, z) {
    'use strict';
    
    var arena = new THREE.Object3D();
    
    boxMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff, wireframe: true });
    addArenaFloor(arena, 0, -0.5, 0);
	addArenaBigWall(arena, 0, 10*Math.sqrt(5) + 0.5 , 100.5);
	addArenaBigWall(arena, 0, 10*Math.sqrt(5) + 0.5 , -100.5);
	addArenaSmallWall(arena, 200.5, 10*Math.sqrt(5) + 0.5, 0);
	addArenaSmallWall(arena, -200.5, 10*Math.sqrt(5) + 0.5, 0);

	
    
    scene.add(arena);
    
    arena.position.x = x;
    arena.position.y = y;
    arena.position.z = z;
}

function createBall(x,y,z,obj, index){
	'use strict';
	geometry = new THREE.SphereGeometry(ballRadius,30,30);
	mesh = new THREE.Mesh(geometry, ballMaterial);
	if (index == 0){
		var bMat2 = new THREE.MeshBasicMaterial({color: 0xffff00, wireframe: true});
		mesh = new THREE.Mesh(geometry, bMat2);
	}
	
	var ball = new THREE.Object3D();
	var ball_int = new THREE.Object3D();
	ball_int.add(mesh);
	var axesHelper= new THREE.AxesHelper(ballRadius*1.5)
	ball_int.add(axesHelper);
	ball.position.set(x,y,z);
	ball.userData.position= new THREE.Vector3(x,y,z);
	ball.add(ball_int);
	ball.userData.ball_int = ball_int;
	obj.add(ball);
	balls[index]=ball;
	
}
function createBalls(x, y, z) {
	'user strict';
	ballMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000, wireframe: true });
	var y = 10*Math.sqrt(5) + 0.5;
	var x =-50
	var z =0
	var posTaken
	//encontra posicao de arena random ainda nao ocupada
	for(let i = 0; i < ballNumber; i++){
		posTaken=true
		while(posTaken){
			posTaken=false;
			x = Math.floor((Math.random() * (199 - 10*Math.sqrt(5)))) * (Math.round(Math.random()) * 2 - 1); 
			z = Math.floor((Math.random() * (99 - 10*Math.sqrt(5)))) * (Math.round(Math.random()) * 2 - 1);
			for(let j=0; j < i; j++){
				if( balls[j].userData.position.distanceTo(new THREE.Vector3(x,y,z)) <= 2*ballRadius){
                    posTaken = true;
                    break;
                }
			}
		}
		//cria bola na posicao encontrada com velocidade inicial random
		createBall(x,y,z,scene, i);
		balls[i].userData.velocity = new THREE.Vector3((Math.random()-0.5)*30,0,(Math.random()-0.5)*30)
		balls[i].userData.newVelocity= new THREE.Vector3().copy(balls[i].userData.velocity)
		balls[i].userData.rotationAxis = new THREE.Vector3(0,0,0);
	}
	
}
function createScene() {
    'use strict';
    
    scene = new THREE.Scene();
    

    scene.add(new THREE.AxesHelper(10));
    
    createArena(0, 0, 0);
	createBalls(0, 0, 0);
}

function orthCamera(x,y,z) {
    'use strict';
    var frustumSize=400;
    var aspect = window.innerWidth / window.innerHeight;
    var camera = new THREE.OrthographicCamera( frustumSize * aspect /- 2, frustumSize * aspect / 2, frustumSize / 2, frustumSize / -2, 1, 1000 );
	//camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.x = x;
    camera.position.y = y;
    camera.position.z = z;
    camera.lookAt(scene.position);
    return camera
}

function prespCamera(x,y,z) {
    'use strict';
   
	var camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.x = x;
    camera.position.y = y;
    camera.position.z = z;
    camera.lookAt(scene.position);
    return camera
}
/*
function ballCamera() {
	'use strict';
	var camera = new THREE.PerspectiveCamera(90,
						window.innerWidth / window.innerHeight,
						1,
						1000);
	balls[0].add(camera);
	return camera;
}*/
// para se bola n tiver se seguir movimento
function ballCamera() {
	'use strict';
	camera = new THREE.PerspectiveCamera(90,
						window.innerWidth / window.innerHeight,
						1,
						1000);
	camera.position.x = 0;
	camera.position.y = 50;
	camera.position.z = 50;
	camera.lookAt(scene.position);
	balls[0].add(camera);
	return camera;
}


function render() {
    'use strict';
    renderer.render(scene, currCamera);
}
function manageCamera(){
	if(changeCamera!=0){
		currCamera=camera[changeCamera-1]
		changeCamera=0;
	}
}

function manageAxesHelper(){
	var node
	scene.traverse(function (node) {
		if(changeAxesHelper==1){
			if (node instanceof THREE.AxesHelper) {
                node.visible= !node.visible;
            }
        }
    })
		//scene.AxesHelper.visible=!scene.AxesHelper.visible
		//balls[0].axesHelper.visible=!balls[0].AxesHelper.visible
	changeAxesHelper=0;

}

function onKeyDown(e) {
    'use strict';
    
    switch (e.keyCode) {
    case 69: //E
    case 101: //e
        changeAxesHelper=1;
        break;
	case 49://1
		changeCamera=1
		break;
	case 50://2
		changeCamera=2
		break;
	case 51://3
		changeCamera=3
		break;
    }
}
function init() {
    'use strict';
    renderer = new THREE.WebGLRenderer({
        antialias: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
    createScene();
    camera=[orthCamera(0, 40, 0),prespCamera(210,210,210),ballCamera(0,5,5)]
    currCamera=camera[0]
    console.log("level "+level)
	magnClock.start();
	window.addEventListener("keydown", onKeyDown);
	window.addEventListener("resize", onResize);
}


function moveHandler(){
	'use strict';
	var time = clock.getDelta();
	for(let i = 0; i <  ballNumber; i++){
		balls[i].translateOnAxis(balls[i].userData.velocity, time);
		balls[i].userData.position.copy( (balls[i].getWorldPosition(new THREE.Vector3()) ))
		
	}

	var colisionNumber=1
	while (colisionNumber!=0){
		colisionNumber=ballColisionHandler()
		colisionNumber+=wallColisionHandler()
	}
	if (magnClock.getElapsedTime() > 5){
		magnClock = new THREE.Clock();
		magnClock.start();
		if(level<20){
			for (var i = 0; i <  ballNumber; i++) {
				balls[i].userData.newVelocity.multiplyScalar(1/level);		
				balls[i].userData.newVelocity.multiplyScalar(level+1);
				balls[i].userData.velocity.copy(balls[i].userData.newVelocity)
			}
		level++;
		console.log("level "+level)
		}
		
	}
	var aux
	var aux2
	//posicao para olhar: um pouco mais a frente da bola, na direcao do movimento
	aux = balls[0].userData.newVelocity.clone()
	aux.normalize().multiplyScalar(40);
	aux2=balls[0].userData.position.clone()
	camera[2].lookAt(aux2.add(aux))
	aux.negate()
	//posicao de camara atras da bola
	camera[2].position.set(0+aux.x,40,0+aux.z)
	//calculo da rotacao das bolas
	for (var i = 0; i < ballNumber; i++) {
		aux = new THREE.Vector3(0,1,0).cross(balls[i].userData.velocity).normalize();
		rotateAroundWorldAxis(balls[i].userData.ball_int, aux, (balls[i].userData.velocity.length() * time)/ballRadius);
	}
		
}

function rotateAroundWorldAxis(object, axis, radians) {
    rotWorldMatrix = new THREE.Matrix4();
    rotWorldMatrix.makeRotationAxis(axis.normalize(), radians);
    rotWorldMatrix.multiply(object.matrix);        // pre-multiply

    object.matrix = rotWorldMatrix;
    object.rotation.setFromRotationMatrix(object.matrix)//(object.matrix, object.scale);
}

function wallColisionHandler(){
	var time = clock.getDelta();
	var colisionNumber=0;
	for(let i = 0; i <  ballNumber; i++){
/* leftLimit = -200 + 10*Math.sqrt(5)

var rightLimit = 200 - 10*Math.sqrt(5)

var topLimit = -100 + 10*Math.sqrt(5)

var botLimit = 100 - 10*Math.sqrt(5)*/
		if(balls[i].userData.position.x >= rightLimit){ 

			distance=balls[i].userData.position.x-rightLimit;
			balls[i].translateOnAxis(new THREE.Vector3(1,0,0), -2*distance);
			balls[i].userData.newVelocity.x= -balls[i].userData.velocity.x;
			colisionNumber++
		}
		if(balls[i].userData.position.z <= topLimit){

			distance=balls[i].userData.position.z-topLimit;
			balls[i].translateOnAxis(new THREE.Vector3(0,0,1), -2*distance);
			balls[i].userData.newVelocity.z= -balls[i].userData.velocity.z;
			colisionNumber++
		}
		if(balls[i].userData.position.x <= leftLimit){
			distance=balls[i].userData.position.x-leftLimit;
			balls[i].translateOnAxis(new THREE.Vector3(1,0,0), -2*distance);
			balls[i].userData.newVelocity.x= -balls[i].userData.velocity.x;
			colisionNumber++
		}
		if( balls[i].userData.position.z >= botLimit){
			distance=balls[i].userData.position.z-botLimit;
			balls[i].translateOnAxis(new THREE.Vector3(0,0,1), -2*distance);
			balls[i].userData.newVelocity.z= -balls[i].userData.velocity.z;
			colisionNumber++
		}
	}
	for(let i =0;i< ballNumber;i++){
		balls[i].userData.position.copy( (balls[i].getWorldPosition(new THREE.Vector3()) ))
		balls[i].userData.velocity.copy(balls[i].userData.newVelocity)
	}
	return colisionNumber
}
function ballColisionHandler(){
	var checkColision=true
	var numberColisions=0
	while (checkColision == true){
		checkColision=false
		for(let i =0;i< ballNumber;i++){
			for(let j =i+1;j< ballNumber;j++){
				distance = balls[i].userData.position.distanceTo( balls[j].userData.position );
				if(distance < 2*ballRadius){
					checkColision=true
					numberColisions++
					var distanceV=new THREE.Vector3(0,0,0)
					var colision_velocityV=new THREE.Vector3(0,0,0)
					var efective_colision_velocity
					var efective_colision_velocityV= new THREE.Vector3()
					//calcula velocidade efetiva da colisao em vetor
					colision_velocityV.subVectors(balls[i].userData.velocity,balls[j].userData.velocity)
					//calcula distancia vetorial entre os dois centros das bolas
					distanceV.subVectors(balls[i].position,balls[j].position)
					//calcula a velocidade na direcao da bola[i]
					efective_colision_velocityV.copy(distanceV.multiplyScalar(colision_velocityV.dot(distanceV)/Math.pow(distance,2)))
					efective_colision_velocity=efective_colision_velocityV.length()
					//calcula tempo em que bolas se estavam a sobrepor em vez de andarem com a nova velocidade
					time_since_colision=Math.abs(((2*ballRadius-distance)/efective_colision_velocity))*1.0000001//* 1.01 para evitar arredondamentos para baixo
					//bolas sao postas no sitio da colisao e andam o resto da duracao com a nova velocidade
					balls[i].translateOnAxis(balls[i].userData.velocity, -time_since_colision);
					balls[j].translateOnAxis(balls[j].userData.velocity, -time_since_colision);

					balls[i].userData.newVelocity.subVectors(balls[i].userData.newVelocity,efective_colision_velocityV)
					balls[j].userData.newVelocity.addVectors(balls[j].userData.newVelocity,efective_colision_velocityV)

					balls[i].translateOnAxis(balls[i].userData.newVelocity, time_since_colision);
					balls[j].translateOnAxis(balls[j].userData.newVelocity, time_since_colision);
				}		
			}
		}
		if(checkColision==true){
			for(let i =0;i< ballNumber;i++){
				balls[i].userData.position.copy( (balls[i].getWorldPosition(new THREE.Vector3()) ))
				balls[i].userData.velocity.copy(balls[i].userData.newVelocity)
			}
		}
	}
	return numberColisions
}

function onResize() {
	'use strict';
	
	renderer.setSize(window.innerWidth, window.innerHeight);
	var frustumSize = 400;
	var aspectRatio = window.innerWidth / window.innerHeight;

	camera[1].aspect = renderer.getSize().width / renderer.getSize().height;
	camera[1].updateProjectionMatrix();
	camera[2].aspect = renderer.getSize().width / renderer.getSize().height;
	camera[2].updateProjectionMatrix();
	
	
	if (window.innerHeight > 0 && window.innerWidth > 0) {
		if (aspectRatio > 1) {
			console.log("here1");
			camera[0].left = -aspectRatio*frustumSize/2;
			camera[0].right = aspectRatio*frustumSize/2;
			camera[0].top = frustumSize/2;
			camera[0].bottom = -frustumSize/2;
		} 
		else {
			console.log("here2");
			camera[0].left = -frustumSize/2;
			camera[0].right = frustumSize/2;
			camera[0].top = frustumSize/aspectRatio/2;
			camera[0].bottom = -frustumSize/aspectRatio/2;
		}
		camera[0].updateProjectionMatrix();
	}	
}



function animate(){
	'use strict';
	render();
	manageAxesHelper();
	manageCamera();
	moveHandler();
	requestAnimationFrame(animate);
}
