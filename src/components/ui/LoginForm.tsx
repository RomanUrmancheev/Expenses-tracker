import { useEffect, useState } from "react";
import { TextField } from "../common/form/TextField";
// import { useDispatch, useSelector } from "react-redux";
// import { getAuthError, logIn } from "../../store/users";
import * as yup from "yup";
import { HandleChangeProps, IErrors } from "../../interfaces";

const LoginForm = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
    stayOn: false,
  });
  const [errors, setErrors] = useState({} as IErrors);
  const [submitTryes, setTryes] = useState(0);
  // const dispatch = useDispatch();
  // const enterError = useSelector(getAuthError());

  const handleChange = (inputData: HandleChangeProps) => {
    setData((prevState) => ({
      ...prevState,
      [inputData.name]: inputData.value,
    }));
  };

  const validateScheme = yup.object().shape({
    email: yup
      .string()
      .required("Email is required")
      .matches(/^\S+@\S+\.\S+$/, "Email is incorrect"),
    password: yup.string().required("Password is required"),
  });

  useEffect(() => {
    if (submitTryes > 0) {
      validate();
    }
  }, [data]);

  const validate = () => {
    validateScheme
      .validate(data)
      .then(() => setErrors({}))
      .catch((err) => setErrors({ [err.path]: err.message }));
    return Object.keys(errors).length === 0;
  };

  const isValid = Object.keys(errors).length === 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTryes(1);
    const isValid = validate();
    if (!isValid) return;
    // dispatch(logIn(data));
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        name="email"
        value={data.email}
        onChange={handleChange}
        label="Email"
        error={errors.email}
      />
      <TextField
        type="password"
        name="password"
        value={data.password}
        onChange={handleChange}
        label="Password"
        error={errors.password}
      />
      {/* {enterError && <p className="text-danger">{enterError}</p>} */}
      <button disabled={!isValid} className="btn btn-primary w-100 mx-auto">
        Submit
      </button>
    </form>
  );
};

export default LoginForm;
