import { IColumns } from "../../../../interfaces";

interface ISortBy {
  item: string;
  path: string;
  order: boolean | "asc" | "desc";
}

interface TableHeaderProps {
  onSort: (item: ISortBy) => void;
  selectedSort: ISortBy;
  columns: IColumns;
}

const TableHeader = ({ onSort, selectedSort, columns }: TableHeaderProps) => {
  const handleSort = (item: string) => {
    if (selectedSort.path === item) {
      onSort({
        ...selectedSort,
        order: selectedSort.order === "asc" ? "desc" : "asc",
      });
    } else {
      onSort({ path: item, item: item, order: "asc" });
    }
  };

  const renderSortArrow = (selectedSort: ISortBy, currentPath: string) => {
    if (selectedSort.path === currentPath && currentPath !== undefined) {
      if (selectedSort.order === "asc") {
        return <i className="bi bi-caret-down-fill"></i>;
      } else {
        return <i className="bi bi-caret-up-fill"></i>;
      }
    }
    return null;
  };

  return (
    <thead>
      <tr>
        {Object.keys(columns).map((column) => (
          <th
            key={column}
            onClick={() => handleSort(columns[column].path)}
            role={columns[column].path ? "button" : undefined}
            scope="col"
          >
            {columns[column].name}{" "}
            {renderSortArrow(selectedSort, columns[column].path)}
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default TableHeader;
