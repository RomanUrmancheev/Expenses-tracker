import { ITransaction } from "../../../../interfaces";
import Category from "../../../ui/Category";
import TotalAmount from "../../../ui/TotalAmount";

interface tableProps {
  data: ITransaction[];
}

const ChartTableBody = ({ data }: tableProps) => {
  return (
    <tbody>
      {data.map((i) => (
        <tr key={i._id}>
          <td key={i.title}>{i.title}</td>
          <td key={i.date}>{i.date}</td>
          <td key={i.category}>
            <Category categoryId={i.category} />{" "}
          </td>
          <td key={i.total}>
            <TotalAmount transaction={i} />
          </td>
        </tr>
      ))}
    </tbody>
  );
};

export default ChartTableBody;
