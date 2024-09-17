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
import BackHistoryButton from "../BackButton";
import CreateNewButton from "../CreateNewButton";

//TODO improve table view

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
    <div className="container mt-4">
      <div className="mb-4 d-flex justify-content-between">
        <BackHistoryButton />
        <CreateNewButton
          label={"Add new bank account"}
          link={"bankAccounts/add"}
        />
      </div>
      <table className="table">
        <AccountsHeader />
        <AccountsTableBody
          data={bankAccounts}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </table>
    </div>
  );
};

export default BankAccountsList;
