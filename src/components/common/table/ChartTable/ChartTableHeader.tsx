type TableHeaderProps = {
  columns: string[];
};

const ChartTableHeader = ({ columns }: TableHeaderProps) => {
  return (
    <thead>
      <tr>
        {columns.map((i) => (
          <th key={i} scope="col">
            {i}
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default ChartTableHeader;
