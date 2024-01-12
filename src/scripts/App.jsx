
import ReactDOM from 'react-dom/client'
import {Inventaire} from "./component/Inventaire.jsx"
import {Menu} from "./component/Menu.jsx"

export function App() {
  return (
    <>
  
     {/* <Inventaire /> */}
    </>
  );
}


ReactDOM.createRoot(document.getElementById('game-ui')).render(<App />)
ReactDOM.createRoot(document.getElementById('mainMenu')).render(<Menu />)