interface EditTransactionButtonProps {
  onEdit: (props: string) => void;
  id: string;
}

const EditTransactionButton = ({ onEdit, id }: EditTransactionButtonProps) => {
  return (
    <button
      type="button"
      onClick={() => onEdit(id)}
      className="btn fs-1 text-white tw-bg-gradient-to-r tw-from-teal-400 tw-to-blue-500 hover:tw-from-pink-500 hover:tw-to-orange-500"
    >
      <i className="bi bi-pencil-square" />
    </button>
  );
};

export default EditTransactionButton;
