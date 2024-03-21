import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Orders from './pages/Orders';
import Scanning from './pages/Scanning';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import { urlReactHome, urlReactOrders, urlReactScanning, urlReactSignUp, urlReactSignIn } from './endpoints';

export default function App() {
  return (
    <Router>
      <Layout>
          <Routes>
            <Route path={urlReactHome} element={<Home />} />
            <Route path={urlReactOrders} element={<Orders />} />
            <Route path={urlReactScanning} element={<Scanning />} />
            <Route path={urlReactSignUp} element={<SignUp />} />
            <Route path={urlReactSignIn} element={<SignIn />} />
          </Routes>
      </Layout>
    </Router>
  );
}
