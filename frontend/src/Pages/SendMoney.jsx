import { InputBoxV } from "../Components/InputBox/InputBoxV";
import { BlueButton } from "../Components/Buttons/BlueButton";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const BASE_URL = import.meta.env.VITE_BASE_URL;

export const SendMoney = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { toId, firstName, lastName } = location.state;
  const name = `${firstName} ${lastName}`;
  const [inputAmout, setInputAmount] = useState(0);

  useEffect(() => {
    if (!location.state) {
      navigate("/dashboard");
    }
  }, []);

  const handlePayUser = async () => {
    try {
      const response = await axios.post(
        `${BASE_URL}/account/transfer`,
        {
          to: toId,
          amount: inputAmout,
        },
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );

      if (response.data) {
        navigate("/payment-success", { state: { name, inputAmout } });
      }
    } catch (error) {
      console.error("Error occurred while sending money:", error);
      // Handle error here, e.g., show an error message to the user
    }
  };

  return (
    <div className="flex flex-col justify-center items-center bg-gray-50 dark:bg-gray-800 h-screen w-auto">
      <div className="rounded-full mb-4 flex flex-col">
        <img
          src={`https://ui-avatars.com/api/?name=${name}&background=random&color=fff `}
          className="w-24 h-24  rounded-full justify-center items-cente self-center"
          alt=""
        />
        <div className="text-center text-gray-200 mt-1.5">{name}</div>
      </div>
      <div className="text-center text-gray-200 ">Paying to {name}</div>
      <div className="mt-2">
        <InputBoxV
          onChange={(e) => {
            setInputAmount(e.target.value);
          }}
          placeholder={"Enter Amount (₹)"}
        />
      </div>
      <div className="mt-4">
        {" "}
        <BlueButton onClick={handlePayUser} placeholder={"Pay"} />
      </div>
    </div>
  );
};
