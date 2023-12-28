import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ListBussiness from "./views/listBussiness";
import CreateBusinessPanel from "./views/createBussiness";

import LayoutPrincipal from "../src/layout/layout";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <LayoutPrincipal>
          <Routes>
            <Route path="/negocios" element={<ListBussiness />} />
            <Route path="/negocios/crear" element={<CreateBusinessPanel />} />
          </Routes>
        </LayoutPrincipal>
      </div>
    </BrowserRouter>
  );
}

export default App;
