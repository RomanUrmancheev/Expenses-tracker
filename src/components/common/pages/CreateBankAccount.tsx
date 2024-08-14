import { useEffect, useState } from "react";
import * as yup from "yup";
import { HandleChangeProps, IErrors } from "../../../interfaces";
import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHooks";
import { TextField } from "../form/TextField";
import { getUser } from "../../../store/users";
import { createBankAccount } from "../../../store/bankAccounts";

const CreateBankAccount = () => {
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector(getUser());
  const [data, setData] = useState({
    title: "",
    total: "",
    userId: "",
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
    title: yup.string().required("Title is required"),
    total: yup
      .number()
      .required("Password is required")
      .min(0, "Bank account total amount must be 0 or more"),
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
    if (currentUser?._id !== undefined) {
      const formatedData = {
        ...data,
        total: Number(data.total),
        userId: currentUser?._id,
      };
      dispatch(createBankAccount(formatedData));
    }
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6  offset-md-3 shadow p-4">
          <form onSubmit={handleSubmit}>
            <TextField
              name="title"
              value={data.title}
              onChange={handleChange}
              label="title"
              error={errors.title}
            />
            <TextField
              name="total"
              value={data.total}
              onChange={handleChange}
              label="Total amount"
              error={errors.total}
            />

            <button
              disabled={!isValid}
              className="btn btn-primary w-100 mx-auto"
            >
              Add bank account
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateBankAccount;
