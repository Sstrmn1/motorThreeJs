import React, { useRef, useEffect } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

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

    // Crear pallet
    const palletGeometry = new THREE.BoxGeometry(1.2, 0.155, 1.2);
    const palletTextureLoader = new THREE.TextureLoader();
    const palletTexture1 = palletTextureLoader.load("/textures/3.png");
    const palletTexture2 = palletTextureLoader.load("/textures/2.png");
    const palletTexture3 = palletTextureLoader.load("/textures/1.png");

    const palletMaterials = [
      new THREE.MeshBasicMaterial({ map: palletTexture2 }), // Lado izquierdo/derecho
      new THREE.MeshBasicMaterial({ map: palletTexture2 }), // Lado izquierdo/derecho
      new THREE.MeshBasicMaterial({ map: palletTexture3 }), // Frente/trasero
      new THREE.MeshBasicMaterial({ map: palletTexture3 }), // Frente/trasero
      new THREE.MeshBasicMaterial({ map: palletTexture1 }), // Tapa
      new THREE.MeshBasicMaterial({ map: palletTexture1 })  // Tapa
    ];

    const pallet = new THREE.Mesh(palletGeometry, palletMaterials);
    scene.add(pallet);

    // Crear caja
    const boxGeometry = new THREE.BoxGeometry(0.3, 0.4, 0.2);
    
    // Cargar la textura del cartón
    const textureLoader = new THREE.TextureLoader();
    const cartonTexture = textureLoader.load("/textures/carton.jpg");
    
    const boxMaterials = [
      new THREE.MeshBasicMaterial({ map: cartonTexture }), // Lado izquierdo
      new THREE.MeshBasicMaterial({ map: cartonTexture }), // Lado derecho
      new THREE.MeshBasicMaterial({ map: cartonTexture }), // Frente
      new THREE.MeshBasicMaterial({ map: cartonTexture }), // Trasero
      new THREE.MeshBasicMaterial({ map: cartonTexture }), // Arriba
      new THREE.MeshBasicMaterial({ map: cartonTexture })  // Abajo
    ];
    
    const box = new THREE.Mesh(boxGeometry, boxMaterials);
    box.position.set(0, 0.155 + 0.2 / 2, 0); // Ubicar encima del pallet
    scene.add(box);

    // Agregar una rejilla como el piso
    const grid = new THREE.GridHelper(10, 10, 0xffffff, 0x000000);
    grid.position.y = -0.1;
    scene.add(grid);

    camera.position.z = 5;

    // Add OrbitControls to enable camera rotation
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableZoom = true; // Enable zooming
    controls.enablePan = false; // Disable panning
    controls.update();

    // Animation loop
    function animate() {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    }

    animate();
  }, []);

  return <div ref={sceneRef}></div>;
}

export default ThreeScene;
