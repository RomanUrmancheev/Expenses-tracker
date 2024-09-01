import { IBankAccount } from "../../../../interfaces";
import getAmountClass from "../../../../utils/getAmountClass";

interface tableProps {
  data: IBankAccount[];
  onEdit: (props: string) => void;
  onDelete: (props: string) => void;
}

const AccountsTableBody = ({ data, onEdit, onDelete }: tableProps) => {
  return (
    <tbody>
      {data.map((i) => (
        <tr key={i._id}>
          <td key={i.title}>{i.title}</td>
          <td key={i.total}>
            <div className={getAmountClass(i.total)}>{i.total}</div>
          </td>
          <td key={`edit${i._id}`}>
            <button
              type="button"
              onClick={() => onEdit(i._id)}
              className="btn fs-1 text-white tw-bg-gradient-to-r tw-from-teal-400 tw-to-blue-500 hover:tw-from-pink-500 hover:tw-to-orange-500"
            >
              <i className="bi bi-pencil-square" />
            </button>
          </td>
          <td key={`delete${i._id}`}>
            <button
              type="button"
              onClick={() => onDelete(i._id)}
              className="btn fs-1 text-white tw-bg-gradient-to-r tw-from-teal-400 tw-to-blue-500 hover:tw-from-pink-400 hover:tw-to-rose-600"
            >
              <i className="bi bi-trash" />
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  );
};

export default AccountsTableBody;
