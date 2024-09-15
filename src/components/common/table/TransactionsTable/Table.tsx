import { IColumns, ITransaction } from "../../../../interfaces";

interface ISortBy {
  item: string;
  path: string;
  order: boolean | "asc" | "desc";
}

interface TableProps {
  data: ITransaction[];
  onSort: (item: ISortBy) => void;
  selectedSort: ISortBy;
  columns: IColumns;
}
const Table = ({ onSort, selectedSort, columns, data }: TableProps) => {
  return (
    <table className="table">
      <>
        <TableHeader {...{ onSort, selectedSort, columns }} />
        <TableBody {...{ columns, data }} />
      </>
    </table>
  );
};

export default Table;
