import React, { useRef, useEffect } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { calcularLados, crearCoordenadas, crearMatriz } from "./funciones";
import { floorPowerOfTwo } from "three/src/math/MathUtils";

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

    let volumenCarga = 11;
    let volumenEstandar = 1;

    // crearMatriz(volumenCarga, volumenEstandar);

    let longitudLado = calcularLados(volumenCarga, volumenEstandar);
    const grid = new THREE.GridHelper(longitudLado, longitudLado, 0xffffff, 0x000000);
    scene.add(grid);

    let coordenadas = crearCoordenadas(volumenCarga, volumenEstandar);
    
    let coordenadasSpread = []
    coordenadas.forEach(fila => {
      coordenadasSpread.push(...fila)
    });
    // console.log(coordenadas);
    console.log(coordenadasSpread);

    

    function renderizarObjetos(volEntrada, volUnidad, coordenadas) {
        let ladoCaja = Math.cbrt(volUnidad);
        const geometriaCaja = new THREE.BoxGeometry(ladoCaja, ladoCaja, ladoCaja);
        let relacion = Math.ceil(volEntrada/volUnidad)
        for (let index = 0; index < relacion; index++) {
          const caja = new THREE.Mesh(geometriaCaja)
          caja.position.set(coordenadas[index][0], ladoCaja/2,coordenadas[index][1])
          scene.add(caja);
        }
    }

    renderizarObjetos(volumenCarga,volumenEstandar,coordenadasSpread);

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
