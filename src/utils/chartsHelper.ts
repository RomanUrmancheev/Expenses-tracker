import moment from "moment";
import { ICategories, ITransaction } from "../interfaces";

export type ChartData = {
  id: string;
  value: number;
  label: string;
  color: string;
};

const getColorForChart = (color: string) => {
  switch (color) {
    case "primary":
      return "#0d6efd";
    case "warning":
      return "#ffc107";
    case "success":
      return "#198754";
    case "danger":
      return "#dc3545";
    case "info-subtle":
      return "#cff4fc";
    case "info":
      return "#0dcaf0";
    case "success-subtle":
      return "#d1e7dd";
  }
};

export const getDataForDonutChart = (
  expanses: ITransaction[],
  categories: ICategories[]
) => {
  const data = [] as ChartData[];

  categories.forEach((element) => {
    const categoryExpanses = expanses.filter((e) => e.category === element._id);
    if (categoryExpanses.length > 0) {
      const expansesSum = categoryExpanses.reduce(
        (sum, current: ITransaction) => sum + current.total,
        0
      );
      const color = getColorForChart(element.color);
      data.push({
        id: element._id,
        label: element.title,
        value: expansesSum * -1,
        color: color as string,
      });
    }
  });

  return data;
};

export const getDataForBarsChart = (
  list: ITransaction[],
  range: number,
  isIncome: boolean
) => {
  const dateArr = [];
  const totalArr = [];
  const tableData = [];
  if (isIncome) {
    for (let i = 0; i < range; i++) {
      dateArr.unshift(
        moment().subtract(i, "months").format("MMMM").slice(0, 3)
      );
      totalArr.unshift(
        list
          .filter((e) =>
            moment(e.date, "DD.MM.YYYY").isBetween(
              moment().subtract(i, "months").startOf("month"),
              moment().subtract(i, "months").endOf("month")
            )
          )
          .reduce((sum, current: ITransaction) => sum + current.total, 0)
      );
      tableData.unshift(
        list.filter((e) =>
          moment(e.date, "DD.MM.YYYY").isBetween(
            moment().subtract(i, "months").startOf("month"),
            moment().subtract(i, "months").endOf("month")
          )
        )
      );
    }
  } else {
    for (let i = 0; i < range; i++) {
      dateArr.unshift(
        moment().subtract(i, "months").format("MMMM").slice(0, 3)
      );
      totalArr.unshift(
        list
          .filter((e) =>
            moment(e.date, "DD.MM.YYYY").isBetween(
              moment().subtract(i, "months").startOf("month"),
              moment().subtract(i, "months").endOf("month")
            )
          )
          .reduce((sum, current: ITransaction) => sum + current.total * -1, 0)
      );
      tableData.unshift(
        list.filter((e) =>
          moment(e.date, "DD.MM.YYYY").isBetween(
            moment().subtract(i, "months").startOf("month"),
            moment().subtract(i, "months").endOf("month")
          )
        )
      );
    }
  }
  return { xAxis: dateArr, series: totalArr, tableData: tableData };
};

export const getDataForExpenseIncomeChart = (
  expenses: ITransaction[],
  incomes: ITransaction[],
  range: number
) => {
  const dateArr = [];
  const totalExp = [];
  const totalInc = [];
  const tableData = [];
  for (let i = 0; i < range; i++) {
    dateArr.unshift(moment().subtract(i, "months").format("MMMM").slice(0, 3));
    const incomesForPeriod = incomes.filter((e) =>
      moment(e.date, "DD.MM.YYYY").isBetween(
        moment().subtract(i, "months").startOf("month"),
        moment().subtract(i, "months").endOf("month")
      )
    );
    const expensesForPeriod = expenses.filter((e) =>
      moment(e.date, "DD.MM.YYYY").isBetween(
        moment().subtract(i, "months").startOf("month"),
        moment().subtract(i, "months").endOf("month")
      )
    );
    totalExp.unshift(
      expensesForPeriod.reduce(
        (sum, current: ITransaction) => sum + current.total * -1,
        0
      )
    );
    totalInc.unshift(
      incomesForPeriod.reduce(
        (sum, current: ITransaction) => sum + current.total * -1,
        0
      )
    );
    tableData.unshift({
      incomes: incomesForPeriod,
      expenses: expensesForPeriod,
    });
  }
  const result = {
    xAxis: dateArr,
    expenses: totalExp,
    incomes: totalInc,
    tableData: tableData,
  };
  // console.log(result);
  return result;
};
