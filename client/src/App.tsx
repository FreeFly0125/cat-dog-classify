import { BrowserRouter, Route, Routes } from "react-router-dom";
import { PATH } from "./consts";
import { Dashboard, InvalidPage } from "./pages";
import { MainProvider } from "./context";

function App() {
  return (
    <MainProvider>
      <BrowserRouter>
        <Routes>
          <Route path={PATH.DASHBOARD} element={<Dashboard />} />
          <Route path={PATH.INVALID_PATH} element={<InvalidPage />} />
        </Routes>
      </BrowserRouter>
    </MainProvider>
  );
}

export default App;
