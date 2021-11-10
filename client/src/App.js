import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useSelector } from "react-redux";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Register from "./pages/Register";
import AdminForm from "./components/AdminForm";
import Profile from './pages/Profile';

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
        <Route exact path="/profile" element={<Profile />} />
        <Route exact path="/:secret" element={<AdminForm />} />
        <Route
          exact
          path="/"
          element={!user ? <Navigate to="/login" /> : <Home />}
        />
      </Routes>
    </Router>
  );
}
export default App;
