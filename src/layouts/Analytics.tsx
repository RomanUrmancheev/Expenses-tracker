import { useParams } from "react-router";
import { RouteParams } from "../interfaces";
import DonutChartPage from "../components/common/pages/DonutChartPage";

const Analytics = () => {
  const params = useParams();
  const { type }: RouteParams = params;
  return (
    <>
      {type === "donut" ? (
        <DonutChartPage />
      ) : type === "bars-chart" ? (
        BarsChartPage //<BarsChartPage />
      ) : (
        IncomeBarsChartPage //<IncomeBarsChartPage />
      )}
    </>
  );
};

export default Analytics;
