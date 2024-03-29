import './style.css'
import * as THREE from 'three'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75,window.innerWidth / window.innerHeight, 0.1,1000);

const renderer = new THREE.WebGL1Renderer({
  canvas: document.querySelector('#bg'),
})

renderer.setPixelRatio(window.devicePixelRatio)
renderer.setSize(window.innerWidth, window.innerHeight)
camera.position.setZ(30)

renderer.render(scene,camera)

const geometry = new THREE.TorusGeometry(10,3,16,100)
const material = new THREE.MeshStandardMaterial({color: 0xFF6347})
const torus = new THREE.Mesh(geometry, material);
scene.add(torus)

const ambientlight = new THREE.AmbientLight(0xffffff)

const pointlight = new THREE.PointLight(0xffffff)
pointlight.position.set(5,5,5)
scene.add(pointlight, ambientlight)

// const lighthelper = new THREE.PointLightHelper(pointlight)
// const gridhelper = new THREE.GridHelper(200,50);
// scene.add(lighthelper, gridhelper)

const controls = new OrbitControls(camera, renderer.domElement)

let star;

function addStar(){
  const starTexture = new THREE.TextureLoader().load('star-texture.jpeg')
  const geometry = new THREE.SphereGeometry(0.25,24,24);
  const material = new THREE.MeshBasicMaterial({map: starTexture})

  star = new THREE.Mesh(geometry, material);

  const [x,y,z] = Array(3).fill().map(()=> THREE.MathUtils.randFloatSpread(100))
  star.position.set(x,y,z)
  scene.add(star)
}

Array(150).fill().forEach(addStar)

const spaceTexture = new THREE.TextureLoader().load('newbackground.jpg')
scene.background = spaceTexture;

const myTexture = new THREE.TextureLoader().load('myimg.jpg')

const myself = new THREE.Mesh(
  new THREE.BoxGeometry(3,3,3),
  new THREE.MeshBasicMaterial({map: myTexture})
)

scene.add(myself)

const moonTexture = new THREE.TextureLoader().load('moon.jpg')
const normalTexture = new THREE.TextureLoader().load('normal.jpg')

const moon = new THREE.Mesh(
  new THREE.SphereGeometry(3,32,32),
  new THREE.MeshStandardMaterial({ normalMapmap: normalTexture, map: moonTexture })

)

moon.position.z=30
moon.position.setX(-10)

scene.add(moon)

function moveCamera(){
  const t = document.body.getBoundingClientRect().top
  moon.rotation.x +=0.05
  moon.rotation.y +=0.075
  moon.rotation.z +=0.05

  myself.rotation.y += 0.01
  myself.rotation.z += 0.01
  //top value returns -ve value
  camera.position.z = t * -0.01;
  camera.position.x = t * -0.0002;
  camera.position.y = t * -0.0002;
  

}

document.body.onscroll = moveCamera




function animate(){
    requestAnimationFrame(animate);
    torus.rotation.x +=0.01;
    torus.rotation.y +=0.005;
    torus.rotation.z +=0.01;

    star.rotation.x +=0.01;
    star.rotation.y +=0.005;
    star.rotation.z +=0.01;

    controls.update()

    renderer.render(scene, camera);
}

animate();

