import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { InputBoxV2 } from "../Components/InputBox/InputBoxV2";
const BASE_URL = import.meta.env.VITE_BASE_URL;

export const SignUp = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/dashboard");
    }
  });

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const registerAccount = async () => {
    const response = await axios.post(`${BASE_URL}/user/signup`, {
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      username: userName.trim(),
      password: password,
    });

    localStorage.setItem("token", "Bearer " + response.data.token);
    navigate("/dashboard");
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900 h-screen flex justify-center items-center">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-96 bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Sign Up
            </h1>

            <div>
              <div className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                First Name
              </div>
              <InputBoxV2
                onChange={(e) => {
                  setFirstName(e.target.value);
                }}
                placeholder={"Enter your first name"}
              />
            </div>
            <div>
              <div className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Last Name
              </div>
              <InputBoxV2
                onChange={(e) => {
                  setLastName(e.target.value);
                }}
                placeholder={"Enter your last name"}
              />
            </div>
            <div>
              <div className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Your email
              </div>
              <InputBoxV2
                onChange={(e) => {
                  setUserName(e.target.value);
                }}
                placeholder={"example@email.com"}
              />
            </div>
            <div>
              <div className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Password
              </div>

              <InputBoxV2
                type="password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                placeholder={"••••••••••"}
              />
            </div>

            <button
              disabled={!firstName || !lastName || !userName || !password}
              onClick={registerAccount}
              className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 "
            >
              Create an account
            </button>
            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
              Already have an account?{" "}
              <Link
                to={"/signin"}
                href="#"
                className="font-medium text-primary-600 hover:underline dark:text-primary-500"
              >
                Login here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
