import { useParams } from "react-router";
import { RouteParams } from "../interfaces";
import DonutChartPage from "../components/common/pages/DonutChartPage";
import BarsChartPage from "../components/common/pages/BarsChartPage";
import IncomeBarsChartPage from "../components/common/pages/IncomeBarsChart";
import { ExpensesIncomeChartPage } from "../components/common/pages/ExpenseIncomeChartPage";

const Analytics = () => {
  const params = useParams();
  const { type }: RouteParams = params;
  return (
    <>
      {type === "donut" ? (
        <DonutChartPage />
      ) : type === "bars-chart" ? (
        <BarsChartPage />
      ) : type === "income-bars-chart" ? (
        <IncomeBarsChartPage />
      ) : (
        <ExpensesIncomeChartPage />
      )}
    </>
  );
};

export default Analytics;
