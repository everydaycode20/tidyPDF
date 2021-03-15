import React, {useState} from "react";
import Header from "./comp/header";
import DragAndDrop from "./comp/drag-and-drop-box";
import "./styles/app.scss";
import Canvas from "./comp/canvas";
import {Context} from "./comp/context";
import Main from "./comp/main";

function App() {

  const [files, setFiles] = useState([]);

  const [name, setName] = useState("");

  const [btnVisibility, setBtnVisibility] = useState(false);

  return (
      <>
        <main className="main-container">
            <Context.Provider value={{files, setFiles}}>
              <Header name={name} btnVisibility={btnVisibility}/>
              <DragAndDrop setName={setName} setBtnVisibility={setBtnVisibility}/>
              <Canvas/>
            </Context.Provider>
        </main>
      </>
  );
}

export default App;
