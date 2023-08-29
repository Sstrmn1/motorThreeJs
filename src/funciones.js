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
    fila = []
  }
  console.log(matriz);
}
