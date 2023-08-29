import React from "react";
import { Button } from "@mui/material";
import "./App.css";
// import ThreeScene from "./ThreeScene";
import { crearRejilla } from "./funciones";
import ThreeScene2 from "./ThreeScene2";

// let dividendo = window.prompt("Ingrese el dividendo")
// let divisor = window.prompt("ingrese el divisor")
// crearRejilla(dividendo,divisor)

function App() {
  return (
    <div className="App">

      {/* <ThreeScene /> Agrega el componente ThreeScene aquí */}
      <ThreeScene2/>

    </div>
  );
}

export default App;
