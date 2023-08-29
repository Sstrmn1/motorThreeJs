// Recibe un numero
// Si no es decimal retorna el mismo numero
// Si es decimal fija los decimales a 5 y los multiplica a por potencia 10^5
export function volumenAPot5(volumen) {
  if (Math.floor(volumen) === volumen) {
    return volumen
  } else {
    
    return volumen.toFixed(5)*Math.pow(10,5)
  }
}