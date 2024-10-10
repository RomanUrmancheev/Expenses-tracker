import bankAccountImg from "../assets/safe150.png";
import incomeImg from "../assets/income3.png";
import expensesImg from "../assets/expenses.png";
import MainPageCard from "../components/ui/mainPageCard/MainPageCard";
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
import AnalyticTabs from "../components/ui/AnalyticTabs";

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
    <div className="container text-center">
      <div className="row mb-3 align-items-start">
        <MainPageCard
          headImg={bankAccountImg}
          name="Bank Accounts"
          link="./bankAccounts/add"
          data={bankAccounts}
          listLink="./bankAccounts"
        />
        <MainPageCard
          headImg={incomeImg}
          name="Income"
          link="./transactions/add"
          data={incomes}
          listLink="./transactions"
        />
        <MainPageCard
          headImg={expensesImg}
          name="Expenses"
          link="./transactions/add"
          data={expenses}
          listLink="./transactions"
        />
      </div>
      <div className="row">
        <h1>Analytics</h1>
        <AnalyticTabs />
      </div>
    </div>
  ) : (
    "Loading"
  );
};

export default MainPage;
