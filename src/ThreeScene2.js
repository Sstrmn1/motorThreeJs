import React, { useRef, useEffect } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { calcularLados, crearCoordenadas, crearMatriz } from "./funciones";

function ThreeScene2() {
  const sceneRef = useRef(null);

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x888888);
    sceneRef.current.appendChild(renderer.domElement);
    camera.position.set(1, 2, 3);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableZoom = true; // Enable zooming
    controls.enablePan = true;
    controls.update();

    // Agregar una rejilla como el piso
    // Estos datos tienen que recibirse desde otro componente donde se define el volumen de carga y
    // el volumen estandar
    // let volumenCarga = window.prompt("volumen de carga...");
    // let volumenEstandar = window.prompt("volumen estandar");

    let volumenCarga = 20;
    let volumenEstandar = 2;

    crearCoordenadas(volumenCarga, volumenEstandar);
    // crearMatriz(volumenCarga, volumenEstandar);

    let lado = calcularLados(volumenCarga, volumenEstandar);
    const grid = new THREE.GridHelper(lado, lado, 0xffffff, 0x000000);
    scene.add(grid);

    function renderizarCajas(volEntrada, volUnidad) {}

    // Animation loop
    function animate() {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    }

    animate();
  }, []);
  return <div ref={sceneRef}></div>;
}

export default ThreeScene2;
