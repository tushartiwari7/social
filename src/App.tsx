import { Login, Signup } from "Pages";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import { AppLayout as Layout } from "./Components";
const App: React.FC = () => {
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
