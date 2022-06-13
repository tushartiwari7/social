import { getAllUsers, getAuthUser, getBookmarks } from "app/features";
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
      if (localStorage.getItem("token")) {
        (async () => {
          await dispatch(getAuthUser());
          await Promise.all([
            dispatch(getAllUsers()),
            dispatch(getBookmarks()),
          ]);
        })();
      } else navigate("/login");
    }
    // eslint-disable-next-line
  }, []);
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
