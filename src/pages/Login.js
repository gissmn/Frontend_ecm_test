import React, { useState } from "react";
import { Link } from "react-router-dom";
import { LOGIN } from "../apollo/gql/Admin/login";
import { useMutation } from "@apollo/client";
import Loading from "../components/core/Loading";
import { useNavigate } from "react-router-dom";
export default function Login() {
  const [user, setUser] = useState({ email: "", password: "" });
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleChange = (e) => {
    setError(false);
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  const [login] = useMutation(LOGIN);

  const handleSubmit = (e) => {
    setLoading(true);
    e.preventDefault();
    login({
      variables: { email: user.email, password: user.password },
      onError(e) {
        setLoading(false);
        setError(e.message);
      },
      onCompleted(data) {
        setLoading(false);
        setError(false);
        localStorage.setItem("token", data.login);
        navigate("/");
      },
    });
  };
  return (
    <div className="flex w-screen h-screen">
      <div className="w-1/2 h-full bg-blue-400"></div>
      <div className="w-1/2 h-full min-w-max flex items-center justify-center flex-col">
        <h1 className="text-center font-bold text-5xl text-blue-400 mb-10">Call Center</h1>
        <h1 className="text-center">Login</h1>
        <form className="w-full max-w-xs" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Email</label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="email"
              placeholder="Email"
              name="email"
              value={user.email}
              onChange={handleChange}
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">Password</label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              type="password"
              name="password"
              onChange={handleChange}
              value={user.password}
              placeholder="******************"
            />
            <p className="text-red-500 text-xs italic h-2">{error || " "}</p>
          </div>
          <div className="flex items-center justify-between">
            <button
              className="flex justify-center bg-blue-500 text-center w-28 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:bg-gray-500"
              type="submit"
              disabled={loading}>
              {loading ? <Loading /> : "Login"}
            </button>
            <Link className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" to="/forgot">
              Forgot Password?
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
