import { SignUp } from "../src/Pages/SignUp";
import { SignIn } from "../src/Pages/SignIn";
import { Dashboard } from "../src/Pages/Dashboard";
import { SendMoney } from "../src/Pages/SendMoney";
import { PaymentSuccess } from "../src/Pages/PaymentSuccess";

import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/send" element={<SendMoney />} />
        <Route path="/payment-success" element={<PaymentSuccess />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
