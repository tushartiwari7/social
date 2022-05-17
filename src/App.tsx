import { Login, Signup } from "Pages";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";
import { AppLayout as Layout } from "./Components";
const App: React.FC = () => {
  const navigate = useNavigate();
  const auth = useSelector((state: any) => state.auth);
  useEffect(() => {
    if (!auth.isLoggedIn) {
      navigate("/login");
    }
    // eslint-disable-next-line
  }, [auth.isLoggedIn]);
  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="*" element={<Layout />} />
      </Routes>
    </div>
  );
};
export default App;
