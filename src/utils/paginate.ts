import _ from "lodash";
import { ITransaction } from "../interfaces";

export function paginate(
  items: ITransaction[],
  pageNumber: number,
  pageSize: number
) {
  const startIndex = (pageNumber - 1) * pageSize;
  return _(items).slice(startIndex).take(pageSize).value();
}
