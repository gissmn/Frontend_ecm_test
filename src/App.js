import { Routes, Route, Link } from "react-router-dom";
import Login from "./pages/Login";
import CallList from "./pages/CallList";
import RequireAuth from "./components/RequireAuth";
function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={
            <RequireAuth>
              <CallList />
            </RequireAuth>
          }
        />
        <Route
          path="/*"
          element={
            <div className="flex flex-col w-screen h-screen items-center justify-center">
              <h1 className="font-bold mb-4">404 not found</h1>
              <Link to="/" className="btn bg-primary text-gray-200">
                Back to Home
              </Link>
            </div>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
