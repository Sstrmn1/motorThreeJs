import React, { useRef, useEffect } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import {
  calcularLados,
  crearCoordenadas,
  crearMatriz,
  residuoFlotante,
} from "./funciones";
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

    /*   Agregar una rejilla como el piso
    Estos datos tienen que recibirse desde otro componente donde se define el volumen de carga y
    el volumen estandar */

    let volumenEntrada = 8.1;
    let volumenUnitario = 1;

    // crearMatriz(volumenEntrada, volumenUnitario);

    let longitudLado = calcularLados(volumenEntrada, volumenUnitario);
    const grid = new THREE.GridHelper(
      longitudLado,
      longitudLado,
      0xffffff,
      0x000000
    );
    scene.add(grid);

    let coordenadas = crearCoordenadas(volumenEntrada, volumenUnitario);

    let coordenadasSpread = [];
    coordenadas.forEach((fila) => {
      coordenadasSpread.push(...fila);
    });
    // console.log(coordenadas);
    // console.log(coordenadasSpread);
    let residuo = residuoFlotante(volumenEntrada, volumenUnitario);
    console.log(residuo);

    // Renderizar objetos
    let ladoCaja = Math.cbrt(volumenUnitario);
    let ladoCajaResiduo = Math.cbrt(residuo);
    const geometriaPallet = new THREE.BoxGeometry(1.2, 0.155, 1.2);
    const geometriaCaja = new THREE.BoxGeometry(ladoCaja, ladoCaja, ladoCaja);
    const geometriaCajaResiduo = new THREE.BoxGeometry(
      ladoCajaResiduo,
      ladoCajaResiduo,
      ladoCajaResiduo
    );
    let posicionYCaja = ladoCaja / 2 + 0.155;
    let posicionYCajaResiduo = ladoCajaResiduo / 2 + 0.155;
    let relacion = Math.ceil(volumenEntrada / volumenUnitario);

    for (let index = 0; index < relacion; index++) {
      if (index === relacion - 1) {
        let cajaUltima = {};
        if (residuo === 0) {
          cajaUltima = new THREE.Mesh(geometriaCaja);
          posicionYCajaResiduo = posicionYCaja;
        } else {
          cajaUltima = new THREE.Mesh(geometriaCajaResiduo);
        }
        cajaUltima.position.set(
          coordenadasSpread[index][0],
          posicionYCajaResiduo,
          coordenadasSpread[index][1]
        );
        scene.add(cajaUltima);
      } else {
        const caja = new THREE.Mesh(geometriaCaja);

        caja.position.set(
          coordenadasSpread[index][0],
          posicionYCaja,
          coordenadasSpread[index][1]
        );
        scene.add(caja);
      }

      const pallet = new THREE.Mesh(geometriaPallet);

      pallet.position.set(
        coordenadasSpread[index][0],
        0.155 / 2,
        coordenadasSpread[index][1]
      );

      scene.add(pallet);
    }

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
