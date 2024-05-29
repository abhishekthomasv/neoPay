import { useLocation } from "react-router-dom";

export const PaymentSuccess = () => {
  const location = useLocation();
  const { name, inputAmout } = location.state;
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
      <div className="text-center text-gray-200 ">Amount: Rs {inputAmout}</div>
      <div className="text-center text-gray-200 ">Payment Successful ✅</div>
    </div>
  );
};
