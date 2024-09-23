import { DatePicker } from "@mui/x-date-pickers";
import moment from "moment";
import { useState } from "react";
import { useAppSelector } from "../../../hooks/reduxHooks";
import { ITransaction } from "../../../interfaces";
import {
  getDataForDonutChart,
  getOptionsForChart,
} from "../../../utils/chartsHelper";
import { getCategoriesList } from "../../../store/categories";
import { getExpenses } from "../../../store/transactions";
import HighchartsReact from "highcharts-react-official";
import * as Highcharts from "highcharts";

const DonutChartPage = () => {
  const [dateRange, setDateRange] = useState({
    start: moment().startOf("month"),
    end: moment(),
  });

  const expensesList = useAppSelector(getExpenses());
  const categoriesList = useAppSelector(getCategoriesList());

  const filterExpanses = (expenses: ITransaction[]) => {
    const expensesFilteredByDate = expenses.filter((e) =>
      moment(e.date, "DD.MM.YYYY").isBetween(dateRange.start, dateRange.end)
    );
    return expensesFilteredByDate;
  };

  const handleDonutCLick = (e: React.PointerEvent<Highcharts.Point>) => {
    console.log(e);
  };

  const filteredExpenses = filterExpanses(expensesList);
  const expensesTotal = filteredExpenses.reduce(
    (sum, current: ITransaction) => sum + current.total,
    0
  );
  const dataForChart = getDataForDonutChart(filteredExpenses, categoriesList);
  const options = getOptionsForChart(
    "Total by category",
    `Total ${expensesTotal * -1}$`,
    "pie",
    dataForChart,
    handleDonutCLick
  );

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-center">
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
        <span className="mx-3 display-6"> - </span>
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
      </div>
      <HighchartsReact
        highcharts={Highcharts}
        options={options}
        onClick={handleDonutCLick}
      />
    </div>
  );
};

export default DonutChartPage;
