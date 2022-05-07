import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AdminIndex } from "./pages/admin/Index";

import Home from "./pages/Home";

function App() {
  return (
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
  );
}

export default App;
