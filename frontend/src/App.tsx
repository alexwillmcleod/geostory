import { Navigate, Route } from "react-router";
import CreatePage from "./pages/CreatePage";
import { BrowserRouter, Routes } from "react-router-dom";
import Page from "./pages/Page";
import ListenPage from "./pages/ListenPage";
import LandingPage from "./pages/LandingPage";
import HomePage from "./pages/LoginPage";
import LoginPage from "./components/LoginComp";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/landing" />} />
        <Route index path="login" element={<LoginPage />}></Route>
        <Route path="/" element={<Page />}>
          <Route path="create" element={<CreatePage />} />
          <Route path="listen/:id" element={<ListenPage />} />
          <Route index path="landing" element={<LandingPage />}></Route>
          <Route index path="homepage" element={<HomePage />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
