import { useHistory, useParams } from "react-router";
import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHooks";
import { HandleChangeProps, IErrors, RouteParams } from "../../../interfaces";
import {
  getTransactionById,
  transactionUpdate,
} from "../../../store/transactions";
import { useEffect, useState } from "react";
import * as yup from "yup";
import { updateAccountTotalAfterTransactionEdit } from "../../../utils/updateAccountTotal";
import { getBankAccounts } from "../../../store/bankAccounts";
import { TextField } from "../form/TextField";
import SelectField from "../form/SelectField";
import { getCategoriesList } from "../../../store/categories";
import { DatePicker } from "@mui/x-date-pickers";
import moment from "moment";

const EditTransaction = () => {
  const dispatch = useAppDispatch();
  const { transactionId }: RouteParams = useParams();
  const currentTransaction = useAppSelector(getTransactionById(transactionId));
  const bankAccounts = useAppSelector(getBankAccounts());
  const categories = useAppSelector(getCategoriesList());
  const [data, setData] = useState({
    _id: "",
    title: "",
    total: 0,
    bankAccountId: "",
    userId: "",
    category: "",
    date: "",
  });
  const [errors, setErrors] = useState({} as IErrors);
  const [isLoading, setIsLoading] = useState(true);
  const [submitTryes, setTryes] = useState(0);
  const [transactionDate, setTransactionDate] = useState(moment());
  const history = useHistory();

  useEffect(() => {
    if (currentTransaction && data._id === "") {
      setData(currentTransaction);
    }
  }, [data, currentTransaction]);

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
      date: transactionDate.format("DD.MM.YYYY"),
    };
    if (
      currentTransaction !== undefined &&
      formatedData.total !== currentTransaction?.total
    ) {
      const updatedAccount = updateAccountTotalAfterTransactionEdit(
        currentTransaction,
        formatedData,
        bankAccounts
      );
      updatedAccount ??
        dispatch(transactionUpdate(formatedData, updatedAccount));
      history.goBack();
    } else {
      dispatch(transactionUpdate(formatedData));
      history.goBack();
    }
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6  offset-md-3 shadow p-4">
          {!isLoading ? (
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
                onChange={(newValue) =>
                  newValue && setTransactionDate(newValue)
                }
              />

              <button
                disabled={!isValid}
                className="btn btn-primary w-100 mx-auto"
              >
                Edit transaction
              </button>
            </form>
          ) : (
            "Loading..."
          )}
        </div>
      </div>
    </div>
  );
};

export default EditTransaction;
