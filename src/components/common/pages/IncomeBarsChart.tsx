import { useEffect, useState } from "react";
import { useAppSelector } from "../../../hooks/reduxHooks";
import { getTransactions } from "../../../store/transactions";
import { getDataForBarsChart } from "../../../utils/chartsHelper";
import { BarChart, BarItemIdentifier } from "@mui/x-charts";
import { ITransaction } from "../../../interfaces";
import ChartTable from "../table/ChartTable/ChartTable";

type ChartDataType = {
  xAxis: string[];
  series: number[];
  tableData: ITransaction[][];
};

const columns = ["Title", "Date", "Category", "Total amount"];

const IncomeBarsChartPage = () => {
  const transactions = useAppSelector(getTransactions());
  const incomesList = transactions.filter((i) => i.total > 0);
  const [chartRange, setChartRange] = useState(3);
  const [chartData, setChartData] = useState<ChartDataType>();
  const [tableData, setTableData] = useState<ITransaction[] | null>(null);

  useEffect(() => {
    if (incomesList !== undefined) {
      setChartData(getDataForBarsChart(incomesList, chartRange, true));
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
    if (chartData !== undefined)
      setTableData(chartData?.tableData[bar.dataIndex]);
  };

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
          xAxis={[
            {
              id: "barCategories",
              data: chartData.xAxis,
              scaleType: "band",
            },
          ]}
          series={[
            {
              data: chartData.series,
              label: "Expenses by month",
            },
          ]}
          width={700}
          height={400}
          onItemClick={handleBarsCLick}
        />
      </div>
      {tableData !== null ? (
        <ChartTable
          columns={columns}
          transactions={tableData}
          isChartTable={true}
        />
      ) : null}
    </div>
  ) : (
    "Loading..."
  );
};

export default IncomeBarsChartPage;
