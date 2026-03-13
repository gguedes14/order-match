import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { Login } from "./pages/login/login";
import { Order } from "./pages/order/order";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/order" element={<Order />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
