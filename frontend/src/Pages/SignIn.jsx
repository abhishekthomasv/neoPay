import { Link, useNavigate } from "react-router-dom";
import { InputBoxV2 } from "../Components/InputBox/InputBoxV2";
import { useState } from "react";
import axios from "axios";
const BASE_URL = import.meta.env.VITE_BASE_URL;
import useFetchCurrentUser from "../Hooks/useFetchCurrentUser";

export const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  useFetchCurrentUser(navigate);

  const handleSubmit = async () => {
    try {
      const response = await axios.post(`${BASE_URL}/user/signin`, {
        username: email.trim(),
        password: password,
      });

      if (response.data) {
        localStorage.setItem("token", "Bearer " + response.data.token);
        navigate("/dashboard");
      }
    } catch (err) {
      setError(err);
    }
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900 h-screen flex flex-col justify-center items-center">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto ">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Sign in to your account
            </h1>
            <div>
              <div
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Your email
              </div>
              <InputBoxV2
                placeholder={"johndoe@email.com"}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </div>
            <div>
              <div
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Password
              </div>
              <InputBoxV2
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                type="password"
                placeholder={"••••••••"}
              />
            </div>
            {error && (
              <div className="text-red-500 text-sm ml-2">
                Invalid credentials
              </div>
            )}
            <button
              onClick={handleSubmit}
              className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
            >
              Sign in
            </button>
            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
              Don’t have an account yet?{" "}
              <Link
                to={"/signup"}
                className="font-medium text-primary-600 hover:underline dark:text-primary-500"
              >
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
