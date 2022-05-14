import 'animate.css';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from 'react-toastify';

// Route Components
import { AdminIndex } from "./pages/admin/Index";
import { AdminMedias } from "./pages/admin/Medias";
import { AdminSettings } from "./pages/admin/Settings";

// Pages
import { Home } from "./pages/Home";
import { Web3Provider } from "./providers/Web3";
import { ReactQueryProvider } from "./providers/ReactQuery";

function App() {
  return (
    <ReactQueryProvider>
      <ToastContainer />
      <Web3Provider>
        <BrowserRouter>
          <Routes>
            <Route path="/">
              <Route index element={<Home />} />
              <Route path="admin">
                <Route index element={<AdminIndex />} />
                <Route path="medias" element={<AdminMedias />} />
                <Route path="settings" element={<AdminSettings />} />
              </Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </Web3Provider>
    </ReactQueryProvider>
  );
}

export default App;
