import { BrowserRouter, Route, Routes } from "react-router-dom";
import { PATH } from "./consts";
import { Dashboard, InvalidPage } from "./pages";

function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path={PATH.DASHBOARD} element={<Dashboard />} />
          <Route path={PATH.INVALID_PATH} element={<InvalidPage />} />
        </Routes>
      </BrowserRouter>
  );
}

export default App;
