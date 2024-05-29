import { Navbar } from "../Components/Navbar";
import { RoundedButton } from "../Components/Buttons/RoundedButton";
import { InputBoxV } from "../Components/InputBox/InputBoxV";
import { UserCard } from "../Components/UserCard";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const BASE_URL = import.meta.env.VITE_BASE_URL;

export const Dashboard = () => {
  const [data, setData] = useState([]);
  const [userDetails, setUserDetails] = useState(null);
  const [error, setError] = useState(null);
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  const fetchData = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(`${BASE_URL}/user/bulk`, {
        headers: {
          Authorization: `${token}`,
        },
      });
      setData(response.data.user);
    } catch (err) {
      setError(err);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const fetchCurrentUser = async () => {
    const token = localStorage.getItem("token");
    try {
      const userResponse = await axios.get(`${BASE_URL}/user/me`, {
        headers: {
          Authorization: `${token}`,
        },
      });

      setUserDetails(userResponse.data[0]);
    } catch (err) {
      navigate("/signin");
    }
  };

  useEffect(() => {
    fetchCurrentUser();
  }, []);

  const handleUserFilter = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(
        `${BASE_URL}user/bulk?filter=${username}`,
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );
      setData(response.data.user);
    } catch (err) {
      setError(err);
    }
  };

  useEffect(() => {
    handleUserFilter;
  }, [username]);

  if (userDetails && data) {
    const newData = data.filter((user) => user._id !== userDetails._id);

    return (
      <div className="bg-gray-50 dark:bg-gray-800 h-screen ">
        <Navbar username={userDetails.firstName + " " + userDetails.lastName} />
        <div className="flex flex-col justify-center items-center">
          <div className="flex justify-center  sm:text-xl md:text-2xl  items-center mt-24 font-medium text-gray-900 dark:text-white">
            Your Balance is Rs {userDetails.accounts[0].balance.toFixed(2)}
          </div>

          <div className="flex flex-row  justify-center items-center mt-16 mb-6">
            <div className=" sm:w-48 md:w-96 justify-center items-center ml-4 ">
              <div
                htmlFor="payment"
                className="block mb-3 text-sm font-medium text-gray-900 dark:text-white"
              >
                Enter a user name to pay
              </div>

              <InputBoxV
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
              />
            </div>
            <RoundedButton onClick={handleUserFilter} />
          </div>

          {newData.map((user) => (
            <UserCard
              key={user._id}
              fromId={userDetails._id}
              toId={user._id}
              firstName={user.firstName}
              lastName={user.lastName}
            />
          ))}
        </div>
      </div>
    );
  }
};
