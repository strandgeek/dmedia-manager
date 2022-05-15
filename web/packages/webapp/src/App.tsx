import "animate.css";
import "react-toastify/dist/ReactToastify.css";
import { HashRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";

// Route Components
import { AdminIndex } from "./pages/admin/Index";
import { AdminMedias } from "./pages/admin/Medias";
import { AdminSettings } from "./pages/admin/Settings";

// Pages
import { Home } from "./pages/Home";
import { Web3Provider } from "./providers/Web3";
import { ReactQueryProvider } from "./providers/ReactQuery";
import { CreateProject } from "./pages/admin/CreateProject";
import { ProjectContext } from "./hooks/useProject";
import { useState } from "react";
import { Project } from "./types/project";

function App() {
  const [project, setProject] = useState<Project | null>(null);
  return (
    <ProjectContext.Provider value={{ project, setProject }}>
      <ReactQueryProvider>
        <ToastContainer />
        <HashRouter>
          <Web3Provider>
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
          </Web3Provider>
        </HashRouter>
      </ReactQueryProvider>
    </ProjectContext.Provider>
  );
}

export default App;
