import { DatePicker } from "@mui/x-date-pickers";
import moment from "moment";
import { useEffect, useState } from "react";
import { useAppSelector } from "../../../hooks/reduxHooks";
import { ITransaction } from "../../../interfaces";
import { ChartData, getDataForDonutChart } from "../../../utils/chartsHelper";
import { getCategoriesList } from "../../../store/categories";
import { getTransactions } from "../../../store/transactions";
import {
  DefaultizedPieValueType,
  PieChart,
  PieItemIdentifier,
} from "@mui/x-charts";
import ChartTable from "../table/ChartTable/ChartTable";
import { PieCenterLabel } from "../../ui/PieCentralLabel";
import { getSortByDate } from "../../../utils/getSortByDate";

const columns = ["Title", "Date", "Category", "Total amount"];

const DonutChartPage = () => {
  const [dateRange, setDateRange] = useState({
    start: moment().startOf("month"),
    end: moment(),
  });
  const [isDisabled, setIsDisabled] = useState(true);

  const transactions = useAppSelector(getTransactions());
  const expensesList = transactions.filter((i) => i.total < 0);
  const categoriesList = useAppSelector(getCategoriesList());

  const filterExpanses = (expenses: ITransaction[]) => {
    const expensesFilteredByDate = expenses.filter((e) =>
      moment(e.date, "DD.MM.YYYY").isBetween(dateRange.start, dateRange.end)
    );

    const sortedTransactions = getSortByDate(
      expensesFilteredByDate,
      "date",
      "desc"
    );
    return sortedTransactions;
  };
  const [filteredExpenses, setFilteredExpenses] = useState<ITransaction[]>(
    filterExpanses(expensesList)
  );

  const [expensesListForTable, setExpensesListForTable] = useState<
    ITransaction[]
  >(filterExpanses(expensesList));
  const [dataForChart, setDataForChart] = useState<ChartData[]>();

  useEffect(() => {
    if (expensesList !== undefined) {
      setFilteredExpenses(filterExpanses(expensesList));
      setExpensesListForTable(filterExpanses(expensesList));
    }
  }, [transactions]);

  useEffect(() => {
    setFilteredExpenses(filterExpanses(expensesList));
    setExpensesListForTable(filterExpanses(expensesList));
    setIsDisabled(true);
  }, [dateRange]);

  useEffect(() => {
    if (filteredExpenses !== undefined) {
      setDataForChart(getDataForDonutChart(filteredExpenses, categoriesList));
    }
  }, [filteredExpenses]);

  const handleDonutCLick = (
    _event: React.MouseEvent<SVGPathElement, MouseEvent>,
    _itemIdentifier: PieItemIdentifier,
    item: DefaultizedPieValueType
  ) => {
    setIsDisabled(false);
    if (filteredExpenses) {
      setExpensesListForTable(
        filteredExpenses.filter((i) => i.category === item.id)
      );
    }
  };

  const clearFilter = () => {
    setExpensesListForTable(filteredExpenses);
    setIsDisabled(true);
  };

  const expensesTotal =
    filteredExpenses.reduce(
      (sum, current: ITransaction) => sum + current.total,
      0
    ) * -1;

  //TODO add pagination

  return dataForChart && expensesListForTable ? (
    <div className="d-flex flex-column mt-5">
      <div className="d-flex justify-content-center align-items-center mb-4">
        <DatePicker
          format="DD.MM.YYYY"
          label="Transaction range start"
          value={dateRange.start}
          onChange={(newValue) =>
            newValue &&
            setDateRange((prevState) => ({
              ...prevState,
              start: newValue,
            }))
          }
          slotProps={{ textField: { size: "small" } }}
        />
        <div className="mx-2 display-6"> - </div>
        <DatePicker
          format="DD.MM.YYYY"
          label="Transaction range end"
          value={dateRange.end}
          onChange={(newValue) =>
            newValue &&
            setDateRange((prevState) => ({
              ...prevState,
              end: newValue,
            }))
          }
          slotProps={{ textField: { size: "small" } }}
        />
        <button
          className="ms-3 btn btn-secondary"
          onClick={clearFilter}
          disabled={isDisabled}
        >
          Reset filter
        </button>
      </div>
      <div className="d-flex justify-content-center">
        <PieChart
          series={[
            {
              data: dataForChart,
              innerRadius: 60,
              highlightScope: { fade: "global", highlight: "item" },
              faded: { innerRadius: 70, additionalRadius: -10, color: "gray" },
            },
          ]}
          height={200}
          width={550}
          onItemClick={handleDonutCLick}
        >
          <PieCenterLabel>Total: {expensesTotal}$</PieCenterLabel>
        </PieChart>
      </div>
      <ChartTable columns={columns} transactions={expensesListForTable} />
    </div>
  ) : (
    "Loading..."
  );
};

export default DonutChartPage;
