import { useHistory } from "react-router";
import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHooks";
import {
  deleteBankAccount,
  getBankAccounts,
} from "../../../store/bankAccounts";
import AccountsHeader from "../table/BankAccounts/AccountsHeader";
import AccountsTableBody from "../table/BankAccounts/AccountsTableBody";
import { useEffect, useState } from "react";
import { IBankAccount } from "../../../interfaces";

const BankAccountsList = () => {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const accountsList = useAppSelector(getBankAccounts());
  const [bankAccounts, setBankAccounts] = useState([] as IBankAccount[]);

  useEffect(() => {
    setBankAccounts(accountsList);
  }, [accountsList]);

  const handleEdit = (accountId: string) => {
    history.push(`bankAccounts/edit/${accountId}`);
  };

  const handleDelete = (id: string) => {
    dispatch(deleteBankAccount(id));
    const updatedList = bankAccounts.filter((item) => item._id !== id);
    setBankAccounts(updatedList);
  };

  return (
    <table className="table">
      <AccountsHeader />
      <AccountsTableBody
        data={bankAccounts}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </table>
  );
};

export default BankAccountsList;
