import moment from "moment";
import { ITransaction } from "../interfaces";
import _ from "lodash";

export const getSortByDate = (
  transactions: ITransaction[],
  sortBY: string,
  order: boolean | "desc" | "asc"
) => {
  return _.orderBy(
    transactions.map((o) => ({
      ...o,
      date: moment(o.date, "DD.MM.YYYY"),
    })),
    [sortBY],
    [order]
  ).map((o) => ({
    ...o,
    date: moment(o.date).format("DD.MM.YYYY"),
  }));
};
