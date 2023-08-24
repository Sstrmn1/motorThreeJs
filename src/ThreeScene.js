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
    const geometry = new THREE.BoxGeometry(1.2, 0.155, 1.2);

    // Cargar las texturas
    const textureLoader = new THREE.TextureLoader();
    const texture1 = textureLoader.load("texturas/pallet/1.png");
    const texture2 = textureLoader.load("texturas/pallet/2.png");
    const texture3 = textureLoader.load("texturas/pallet/3.png");

    const materials = [
      new THREE.MeshBasicMaterial({ map: texture2 }), // Lado izquierdo/derecho
      new THREE.MeshBasicMaterial({ map: texture2 }), // Lado izquierdo/derecho
      new THREE.MeshBasicMaterial({ map: texture3 }), // Frente/trasero
      new THREE.MeshBasicMaterial({ map: texture3 }), // Frente/trasero
      new THREE.MeshBasicMaterial({ map: texture1 }), // Tapa
      new THREE.MeshBasicMaterial({ map: texture1 })  // Tapa
    ];

    const cube = new THREE.Mesh(geometry, materials);
    scene.add(cube);

    // Add a grid as the floor
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

      // No rotation applied to the cube

      renderer.render(scene, camera);
    }

    animate();
  }, []);

  return <div ref={sceneRef}></div>;
}

export default ThreeScene;
