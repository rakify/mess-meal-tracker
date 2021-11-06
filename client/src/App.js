import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./pages/login/Login";
import Home from "./pages/Home";
import Register from "./pages/Register";
import { useSelector } from "react-redux";
function App() {
  const user = useSelector((state) => state.user.currentUser);
  return (
    <Router>
      <Routes>
        <Route
          exact
          path="/login"
          element={user ? <Navigate to="/" /> : <Login />}
        />
        <Route
          exact
          path="/register"
          element={user ? <Navigate to="/" /> : <Register />}
        />
        <Route exact path="/" element={!user ? <Navigate to="/login" /> : <Home />} />
        {/* <Route path="/products" element={ProductList} />
      <Route path="/product/:productId" element={Product} />
      <Route path="/newproduct" element={NewProduct} /> */}
      </Routes>
    </Router>
  );
}
export default App;
