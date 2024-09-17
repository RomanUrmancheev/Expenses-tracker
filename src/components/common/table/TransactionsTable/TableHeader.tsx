import { IColumns } from "../../../../interfaces";

interface ISortBy {
  item: string;
  path: string;
  order: boolean | "asc" | "desc";
}

interface TableHeaderProps {
  onSort: (item: ISortBy) => void;
  selectedSort: ISortBy;
  columns: IColumns[];
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
        {columns.map((column) => (
          <th
            key={column.name}
            onClick={
              column?.path ? () => handleSort(column.path as string) : undefined
            }
            role={column.path ? "button" : undefined}
            scope="col"
          >
            {column.name}
            {column.path ? renderSortArrow(selectedSort, column.path) : null}
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default TableHeader;
