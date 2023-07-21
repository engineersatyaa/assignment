import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Profile from "./pages/Profile";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Home />} />
        <Route path="/profile/:userId" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
