import { useState } from "react";
import AnalyticsNav from "./AnalyticsNav";
import AnalyticsTabPane from "./AnalyticsTabPane";
import donutChart from "../../assets/donutChart.svg";
import barChart from "../../assets/bar_chart.svg";
import TabPaneContent from "../common/TabPaneContent";
import compareChart from "../../assets/compareChart.svg";

const AnalyticTabs = () => {
  const [status, setStatus] = useState("Expenses");

  const toggleStatus = (e: React.MouseEvent<HTMLButtonElement>) => {
    const button: HTMLButtonElement = e.target as HTMLButtonElement;
    setStatus(button.name);
  };

  return (
    <>
      <nav>
        <div className="nav nav-tabs" id="nav-tab" role="tablist">
          <AnalyticsNav
            name="Expenses"
            status={status}
            onClick={toggleStatus}
          />
          <AnalyticsNav name="Income" status={status} onClick={toggleStatus} />
        </div>
      </nav>
      <div className="tab-content" id="nav-tabContent">
        <AnalyticsTabPane name="Expenses" status={status}>
          <TabPaneContent
            svg={donutChart}
            label="Expenses by categories"
            url="/analytics/donut"
          />
          <TabPaneContent
            svg={barChart}
            label="Expenses by month"
            url="/analytics/bars-chart"
          />
        </AnalyticsTabPane>
        <AnalyticsTabPane name="Income" status={status}>
          <TabPaneContent
            svg={compareChart}
            label="Incomes/Expenses comparison"
            url="/analytics/comparison"
          />
          <TabPaneContent
            svg={barChart}
            label="Incomes by month"
            url="/analytics/income-bars-chart"
          />
        </AnalyticsTabPane>
      </div>
    </>
  );
};

export default AnalyticTabs;
