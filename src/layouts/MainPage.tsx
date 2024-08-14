import bankAccountImg from "../assets/safe150.png";
import incomeImg from "../assets/incomeImg.png";
import MainPageCard from "../components/ui/MainPageCard";
import { useAppSelector } from "../hooks/reduxHooks";
import {
  getBankAccounts,
  getBankAccountsLoadingStatus,
} from "../store/bankAccounts";
import { useEffect, useState } from "react";

const bankAccountCardBg = "tw-bg-gradient-to-r tw-from-teal-400 tw-to-cyan-400";
const incomeCardBg = "tw-bg-gradient-to-r tw-from-cyan-400 tw-to-sky-400";

const MainPage = () => {
  const bankAccountsStatus = useAppSelector(getBankAccountsLoadingStatus());
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    if (!bankAccountsStatus) {
      setIsLoading(false);
    }
  }, [bankAccountsStatus]);
  const bankAccounts = useAppSelector(getBankAccounts()).slice(-3);

  return !isLoading ? (
    <div className="container text-center mt-5">
      <div className="row">
        <MainPageCard
          headImg={bankAccountImg}
          name="Bank Accounts"
          link="./bank-accounts/add"
          bgColor={bankAccountCardBg}
          data={bankAccounts}
        />
        <MainPageCard
          headImg={incomeImg}
          name="Income"
          link="./transactions/add"
          bgColor={incomeCardBg}
          data={bankAccounts}
        />
        <div className="col">
          <h1>Expenses</h1>
        </div>
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
