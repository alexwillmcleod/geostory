import { Route } from "react-router";
import CreatePage from "./pages/CreatePage";
import { BrowserRouter, Routes } from "react-router-dom";
import Page from "./pages/Page";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Page />}>
          <Route path="create" element={<CreatePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
