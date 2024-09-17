import { ITransaction } from "../../interfaces";
import Table from "../common/table/TransactionsTable/Table";
import BankAccount from "./BankAccount";
import Category from "./Category";
import DeleteTransactionButton from "./DeleteTransactionButton";
import EditTransactionButton from "./EditTransactionButton";
import TotalAmount from "./TotalAmount";

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
  const columns = [
    {
      path: "date",
      name: "Transaction date",
    },
    {
      path: "title",
      name: "Title",
    },
    {
      name: "Transaction category",
      component: (transaction: ITransaction) => (
        <Category categoryId={transaction.category} />
      ),
    },
    {
      component: (transaction: ITransaction) => (
        <BankAccount id={transaction.bankAccountId} />
      ),
      name: "Bank account of transaction",
    },
    {
      path: "total",
      name: "Transaction amount",
      component: (transaction: ITransaction) => (
        <TotalAmount transaction={transaction} />
      ),
    },
    {
      name: " ",
      component: (transaction: ITransaction) => (
        <EditTransactionButton id={transaction._id} onEdit={onEdit} />
      ),
    },
    {
      name: "  ",
      component: (transaction: ITransaction) => (
        <DeleteTransactionButton id={transaction._id} onDelete={onDelete} />
      ),
    },
  ];

  return <Table {...{ onSort, selectedSort, columns, data: transactions }} />;
};

export default TransactionsTable;
