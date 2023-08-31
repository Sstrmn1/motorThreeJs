import React, { useRef, useEffect } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { calcularLados, crearCoordenadas, residuoFlotante } from "./funciones";

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

    // Iluminacion
    // Agregar iluminación ambiental
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    ambientLight.position.set(4, 3, 3);
    scene.add(ambientLight);

    // Agregar iluminación direccional 1
    const directionalLight1 = new THREE.DirectionalLight(0xffffff, 3);
    directionalLight1.position.set(5, 4, 0.1);
    scene.add(directionalLight1);

    // Agregar iluminación direccional 2
    const directionalLight2 = new THREE.DirectionalLight(0xffffff, 2);
    directionalLight2.position.set(1, 4, 5);
    scene.add(directionalLight2);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableZoom = true; // Enable zooming
    controls.enablePan = true;
    controls.update();

    /*   Agregar una rejilla como el piso
    Estos datos tienen que recibirse desde otro componente donde se define el volumen de carga y
    el volumen estandar */

    let volumenEntrada = 5.125;
    let volumenUnitario = 1;

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

    // Cargar objetos

    let ladoCaja = Math.cbrt(volumenUnitario);
    let ladoCajaResiduo = Math.cbrt(residuo);
    console.log(`El lado de la caja residuo es: ${ladoCajaResiduo}`);
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

    // Cargar texturas
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

    // Renderizar objetos, puesta en escena

    for (let index = 0; index < relacion; index++) {
      if (index === relacion - 1) {
        let cajaUltima = {};
        if (residuo === 0) {
          cajaUltima = new THREE.Mesh(geometriaCaja, boxMaterials);
          posicionYCajaResiduo = posicionYCaja;
        } else {
          cajaUltima = new THREE.Mesh(geometriaCajaResiduo, boxMaterials);
        }
        cajaUltima.position.set(
          coordenadasSpread[index][0],
          posicionYCajaResiduo,
          coordenadasSpread[index][1]
        );
        scene.add(cajaUltima);
      } else {
        let caja = {};
        if (volumenEntrada < volumenUnitario) {
          caja = new THREE.Mesh(geometriaCajaResiduo, boxMaterials);
        } else {
          caja = new THREE.Mesh(geometriaCaja, boxMaterials);
        }

        caja.position.set(
          coordenadasSpread[index][0],
          posicionYCaja,
          coordenadasSpread[index][1]
        );
        scene.add(caja);
      }

      let pallet = new THREE.Mesh(geometriaPallet, palletMaterials);

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
