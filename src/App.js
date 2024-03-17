import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Orders from './pages/Orders';
import Scanning from './pages/Scanning';

export default function App() {
  return (
      <Layout>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/scanning" element={<Scanning />} />
          </Routes>
        </BrowserRouter>
      </Layout>
  );
}
