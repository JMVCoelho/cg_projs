var camera, scene, renderer;

var geometry, mesh, chair;

var brown = new THREE.MeshBasicMaterial({ color: 0xde8913, wireframe: true });
var white = new THREE.MeshBasicMaterial({ color: 0xffffff, wireframe: true });
var grey = new THREE.MeshBasicMaterial({ color: 0xaaaaaa, wireframe: true });
var red = new THREE.MeshBasicMaterial({ color: 0xDC143C, wireframe: true });


var clock = new THREE.Clock();


var movDown,movUp,movLeft,movRight;

function addLampTopHolder(obj,x,y,z){
	'use strict';
	var roty;
	for(let i=0;i<3;i++) {
		roty=(Math.PI*2*i)/3;
		addLampTopHolderPart(obj,x,y,z,roty);
	}
}

function addLampTopHolderPart(obj,x,y,z,roty){
	'use strict';
	geometry = new THREE.CylinderGeometry(0.01,0.01,2.9*2,25);
	mesh = new THREE.Mesh(geometry, grey);
	mesh.position.set(x,y,z);
	mesh.rotation.z=Math.PI/2;
	mesh.rotation.y=roty;
	obj.add(mesh);
}

function addLampBase(obj, x, y ,z){
	'use strict';

	geometry = new THREE.CylinderGeometry(2,2,0.2,25);
	mesh = new THREE.Mesh(geometry, brown);
	mesh.position.set(x,y,z);
	obj.add(mesh);
}

function addLampPole(obj, x, y ,z){
	'use strict';

	geometry = new THREE.CylinderGeometry(0.5,0.5,6.3,25);
	mesh = new THREE.Mesh(geometry, brown);
	mesh.position.set(x,y,z);
	obj.add(mesh);
}

function addLampTop(obj, x, y ,z){
	'use strict';

	geometry = new THREE.CylinderGeometry(1,3,5,25,1,true);
	mesh = new THREE.Mesh(geometry, grey);
	mesh.position.set(x,y,z);
	obj.add(mesh);
}
function addUpperLightBall(obj, x, y ,z){
	'use strict';
	geometry = new THREE.SphereGeometry(1,30,30);
	mesh = new THREE.Mesh(geometry, white);
	mesh.position.set(x,y,z);
	obj.add(mesh);

}
function addLowerLightBall(obj, x, y ,z){
	'use strict';
	geometry = new THREE.CylinderGeometry(0.8,0.4,0.7,30,1);
	mesh = new THREE.Mesh(geometry, white);
	mesh.position.set(x,y,z);
	obj.add(mesh);

}


function createLamp(x,y,z){
	'use strict';

	var lamp = new THREE.Object3D();

	addLampBase(lamp,0,0.1,0);
	addLampPole(lamp, 0, 3.35, 0);
	addLampTop(lamp,0,8.5,0);
	addLampTopHolder(lamp,0,6.25,0);
	addUpperLightBall(lamp,0,7.8,0);// origem base da lampada
	addLowerLightBall(lamp,0,6.85,0);

	scene.add(lamp);
	lamp.position.set(x,y,z);
}

function addChairSeat(obj, x, y, z){
	'use strict';

	geometry = new THREE.CubeGeometry(15,1,15);
	mesh = new THREE.Mesh(geometry, grey);
	mesh.position.set(x,y,z);
	obj.add(mesh);
}

function addChairBack(obj, x, y, z){
	'use strict';

	geometry = new THREE.CubeGeometry(15,20,1);
	mesh = new THREE.Mesh(geometry, grey);
	mesh.position.set(x,y,z);
	obj.add(mesh);
}

function addWheel(obj,x,y,z){
	'use strict';
	geometry = new THREE.TorusGeometry(1,0.3,25,25);
	mesh = new THREE.Mesh(geometry, brown);
	mesh.position.set(x,y,z);
	mesh.rotation.y=Math.PI/2;
	obj.add(mesh);
}

function addWheelSpokes(obj,x,y,z){
	'use strict';
	var rotx;
	for(let i=0;i<3;i++) {
		rotx=(Math.PI*2*i)/3;
		addWheelSpoke(obj,x,y,z,rotx);
	}
}

function addWheelSpoke(obj,x,y,z,rotx){
	'use strict';
	geometry = new THREE.CylinderGeometry(0.01,0.01,2,25);
	mesh = new THREE.Mesh(geometry, grey);
	mesh.position.set(x,y,z);
	mesh.rotation.x=rotx;
	obj.add(mesh);
}

function addWheelCenterCap(obj,x,y,z){
	'use strict';
	geometry = new THREE.CylinderGeometry(0.4,0.4,0.35,25);
	mesh = new THREE.Mesh(geometry, grey);
	mesh.position.set(x,y,z);
	mesh.rotation.z=Math.PI/2;
	obj.add(mesh);
}

