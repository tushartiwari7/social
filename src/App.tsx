import { getAllUsers, getAuthUser, getBookmarks } from "app/features";
import { useAppDispatch, useAppSelector } from "app/store";
import { Login, Signup } from "Pages";
import { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";
import { AppLayout as Layout } from "./Components";

const App = () => {
  const navigate = useNavigate();
  const auth = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (!auth.isLoggedIn) {
      if (localStorage.getItem("token")) {
        (async () => {
          await dispatch(getAuthUser()).unwrap();
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
