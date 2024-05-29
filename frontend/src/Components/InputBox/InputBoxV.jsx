export const InputBoxV = ({ placeholder, onChange }) => {
  return (
    <input
      onChange={onChange}
      type="text"
      name="text"
      id="inputboxv"
      className=" text-center bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg   block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white  focus:outline-none"
      placeholder={placeholder}
      required=""
    />
  );
};
