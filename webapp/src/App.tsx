import { BrowserRouter, Routes, Route } from "react-router-dom";

// Route Components
import { AdminIndex } from "./pages/admin/Index";

// Pages
import { Home } from "./pages/Home";
import { Web3Provider } from "./providers/Web3";
import { ReactQueryProvider } from "./providers/ReactQuery";

function App() {
  return (
    <ReactQueryProvider>
      <Web3Provider>
        <BrowserRouter>
          <Routes>
            <Route path="/">
              <Route index element={<Home />} />
              <Route path="admin">
                <Route index element={<AdminIndex />} />
              </Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </Web3Provider>
    </ReactQueryProvider>
  );
}

export default App;
