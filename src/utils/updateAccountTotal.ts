import { IBankAccount, ITransaction } from "../interfaces";

const updateAccountTotal = (
  transaction: ITransaction,
  bankAccounts: IBankAccount[]
) => {
  const accountForUpdate = bankAccounts.find(
    (b) => b._id === transaction.bankAccountId
  );
  console.log("update", bankAccounts);
  console.log("transaction", transaction.bankAccountId);
  if (accountForUpdate) {
    const newTotal = accountForUpdate?.total + transaction.total;
    return { ...accountForUpdate, total: +newTotal.toFixed(2) };
  }
};

export default updateAccountTotal;
