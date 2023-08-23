class Pallet {
  constructor(altura, ancho, profundidad) {
    this._altura = altura;
    this._ancho = ancho;
    this._profundidad = profundidad;
  }

  // Métodos getter
  get altura() {
    return this._altura;
  }

  get profundidad() {
    return this._profundidad;
  }

  get ancho() {
    return this._ancho;
  }

  // Métodos setter
  set altura(nuevaAltura) {
    this._altura = nuevaAltura;
  }

  set profundidad(nuevaProfundidad) {
    this._profundidad = nuevaProfundidad;
  }

  set ancho(nuevoAncho) {
    this._ancho = nuevoAncho;
  }
}

export default Pallet;
