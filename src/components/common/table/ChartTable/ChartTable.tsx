import { ITransaction } from "../../../../interfaces";
import ChartTableBody from "./ChartTableBody";
import ChartTableHeader from "./ChartTableHeader";

type chartTableProps = {
  columns: string[];
  transactions: ITransaction[];
  isChartTable: boolean;
};

const ChartTable = ({
  columns,
  transactions,
  isChartTable,
}: chartTableProps) => {
  const getClass = () => {
    return isChartTable ? "chartTable mx-auto" : "w-100 mx-auto";
  };

  return (
    <div className={getClass()}>
      <table className="table mt-5">
        <ChartTableHeader columns={columns} />
        <ChartTableBody data={transactions} />
      </table>
    </div>
  );
};

export default ChartTable;
