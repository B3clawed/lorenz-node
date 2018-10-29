var THREE = require('three');
const OrbitControls = require('three-orbitcontrols')

var scene, renderer, camera, controls, cube, line;
var r = .3;
var increasing = true;
var a = 10,
    b = 28,
    c = 8/3,
    dt = 0,
    x = 0.1,
    y = 0,
    z = 0;
var points = [];
        
init();

function init () {
    renderer = new THREE.WebGLRenderer({antialias: true});
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );
    
    camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 500 );
    camera.position.set( 0, 0, 100 );
    camera.lookAt( 0, 0, 0 );

    controls = new OrbitControls(camera, renderer.domElement)
    controls.enableDamping = true
    controls.dampingFactor = 0.25
    controls.enableZoom = false
    
    scene = new THREE.Scene();

    window.addEventListener( 'resize', function () {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize( window.innerWidth, window.innerHeight );
    }, false );

    var material = new THREE.LineBasicMaterial( { color: 0x0000ff} );
    var geometry = new THREE.Geometry();

    geometry.vertices.push(new THREE.Vector3( 0,0,0) );
    geometry.vertices.push(new THREE.Vector3( 0,0,0) );

    line = new THREE.Line(geometry, material);
    scene.add( line );


    animate();
}

function animate () {
    dt+= 0.000005;
    requestAnimationFrame( animate );
    //controls.update();
    controls.update();
    updateLines();
    renderer.render( scene, camera );
   // line.rotation.y += 0.005;
    //line.rotation.x += 0.001;
    //cube.rotation.x += 0.01;
}

function updateLines(){
    //clearScene();

    var dx = (a * (y-x))*dt;
    var dy = (x*(b-z)-y)*dt;
    var dz = (x*y - c*z)*dt;

    x += dx;
    y += dy;
    z += dz;

    points.push({x,y,z});

    if(r>=1)
        increasing = false;
    else if(r<=.3)
        increasing = true;

    if(increasing)
        r+=0.001;
    else
        r-=0.001
    var lineColor = new THREE.Color(r,0,0);
    var material = new THREE.LineBasicMaterial( { color: lineColor } );
    var geometry = new THREE.Geometry();
    for(var i=points.length-1; i>=points.length-2; i--){
        var pt = points[i];
        geometry.vertices.push(new THREE.Vector3( pt.x, pt.y, pt.z) );
    }
    var newline = new THREE.Line( geometry, material );
    newline.scale.set(.7, .7, .7);
    line.add(newline);
}

function clearScene(){
    while(scene.children.length > 0){ 
        scene.remove(scene.children[0]); 
    }
}

function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(r, g, b) {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}


