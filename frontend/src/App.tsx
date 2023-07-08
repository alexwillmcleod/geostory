import { Route } from "react-router";
import CreatePage from "./pages/CreatePage";
import { BrowserRouter, Routes } from "react-router-dom";
import Page from "./pages/Page";
import ListenPage from "./pages/ListenPage";
import LandingPage from "./pages/LandingPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Page />}>
          <Route path="create" element={<CreatePage />} />
          <Route path="listen/:id" element={<ListenPage />} />
          <Route path="landing" element={<LandingPage/>}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
