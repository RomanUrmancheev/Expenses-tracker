import _ from "lodash";
import { IColumns, ITransaction } from "../../../../interfaces";

interface TableBodyProps {
  data: ITransaction[];
  columns: IColumns[];
}

const TableBody = ({ data, columns }: TableBodyProps) => {
  const renderContent = (item: ITransaction, column: IColumns) => {
    if (column.component) {
      const component = column.component;
      if (typeof component === "function") {
        return component(item);
      }
      return component;
    }
    if (column.path !== undefined) {
      return _.get(item, column.path);
    }
  };

  return (
    <tbody>
      {data.map((item) => (
        <tr key={item._id}>
          {columns.map((column) => (
            <td key={`${item._id}${column.name}`}>
              {renderContent(item, column)}
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  );
};

export default TableBody;
