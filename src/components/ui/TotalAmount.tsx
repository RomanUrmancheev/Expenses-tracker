import { IBankAccount, ITransaction } from "../../interfaces";

interface TotalAmountProps {
  transaction: ITransaction | IBankAccount;
}

//TODO use on main and starting page

const TotalAmount = ({ transaction }: TotalAmountProps) => {
  const getClassName = (value: number) => {
    if (value < 0) {
      return "text-center tw-font-bold tw-text-3xl tw-font-mono tw-text-red-500";
    }
    return "tw-font-bold text-center tw-text-3xl tw-font-mono tw-text-green-500";
  };

  return (
    <div className={getClassName(transaction.total)}>
      {transaction.total + "$"}
    </div>
  );
};

export default TotalAmount;
