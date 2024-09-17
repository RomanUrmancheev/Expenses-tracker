import { IColumns, ITransaction } from "../../../../interfaces";
import TableBody from "./TableBody";
import TableHeader from "./TableHeader";

interface ISortBy {
  item: string;
  path: string;
  order: boolean | "asc" | "desc";
}

//TODO change table position

interface TableProps {
  data: ITransaction[];
  onSort: (item: ISortBy) => void;
  selectedSort: ISortBy;
  columns: IColumns[];
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
