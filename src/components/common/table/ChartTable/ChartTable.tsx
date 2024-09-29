import { ITransaction } from "../../../../interfaces";
import ChartTableBody from "./ChartTableBody";
import ChartTableHeader from "./ChartTableHeader";

type chartTableProps = {
  columns: string[];
  transactions: ITransaction[];
};

const ChartTable = ({ columns, transactions }: chartTableProps) => {
  return (
    <div className="chartTable mx-auto">
      <table className="table mt-5">
        <ChartTableHeader columns={columns} />
        <ChartTableBody data={transactions} />
      </table>
    </div>
  );
};

export default ChartTable;