function addWheelChairConection(obj,x,y,z){
	'use strict';
	geometry = new THREE.CylinderGeometry(0.8,0.8,2.2,25);
	mesh = new THREE.Mesh(geometry, grey);
	mesh.position.set(x,y,z);
	obj.add(mesh);
}
function createTire(obj,index,x,y,z){
	chair.userData.tires[index] = new THREE.Object3D();
	addWheel( chair.userData.tires[index], 0,0,0);
	addWheelSpokes( chair.userData.tires[index], 0,0,0);
	addWheelCenterCap( chair.userData.tires[index], 0,0,0);
	obj.add(chair.userData.tires[index]);
	chair.userData.tires[index].position.set(x,y,z);
}

function createWheel(obj,x,y,z,index){
	'use strict';

	chair.userData.wheels[index] = new THREE.Object3D();
	addWheelChairConection( chair.userData.wheels[index], 0,-1,0);
	createTire(chair.userData.wheels[index],index,0,-2,0.8);
	obj.add(chair.userData.wheels[index]);
	chair.userData.wheels[index].position.set(x,y,z);
}

function addChairUpperPole(obj,x,y,z){
	'use strict';
	geometry = new THREE.CylinderGeometry(0.7,0.7,4,25);
	mesh = new THREE.Mesh(geometry, grey);
	mesh.position.set(x,y,z);
	obj.add(mesh);
}

function addChairLowerPole(obj,x,y,z){
	'use strict';
	geometry = new THREE.CylinderGeometry(1.2,1.2,5,25);
	mesh = new THREE.Mesh(geometry, grey);
	mesh.position.set(x,y,z);
	obj.add(mesh);
}

function addChairLegs(obj,x,y,z){
	'use strict';
	var vector = new THREE.Vector3(0,-0.75,4.5);
	var axis = new THREE.Vector3(0,1,0);
	for(let i=0;i<5;i++) {//adiciona 5 pernas e 5 rodas
		vector.applyAxisAngle( axis , (Math.PI*2)/5 );
		addChairLeg(obj,x,y,z,vector);
		createWheel(obj,x+vector.x*2,y+vector.y*2,z+vector.z*2,i);//origem no fim das pernas
	}
}

function addChairLeg(obj,x,y,z,vector){
	'use strict';
	geometry = new THREE.CubeGeometry(2,0.5,9);
	mesh = new THREE.Mesh(geometry,grey);
	mesh.lookAt(vector);
	mesh.position.set(x+vector.x,y+vector.y,z+vector.z);
	obj.add(mesh);

}


function createChair(x,y,z){
	'use strict';

	chair = new THREE.Object3D();
	chair.userData.velocity= new THREE.Vector3(0,0,0);
	chair.userData.tires = new Array();
	chair.userData.wheels = new Array();

	addChairSeat(chair, 0, 0.5, 0);
	addChairBack(chair, 0,10.5,7);
	addChairUpperPole(chair,0,-2,0);
	addChairLowerPole(chair,0,-6.5,0);
	addChairLegs(chair,0,-6.5,0);

	scene.add(chair);
	chair.position.set(x,y,z);
}

function addTableLeg(obj, x, y, z,roty) {
    'use strict';

    geometry = new THREE.CylinderGeometry(7, 7, 18.5, 32, 1, false, 0,Math.PI);
    mesh = new THREE.Mesh(geometry, white);
    mesh.position.set(x, y, z);
    mesh.rotation.y=roty;
    obj.add(mesh);
}


function addTableTop(obj, x, y, z) {
    'use strict';
    geometry = new THREE.CubeGeometry(60, 2, 20);
    mesh = new THREE.Mesh(geometry, red);
    mesh.position.set(x, y, z);
    obj.add(mesh);
}

function createTable(x, y, z) {
    'use strict';

    var table = new THREE.Object3D();

    addTableTop(table, 0, 1, 0);
    addTableLeg(table, 20, -9.25, 0, 0);
    addTableLeg(table, -20, -9.25, 0, Math.PI);

    scene.add(table);
    table.position.set(x,y,z);
}

function createScene() {
    'use strict';

    scene = new THREE.Scene();


    scene.add(new THREE.AxisHelper(10));

    createTable(0, 7, 0);//origem debaixo da mesa
	createChair(0,0,8);//origem debaixo do assento
	createLamp(26,9,-6);//origem cima da mesa
}

function setCameraPosition(x, y, z){
	camera.position.set(x,y,z);
	camera.lookAt(scene.position);
}


