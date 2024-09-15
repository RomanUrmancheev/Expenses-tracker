import { ITransaction } from "../../interfaces";
import BankAccount from "./BankAccount";
import Category from "./Category";
import DeleteTransactionButton from "./DeleteTransactionButton";
import EditTransactionButton from "./EditTransactionButton";

interface ITransactionsTableProps {
  transactions: ITransaction[];
  onSort: (item: ISortBy) => void;
  selectedSort: ISortBy;
  onEdit: (props: string) => void;
  onDelete: (props: string) => void;
}

interface ISortBy {
  item: string;
  path: string;
  order: boolean | "asc" | "desc";
}

const TransactionsTable = ({
  transactions,
  onSort,
  selectedSort,
  onEdit,
  onDelete,
}: ITransactionsTableProps) => {
  const columns = {
    title: {
      path: "title",
      name: "Title",
    },
    category: {
      name: "Transaction category",
      path: "transactionCategory",
      component: (transaction: ITransaction) => (
        <Category categoryId={transaction.category} />
      ),
    },
    bankAccount: {
      component: (transaction: ITransaction) => (
        <BankAccount id={transaction.bankAccountId} />
      ),
      name: "Bank account of transaction",
    },
    transactionAmount: {
      path: "transactionAmount",
      name: "Transaction amount",
    },
    editTransaction: {
      path: "editTransaction",
      name: "",
      component: (transaction: ITransaction) => (
        <EditTransactionButton id={transaction._id} onEdit={onEdit} />
      ),
    },
    deleteTransaction: {
      path: "deleteTransaction",
      name: "",
      component: (transaction: ITransaction) => (
        <DeleteTransactionButton id={transaction._id} onDelete={onDelete} />
      ),
    },
  };

  return <Table {...{ onSort, selectedSort, columns, data: transactions }} />;
};

export default TransactionsTable;
