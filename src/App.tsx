import { getAllUsers } from "app/features";
import { Login, Signup } from "Pages";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";
import { AppLayout as Layout } from "./Components";
const App: React.FC = () => {
  const navigate = useNavigate();
  const auth = useSelector((state: any) => state.auth);
  const dispatch = useDispatch();
  useEffect(() => {
    if (!auth.isLoggedIn) {
      navigate("/login");
    } else {
      (async () => {
        const resp = await dispatch(getAllUsers());
        console.log(resp);
      })();
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
