import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Home from "./pages/Home";
import MyTicket from "./pages/MyTicket";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/myticket" element={<MyTicket />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;