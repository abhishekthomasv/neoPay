import { useNavigate } from "react-router-dom";
import { BlueButton } from "./Buttons/BlueButton";

export const UserCard = ({ firstName, lastName, username, fromId, toId }) => {
  const navigate = useNavigate();

  const handlePaymentUserSelect = () => {
    navigate("/send", { state: { fromId, toId, firstName, lastName } });
  };

  return (
    <div className="w-full max-w-md p-2 bg-white border border-gray-200 rounded-xl shadow sm:px-8 sm:pt-1 dark:bg-gray-800 dark:border-gray-700">
      <div className="flex items-center justify-between mb-4">
        <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white"></h5>
      </div>
      <div className="flow-root">
        <ul
          role="list"
          className="divide-y divide-gray-200 dark:divide-gray-700"
        >
          <>
            {" "}
            <li className="py-3 sm:py-2">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <img
                    className="w-8 h-8 rounded-full"
                    src={`https://ui-avatars.com/api/?name=${firstName}&background=random&color=fff `}
                    alt="Neil image"
                  />
                </div>
                <div className="flex-1 min-w-0 ms-4">
                  <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                    {firstName} {lastName}
                  </p>
                  <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                    {username}
                  </p>
                </div>
                <BlueButton
                  onClick={handlePaymentUserSelect}
                  placeholder="Pay"
                />
              </div>
            </li>
          </>
        </ul>
      </div>
    </div>
  );
};
