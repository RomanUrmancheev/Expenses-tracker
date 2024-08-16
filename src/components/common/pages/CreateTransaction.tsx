import { useEffect, useState } from "react";
import * as yup from "yup";
import { HandleChangeProps, IErrors } from "../../../interfaces";
import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHooks";
import { TextField } from "../form/TextField";
import { getUser } from "../../../store/users";
import { getCategoriesList } from "../../../store/categories";
import SelectField from "../form/SelectField";
import { DatePicker } from "@mui/x-date-pickers";
import moment from "moment";
import {
  bankAccountUpdate,
  getBankAccounts,
} from "../../../store/bankAccounts";
import updateAccountTotal from "../../../utils/updateAccountTotal";
import { createTransaction } from "../../../store/transactions";

const CreateTransaction = () => {
  const dispatch = useAppDispatch();
  const categories = useAppSelector(getCategoriesList());
  const bankAccounts = useAppSelector(getBankAccounts());
  const currentUser = useAppSelector(getUser());
  const [data, setData] = useState({
    title: "",
    total: 0,
    userId: "",
    bankAccountId: "",
    category: "",
    date: "",
  });
  const [transactionDate, setTransactionDate] = useState(moment());
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
    total: yup.string().required("Transaction amount is required"),
    category: yup.string().required("Category is required"),
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
        date: transactionDate.format("DD.MM.YYYY"),
      };
      const updatedAccount = updateAccountTotal(formatedData, bankAccounts);
      console.log(formatedData);
      console.log("account", updatedAccount);
      dispatch(createTransaction(formatedData));
      updatedAccount ? dispatch(bankAccountUpdate(updatedAccount)) : null;
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
            <SelectField
              label="Category"
              onChange={handleChange}
              name="category"
              value={data.category}
              defaultOption="Choose transaction category"
              options={categories}
              error={errors.profession}
            />
            <SelectField
              label="Bank account"
              onChange={handleChange}
              name="bankAccountId"
              value={data.bankAccountId}
              defaultOption="Select the account on which the transaction was made"
              options={bankAccounts}
              error={errors.profession}
            />
            <DatePicker
              className="mb-4"
              format="DD.MM.YYYY"
              label="Transaction date"
              value={transactionDate}
              onChange={(newValue) => newValue && setTransactionDate(newValue)}
            />

            <button
              disabled={!isValid}
              className="btn btn-primary w-100 mx-auto"
            >
              Add transaction
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateTransaction;
