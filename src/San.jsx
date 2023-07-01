import { useCallback, useState } from "react";
import Routes from "./routes/Routes";
import { defaultInputStyle } from "./components/constants/defaultStyle";
import Button from "./components/Button/Button";
import { useDispatch } from "react-redux";
import { addNewProduct } from "./redux/productSlice";
import useInput from "./hooks/useInput";

const emptyForm = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
};
const onSubmit = () => {};

const San = () => {
  // const [register, setRegister] = useState(emptyForm);
  const [formState, handleChange, handleSubmit] = useInput(emptyForm, onSubmit);


  return (
    <>
      <div className="font-sans container h-screen flex justify-center items-center">
        <h1>San</h1>
        {/* <Routes /> */}
        <form onSubmit={handleSubmit} className=" w-96 p-5 shadow ">
          <input
            name="firstName"
            className={defaultInputStyle}
            value={formState.firstName}
            onChange={handleChange}
          />
          <input
            name="lastName"
            className={defaultInputStyle}
            value={formState.lastName}
            onChange={handleChange}
          />
          <input
            name="email"
            className={defaultInputStyle}
            value={formState.email}
            onChange={handleChange}
          />
          <input
            name="password"
            className={defaultInputStyle}
            value={formState.password}
            onChange={handleChange}
          />
          <button block="true">
            <span>submit</span>
          </button>
        </form>
      </div>
    </>
  );
};

export default San;
