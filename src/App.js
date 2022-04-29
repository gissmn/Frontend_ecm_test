import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import CallList from "./pages/CallList";
function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<CallList />} />
      </Routes>
    </div>
  );
}

export default App;
