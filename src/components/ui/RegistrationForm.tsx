import { useEffect, useState } from "react";
import * as yup from "yup";
import { TextField } from "../common/form/TextField";
import { CheckBoxField } from "../common/form/CheckBox";
// import { useDispatch, useSelector } from "react-redux";
// import { signUp } from "../../store/users";
import { HandleChangeProps, IErrors } from "../../interfaces";

const RegistrationForm = () => {
  // const dispatch = useDispatch();
  const [data, setData] = useState({
    email: "",
    password: "",
    name: "",
    license: false,
  });
  const [errors, setErrors] = useState({} as IErrors);
  const [submitTryes, setTryes] = useState(0);

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
    password: yup
      .string()
      .required("Password is required")
      .matches(/[A-Z]+/g, "Password contain uppercase character")
      .matches(/\d+/g, "Password contain digit character")
      .min(8, "Password must contains minimum 8 symbols"),
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
    // dispatch(signUp(data));
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
      <TextField
        name="name"
        value={data.name}
        onChange={handleChange}
        label="Name"
        error={errors.name}
      />
      <CheckBoxField
        name="license"
        onChange={handleChange}
        value={data.license}
        error={errors.license}
      >
        I agree with <a>license agreement</a>
      </CheckBoxField>

      <button disabled={!isValid} className="btn btn-primary w-100 mx-auto">
        Submit
      </button>
    </form>
  );
};

export default RegistrationForm;
