import { useEffect, useState } from "react";
import { useAppSelector } from "../../../hooks/reduxHooks";
import { getTransactions } from "../../../store/transactions";
import { getDataForExpenseIncomeChart } from "../../../utils/chartsHelper";
import { BarChart, BarItemIdentifier } from "@mui/x-charts";
import { ITransaction } from "../../../interfaces";
import ChartTabPane from "../../ui/ChartTabPane";

interface ITableData {
  incomes: ITransaction[];
  expenses: ITransaction[];
}

interface IDataSet {
  expenses: number;
  incomes: number;
}

type ChartDataType = {
  xAxis: string[];
  dataset: IDataSet[];
  tableData: ITableData[];
};

const columns = ["Title", "Date", "Category", "Total amount"];

export const ExpensesIncomeChartPage = () => {
  const transactions = useAppSelector(getTransactions());
  const incomesList = transactions.filter((i) => i.total > 0);
  const expensesList = transactions.filter((i) => i.total < 0);
  const [chartRange, setChartRange] = useState(3);
  const [chartData, setChartData] = useState<ChartDataType>();
  const [tableData, setTableData] = useState<ITableData | null>(null);

  useEffect(() => {
    if (incomesList !== undefined && expensesList !== undefined) {
      const data = getDataForExpenseIncomeChart(
        expensesList,
        incomesList,
        chartRange
      );
      setChartData(data);
    }
  }, [chartRange, transactions]);

  const handleChange = (range: number) => {
    setChartRange(range);
    setTableData(null);
  };

  const handleBarsCLick = (
    _event: React.MouseEvent<SVGElement, MouseEvent>,
    bar: BarItemIdentifier
  ) => {
    if (chartData) setTableData(chartData.tableData[bar.dataIndex]);
  };

  function valueFormatter(value: number | null) {
    return `${value}$`;
  }

  return chartData ? (
    <div className="d-flex flex-column mt-5">
      <div className="d-flex justify-content-center align-items-center mb-4">
        <button
          className="ms-3 btn text-white tw-bg-gradient-to-r tw-from-teal-400 tw-to-blue-500 hover:tw-from-pink-500 hover:tw-to-orange-500"
          onClick={() => handleChange(3)}
        >
          Last 3 month's
        </button>
        <button
          className="ms-3 btn text-white tw-bg-gradient-to-r tw-from-teal-400 tw-to-blue-500 hover:tw-from-pink-500 hover:tw-to-orange-500"
          onClick={() => handleChange(6)}
        >
          Last 6 month's
        </button>
        <button
          className="ms-3 btn text-white tw-bg-gradient-to-r tw-from-teal-400 tw-to-blue-500 hover:tw-from-pink-500 hover:tw-to-orange-500"
          onClick={() => handleChange(12)}
        >
          Last 12 month's
        </button>
      </div>
      <div className="d-flex justify-content-center">
        <BarChart
          dataset={chartData.dataset}
          xAxis={[
            {
              id: "barCategories",
              data: chartData.xAxis,
              scaleType: "band",
            },
          ]}
          series={[
            {
              dataKey: "incomes",
              label: "Incomes by month",
              valueFormatter,
              color: "#2dd4bf",
            },
            {
              dataKey: "expenses",
              label: "Expenses by month",
              valueFormatter,
              color: "#f15a61",
            },
          ]}
          width={700}
          height={400}
          onItemClick={handleBarsCLick}
        />
      </div>
      {tableData ? (
        <ChartTabPane columns={columns} transactions={tableData} />
      ) : null}
    </div>
  ) : (
    "Loading..."
  );
};
