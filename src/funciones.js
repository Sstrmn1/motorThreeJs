/* Recibe un numero
Si no es decimal retorna el mismo numero
Si es decimal fija los decimales a 5 y los multiplica a por potencia 10^5 */
export function volumenAPot5(volumen) {
  if (Math.floor(volumen) === volumen) {
    return volumen;
  } else {
    return volumen.toFixed(5) * Math.pow(10, 5);
  }
}

export function residuoFlotante(dividendo, divisor) {  
  dividendo = dividendo.toFixed(5) * Math.pow(10, 5);
  divisor = divisor.toFixed(5) * Math.pow(10, 5);
  let residuo = dividendo % divisor;
  residuo = residuo / Math.pow(10,5);
  return residuo
}

// Crea una matriz a partir de una relacion entre dos numeros, solo por prueba.
export function crearMatriz(dividendo, divisor) {
  let relacion = dividendo / divisor;
  let lado = Math.ceil(Math.sqrt(relacion));
  let matriz = [];
  let fila = [];
  let contador = 0;
  for (let i = 0; i < lado; i++) {
    for (let j = 0; j < lado; j++) {
      contador++;
      fila.push(contador);
    }
    matriz.push(fila);
    fila = [];
  }
  console.log(matriz);
}

export function calcularLados(dividendo, divisor) {
  let relacion = dividendo / divisor;
  let lado = Math.ceil(Math.sqrt(relacion));
  // return lado * 1;
  return lado * 2;
  // Este es el retorno adecuado, puesto que el pallet debe ser ubicado en el origen de 4 cuadriculas
}

/* 
Funcion que crea y retorna un mapa de coordenadas a partir de una 
relacion entre volumen total y volumen unitario.
Los puntos de las coordenadas representan la ubicacion central de un
area conformada por 4 cuadros. 
Por lo tanto, para albergar como minimo una coordenada, se requiere
un area de 2 cuadros por lado (2x2) Para 4 coordenadas, 4x4 y asi
sucesivamente
*/
export function crearCoordenadas(volumenTotal, volumenUnitario) {
  let coordenadas = [];
  let fila = [];
  let relacion = volumenTotal / volumenUnitario;
  let lado = Math.ceil(Math.sqrt(relacion));
  let cuadrosPorLado = lado * 2;
  let xInicial = cuadrosPorLado - 1 - lado;
  let puntoInicial = [xInicial, xInicial];

  for (let i = 0; i < lado; i++) {
    for (let j = 0; j < lado; j++) {
      fila.push(puntoInicial.slice());
      puntoInicial[0] = puntoInicial[0] - cuadrosPorLado / lado;
    }
    coordenadas.push(fila);
    puntoInicial[0] = xInicial;
    puntoInicial[1] = puntoInicial[1] - cuadrosPorLado / lado;
    fila = [];
  }
  return coordenadas;
}
