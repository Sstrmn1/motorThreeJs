// Recibe un numero
// Si no es decimal retorna el mismo numero
// Si es decimal fija los decimales a 5 y los multiplica a por potencia 10^5
export function volumenAPot5(volumen) {
  if (Math.floor(volumen) === volumen) {
    return volumen;
  } else {
    return volumen.toFixed(5) * Math.pow(10, 5);
  }
}

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

export function crearCoordenadas(volumenTotal, volumenUnitario) {
  let coordenadas = [];
  let punto = [0, 0];
  let fila = [];
  let relacion = volumenTotal / volumenUnitario;
  let lado = Math.ceil(Math.sqrt(relacion));
  let cuadros = lado*2;
  let puntoInicial = [(cuadros-1)-lado, (cuadros-1)-lado]

  for (let i = 0; i < lado; i++) {
    punto[0] = i * 2;
    for (let j = 0; j < lado; j++) {
      punto[1] = j * 2;
      fila.push(punto);
    }
    coordenadas.push(fila);
    fila = [];
  }
  console.log(coordenadas);
}
