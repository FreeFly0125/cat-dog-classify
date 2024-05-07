import { BrowserRouter, Route, Routes } from "react-router-dom";
import { PATH } from "./consts";
import { Dashboard, InvalidPage } from "./pages";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path={PATH.DASHBOARD} element={<Dashboard />} />
          <Route path={PATH.INVALID_PATH} element={<InvalidPage />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer
        position="top-right"
        autoClose={1500}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </>
  );
}

export default App;
