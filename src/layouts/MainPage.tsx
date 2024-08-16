import bankAccountImg from "../assets/safe150.png";
import incomeImg from "../assets/income3.png";
import expensesImg from "../assets/expenses.png";
import MainPageCard from "../components/ui/MainPageCard";
import { useAppSelector } from "../hooks/reduxHooks";
import {
  getBankAccounts,
  getBankAccountsLoadingStatus,
} from "../store/bankAccounts";
import { useEffect, useState } from "react";
import {
  getTransactions,
  getTransactionsLoadingStatus,
} from "../store/transactions";

const bankAccountCardBg = "tw-bg-gradient-to-r tw-from-teal-400 tw-to-cyan-500";
const incomeCardBg = "tw-bg-gradient-to-r tw-from-cyan-500 tw-to-sky-500";
const expensesCardBg = "tw-bg-gradient-to-r tw-from-sky-500 tw-to-blue-500";

//TODO center bankAccounts and expenses IMG

const MainPage = () => {
  const bankAccountsStatus = useAppSelector(getBankAccountsLoadingStatus());
  const transactionsStatus = useAppSelector(getTransactionsLoadingStatus());
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    if (!bankAccountsStatus && !transactionsStatus) {
      setIsLoading(false);
    }
  }, [bankAccountsStatus, transactionsStatus]);
  const bankAccounts = useAppSelector(getBankAccounts()).slice(-3);
  const transactions = useAppSelector(getTransactions());
  const expenses = transactions.filter((t) => t.total < 0).slice(-3);
  const incomes = transactions.filter((t) => t.total > 0).slice(-3);

  return !isLoading ? (
    <div className="container text-center mt-5">
      <div className="row">
        <MainPageCard
          headImg={bankAccountImg}
          name="Bank Accounts"
          link="./bank-accounts-add"
          bgColor={bankAccountCardBg}
          data={bankAccounts}
        />
        <MainPageCard
          headImg={incomeImg}
          name="Income"
          link="./transactions-add"
          bgColor={incomeCardBg}
          data={incomes}
        />
        <MainPageCard
          headImg={expensesImg}
          name="Expenses"
          link="./transactions-add"
          bgColor={expensesCardBg}
          data={expenses}
        />
      </div>
      <div className="row">
        <div className="col">
          <h1>Analytics</h1>
        </div>
      </div>
    </div>
  ) : (
    "Loading"
  );
};

export default MainPage;
