import { IBankAccount, ITransaction, ITransactionCreate } from "../interfaces";

export const updateAccountTotal = (
  transaction: ITransactionCreate,
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

export const updateAccountTotalAfterTransactionEdit = (
  oldTransaction: ITransaction,
  newTransaction: ITransaction,
  bankAccounts: IBankAccount[]
) => {
  const bankAccount = bankAccounts.find(
    (b) => b._id === newTransaction.bankAccountId
  );
  if (oldTransaction.total < 0) {
    return {
      ...bankAccount,
      total:
        bankAccount!.total +
        oldTransaction.total * -1 +
        newTransaction.total.toFixed(2),
    };
  } else {
    return {
      ...bankAccount,
      total:
        bankAccount!.total -
        oldTransaction.total +
        newTransaction.total.toFixed(2),
    };
  }
};
