import { useState } from "react";
import AnalyticsNav from "./AnalyticsNav";
import AnalyticsTabPane from "./AnalyticsTabPane";
import ChartTable from "../common/table/ChartTable/ChartTable";
import { ITransaction } from "../../interfaces";

type TransactionsType = {
  expenses: ITransaction[];
  incomes: ITransaction[];
};

interface IChartTabProps {
  columns: string[];
  transactions: TransactionsType;
}

const ChartTabPane = ({ columns, transactions }: IChartTabProps) => {
  const [status, setStatus] = useState("Expenses");

  const toggleStatus = (e: React.MouseEvent<HTMLButtonElement>) => {
    const button: HTMLButtonElement = e.target as HTMLButtonElement;
    setStatus(button.name);
  };

  return (
    <div className="container w-50 mt-3">
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
          <ChartTable
            columns={columns}
            transactions={transactions.expenses}
            isChartTable={false}
          />
        </AnalyticsTabPane>
        <AnalyticsTabPane name="Income" status={status}>
          <ChartTable
            columns={columns}
            transactions={transactions.incomes}
            isChartTable={false}
          />
        </AnalyticsTabPane>
      </div>
    </div>
  );
};

export default ChartTabPane;
