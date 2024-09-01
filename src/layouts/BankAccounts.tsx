import { useParams } from "react-router";
import { RouteParams } from "../interfaces";
import EditBankAccount from "../components/common/pages/EditBankAccount";
import CreateBankAccount from "../components/common/pages/CreateBankAccount";
import BankAccountsList from "../components/common/pages/BankAccountsList";

const BankAccounts = () => {
  const params = useParams();
  const { action }: RouteParams = params;
  return (
    <>
      {action ? (
        action === "edit" ? (
          <EditBankAccount />
        ) : (
          <CreateBankAccount />
        )
      ) : (
        <BankAccountsList />
      )}
    </>
  );
};

export default BankAccounts;
