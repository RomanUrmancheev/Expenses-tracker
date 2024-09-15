import { useAppSelector } from "../../hooks/reduxHooks";
import {
  getBankAccountById,
  getBankAccountsLoadingStatus,
} from "../../store/bankAccounts";

interface BankAccountProps {
  id: string;
}

const BankAccount = ({ id }: BankAccountProps) => {
  const isLoading = useAppSelector(getBankAccountsLoadingStatus());
  const bankAccount = useAppSelector(getBankAccountById(id));
  if (!isLoading) {
    return <p>{bankAccount?.title}</p>;
  } else {
    return "Loading";
  }
};

export default BankAccount;
