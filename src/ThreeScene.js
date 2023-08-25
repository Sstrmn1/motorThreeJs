import React, { useRef, useEffect } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

// Elementos para funcion de prueba empiezan aqui
const coordenadas = [
  [4, 0, 4],
  [2, 0, 4],
  [0, 0, 4],
  [-2, 0, 4],
  [-4, 0, 4],
  [4, 0, 2],
  [2, 0, 2],
  [0, 0, 2],
  [-2, 0, 2],
  [-4, 0, 2],
  [4, 0, 0],
  [2, 0, 0],
  [0, 0, 0],
  [-2, 0, 0],
  [-4, 0, 0],
  [4, 0, -2],
  [2, 0, -2],
  [0, 0, -2],
  [-2, 0, -2],
  [-4, 0, -2],
  [4, 0, -4],
  [2, 0, -4],
  [0, 0, -4],
  [-2, 0, -4],
  [-4, 0, -4],
];

const volumenEstandar = 1.7;
const volumenRecibido = 15.3;
const volumenRatio = Math.ceil(volumenRecibido / volumenEstandar);
const volumenResiduo = parseFloat((volumenRecibido % volumenEstandar).toFixed(5));
for (let index = 0; index <= volumenRatio; index++) {
  if (index === volumenRatio) {
    if (volumenResiduo === 0.00000) {
      console.log(`El volumen de la ultima caja es 1.7`);
    } else {
      console.log(`El volumen de la ultima caja ${volumenResiduo}`);
    }
    console.log("esta es la ultima fila");
  }

  console.log(`Paleta ubicada en la coordenada: ${coordenadas[index]}`);
}

// aqui termina funcion de prueba

function ThreeScene() {
  const sceneRef = useRef(null);

  useEffect(() => {
    // Set up the scene, camera, and renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);

    // Set the background color to gray (0x888888)
    renderer.setClearColor(0x888888);

    sceneRef.current.appendChild(renderer.domElement);

    // Agregar iluminación ambiental
    const ambientLight = new THREE.AmbientLight(0xffffff, 1);
    scene.add(ambientLight);

    // Agregar iluminación direccional 1
    const directionalLight1 = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight1.position.set(1, 0.2, 0.1);
    scene.add(directionalLight1);

    // Agregar iluminación direccional 2
    const directionalLight2 = new THREE.DirectionalLight(0xffffff, 0.5);
    directionalLight2.position.set(3, 0.5, 1);
    scene.add(directionalLight2);

    // Crear pallet
    const palletGeometry = new THREE.BoxGeometry(1.2, 0.155, 1.2);
    const palletTextureLoader = new THREE.TextureLoader();
    const palletTextureLado = palletTextureLoader.load("/textures/3.png");
    const palletTextureFrente = palletTextureLoader.load("/textures/2.png");
    const palletTextureTapa = palletTextureLoader.load("/textures/1.png");

    const palletMaterials = [
      new THREE.MeshStandardMaterial({ map: palletTextureFrente }),
      new THREE.MeshStandardMaterial({ map: palletTextureFrente }),
      new THREE.MeshStandardMaterial({ map: palletTextureTapa }),
      new THREE.MeshStandardMaterial({ map: palletTextureTapa }),
      new THREE.MeshStandardMaterial({ map: palletTextureLado }),
      new THREE.MeshStandardMaterial({ map: palletTextureLado }),
    ];

    const pallet = new THREE.Mesh(palletGeometry, palletMaterials);
    pallet.position.set(4, 0, 4);
    scene.add(pallet);

    // Crear caja
    const boxGeometry = new THREE.BoxGeometry(0.3, 0.4, 0.2);

    // Cargar la textura del cartón
    const textureLoader = new THREE.TextureLoader();
    const cartonTexture = textureLoader.load("/textures/carton.jpg");

    const boxMaterials = [
      new THREE.MeshStandardMaterial({ map: cartonTexture }), // Lado izquierdo
      new THREE.MeshStandardMaterial({ map: cartonTexture }), // Lado derecho
      new THREE.MeshStandardMaterial({ map: cartonTexture }), // Frente
      new THREE.MeshStandardMaterial({ map: cartonTexture }), // Trasero
      new THREE.MeshStandardMaterial({ map: cartonTexture }), // Arriba
      new THREE.MeshStandardMaterial({ map: cartonTexture }), // Abajo
    ];

    const box = new THREE.Mesh(boxGeometry, boxMaterials);
    box.position.set(4, 0.155 + 0.2 / 2, 4); // Ubicar encima del pallet
    scene.add(box);

    // Agregar una rejilla como el piso
    const grid = new THREE.GridHelper(10, 10, 0xffffff, 0x000000);
    grid.position.y = -0.1;
    scene.add(grid);

    // camera.position.z = 5;
    camera.position.set(5.5, 1, 5);

    // Add OrbitControls to enable camera rotation
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableZoom = true; // Enable zooming
    controls.enablePan = true;
    controls.update();
    // Establecer el punto de enfoque (target) para el OrbitControls
    controls.target.set(4, 0, 4);

    // Animation loop
    function animate() {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    }

    camera.lookAt(new THREE.Vector3(4, 0, 4));

    animate();
  }, []);
  console.log(`${coordenadas[0][2]}`);
  return <div ref={sceneRef}></div>;
}

export default ThreeScene;
