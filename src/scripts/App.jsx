import React from "react";
import ReactDOM from 'react-dom/client'
import {Inventaire} from "./component/Inventaire.jsx"

export function App() {
  return (
    <>
     <Inventaire />
    </>
  );
}

ReactDOM.createRoot(document.getElementById('game-ui')).render(<App />)