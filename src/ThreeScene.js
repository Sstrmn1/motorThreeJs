import React, { useRef, useEffect } from "react";
import * as THREE from "three";

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

    // Create a cube
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    // Add a grid as the floor
    const grid = new THREE.GridHelper(10, 10, 0xffffff, 0x000000);
    grid.position.y = -0.5; // Position the grid slightly below the cube
    scene.add(grid);

    camera.position.z = 5;

    // Animation loop
    function animate() {
      requestAnimationFrame(animate);

      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;

      renderer.render(scene, camera);
    }

    animate();
  }, []);

  return <div ref={sceneRef}></div>;
}

export default ThreeScene;
