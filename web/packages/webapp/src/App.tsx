import 'animate.css';
import 'react-toastify/dist/ReactToastify.css';
import { HashRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from 'react-toastify';

// Route Components
import { AdminIndex } from "./pages/admin/Index";
import { AdminMedias } from "./pages/admin/Medias";
import { AdminSettings } from "./pages/admin/Settings";

// Pages
import { Home } from "./pages/Home";
import { Web3Provider } from "./providers/Web3";
import { ReactQueryProvider } from "./providers/ReactQuery";
import { CreateProject } from './pages/admin/CreateProject';

function App() {
  return (
    <ReactQueryProvider>
      <ToastContainer />
      <Web3Provider>
        <HashRouter>
          <Routes>
            <Route path="/">
              <Route index element={<Home />} />
              <Route path="admin">
                <Route index element={<AdminIndex />} />
                <Route path="medias" element={<AdminMedias />} />
                <Route path="settings" element={<AdminSettings />} />
                <Route path="create-project" element={<CreateProject />} />
              </Route>
            </Route>
          </Routes>
        </HashRouter>
      </Web3Provider>
    </ReactQueryProvider>
  );
}

export default App;
