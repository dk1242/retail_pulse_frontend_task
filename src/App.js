import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import ContestPage from "./components/ContestPage";
import Home from "./components/Home";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contest/:id" element={<ContestPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
