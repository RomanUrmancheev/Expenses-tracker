import { useHistory, useParams } from "react-router";
import * as yup from "yup";
import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHooks";
import {
  bankAccountUpdate,
  getBankAccountById,
} from "../../../store/bankAccounts";
import { HandleChangeProps, IErrors, RouteParams } from "../../../interfaces";
import { useEffect, useState } from "react";
import { TextField } from "../form/TextField";

const EditBankAccount = () => {
  const dispatch = useAppDispatch();
  const { bankId }: RouteParams = useParams();
  const currentBankAccount = useAppSelector(getBankAccountById(bankId));
  const [data, setData] = useState({
    _id: "",
    title: "",
    total: 0,
    userId: "",
  });
  const [errors, setErrors] = useState({} as IErrors);
  const [isLoading, setIsLoading] = useState(true);
  const [submitTryes, setTryes] = useState(0);
  const history = useHistory();

  useEffect(() => {
    if (currentBankAccount && data._id === "") {
      setData(currentBankAccount);
    }
  }, [data, currentBankAccount]);

  useEffect(() => {
    if (data && isLoading) {
      setIsLoading(false);
    }
  }, [data]);

  const validateScheme = yup.object().shape({
    title: yup.string().required("Title is required"),
    total: yup
      .number()
      .required("Total is required")
      .min(0, "Bank account total amount must be 0 or more"),
  });

  const validate = () => {
    validateScheme
      .validate(data)
      .then(() => setErrors({}))
      .catch((err) => setErrors({ [err.path]: err.message }));
    return Object.keys(errors).length === 0;
  };

  useEffect(() => {
    if (submitTryes > 0) {
      validate();
    }
  }, [data]);

  const isValid = Object.keys(errors).length === 0;

  const handleChange = (inputData: HandleChangeProps) => {
    setData((prevState) => ({
      ...prevState,
      [inputData.name]: inputData.value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTryes(1);
    const isValid = validate();
    if (!isValid) return;
    const formatedData = {
      ...data,
      total: Number(data.total),
    };
    dispatch(bankAccountUpdate(formatedData));
    history.push(`/bankAccounts`);
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
              Edit bank account
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditBankAccount;