function createCamera(x,y,z) {
    'use strict';
    //camera = new THREE.PerspectiveCamera(70,
                                         //window.innerWidth / window.innerHeight,
                                         //1,
                                         //1000);
    var frustumSize=100;
    var aspect = window.innerWidth / window.innerHeight;
    camera = new THREE.OrthographicCamera( frustumSize * aspect /- 2, frustumSize * aspect / 2, frustumSize / 2, frustumSize / -2, 1, 1000 );
    //PerspectiveCamera( fov : Number, aspect : Number, near : Number, far : Number );
    //camera = new THREE.OrthographicCamera(1000 , 1000, 1000, 1000,1,1000);
    setCameraPosition(x, y, z);
}




function render() {
    'use strict';
    renderer.render(scene, camera);
}

function onKeyDown(e) {
    'use strict';

    switch (e.keyCode) {
    case 65: //A
    case 97: //a
        /*scene.traverse(function (node) {
            if (node instanceof THREE.Mesh) {
                node.material.wireframe = !node.material.wireframe;
            }
        });*/
        brown.wireframe = !brown.wireframe;
        grey.wireframe = !grey.wireframe;
        white.wireframe = !white.wireframe;
		red.wirefram = !red.wireframe
        break;

	case 49://1
		setCameraPosition(0, 40, 0);
		break;
	case 50://2
		setCameraPosition(40, 0, 0);
		break;
	case 51://3
		setCameraPosition(0, 0, -40);
		break;
	case 39: //RIGHT
		movRight=1;
        break;
	case 37: //LEFT
		movLeft=1;
        break;
   	case 40: //DOWN
   		movDown=1;
		break;
	case 38: //UP
		movUp=1;
		break;
    }
}

function onKeyUp(e){
	'use strict';
    switch (e.keyCode){
        case 39://RIGHT
            movRight=0;
            break;
        case 37: //LEFT
            movLeft=0;
            break;
        case 40: //DOWN
			movDown=0;
			break;
		case 38: //UP
			movUp=0;
			break;
    }
}

function onResize() {
    'use strict';

    renderer.setSize(window.innerWidth, window.innerHeight);

    if (window.innerHeight > 0 && window.innerWidth > 0) {
    	//if (typeof (camera) == typeof (THREE.PerspectiveCamera) ) {
    	//	camera.aspect = window.innerWidth / window.innerHeight;

    	//}else if (typeof (camera) == typeof(THREE.OrthographicCamera) ) {
    		var aspect = window.innerWidth / window.innerHeight;
    		var frustumSize = 50;
    		camera.left = frustumSize * aspect /- 2;
    		camera.right = frustumSize * aspect / 2;
    		camera.top = frustumSize / 2;
    		camera.bottom = frustumSize / -2;
    		//}
    }
    camera.updateProjectionMatrix();
}


function calcVelocityAfterDrag(current,drag){
	'use strict';
    if(Math.abs(current)<Math.abs(drag))
    	return 0;
    else
    	return current+drag;
}

function moveHandler(){
	'use strict';
	var pos=new THREE.Vector3();
    var time = clock.getDelta();
    var normal;
    var lateralMov,verticalMov;
    //aceleracao
    lateralMov=movRight - movLeft;
    verticalMov=movDown -movUp;

    var aceleration= new THREE.Vector3(lateralMov*time*2,0,verticalMov*time*2);
    chair.userData.velocity.add(aceleration);
    //atrito
    aceleration.copy(chair.userData.velocity);
    aceleration.negate();
    aceleration.normalize();
    aceleration.multiplyScalar(time);
    chair.userData.velocity.x=calcVelocityAfterDrag(chair.userData.velocity.x,aceleration.x);
    chair.userData.velocity.z=calcVelocityAfterDrag(chair.userData.velocity.z,aceleration.z);
    //velocidade maxima
	//raiz quadrada da distancia a origem
	normal=Math.sqrt(chair.userData.velocity.distanceToSquared(new THREE.Vector3()));
    if(normal>1){
    	chair.userData.velocity.set(chair.userData.velocity.x/normal,0,chair.userData.velocity.z/normal);
    }
    //movimentar
    chair.translateOnAxis(chair.userData.velocity,1);
    //acompanhar com rodas
    for(let i =0;i<5;i++){
		if(chair.userData.velocity.x != 0 || chair.userData.velocity.z != 0){
			pos.addVectors(aceleration,chair.userData.wheels[i].position);
			chair.userData.wheels[i].lookAt(pos);
			chair.userData.tires[i].rotateOnAxis(new THREE.Vector3(-1,0,0),normal/1.3);
		}
	}
}

function animate(){
	'use strict';
	moveHandler();
	render();
	requestAnimationFrame(animate);
}

function init() {
    'use strict';
    movDown=0;
    movUp=0;
    movLeft=0;
    movRight=0;
    renderer = new THREE.WebGLRenderer({
        antialias: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
    createScene();
    createCamera(0,40,0);
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("resize", onResize);
	window.addEventListener("keyup", onKeyUp);

}
