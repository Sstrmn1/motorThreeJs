import React from "react";
import { Button, Alert } from "@mui/material";
import "./App.css";
import Pallet from "./clases/pallet";

function App() {
  const pallet1 = new Pallet(155, 1200, 1200);

  const mostrarAlerta = () => {
    const mensaje = `El pallet 1 tiene: ${pallet1.altura / 10} cm de alto, ${pallet1.ancho / 10} cm de ancho y ${pallet1.profundidad / 10} cm de profundidad`;
    window.alert(mensaje);
  };

  return (
    <div className="App">
      <header className="App-header">
        <Button variant="contained" onClick={mostrarAlerta}>
          Mostrar Alerta
        </Button>
      </header>
    </div>
  );
}

export default App;
