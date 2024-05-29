import { Navbar } from "../Components/Navbar";
import { InputBoxV } from "../Components/InputBox/InputBoxV";
import { UserCard } from "../Components/UserCard";
import { useState, useEffect } from "react";
import axios from "axios";
const BASE_URL = import.meta.env.VITE_BASE_URL;

export const Dashboard = () => {
  const [data, setData] = useState([]);
  const [username, setUsername] = useState("");
  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await axios.get(
          `${BASE_URL}/user/bulk?filter=${username}`,
          {
            headers: {
              Authorization: `${token}`,
            },
          }
        );
        setData(response.data.user);

        const timer = setTimeout(async () => {
          const response = await axios.get(
            `${BASE_URL}/user/bulk?filter=${username}`,
            {
              headers: {
                Authorization: `${token}`,
              },
            }
          );
          setData(response.data.user);
        }, 1000);

        () => {
          clearTimeout(timer);
        };
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [username]);

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("token");
      const userResponse = await axios.get(`${BASE_URL}/user/me`, {
        headers: {
          Authorization: `${token}`,
        },
      });

      if (userResponse.data && userResponse.data.length > 0) {
        setUserDetails(userResponse.data[0]);
      } else {
        navigate("/signin");
      }
    };
    fetchUserData();
  }, []);

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
          </div>

          {newData.slice(0, 3).map((user) => (
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
