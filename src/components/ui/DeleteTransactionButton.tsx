interface DeleteTransactionButtonProps {
  onDelete: (props: string) => void;
  id: string;
}

const DeleteTransactionButton = ({
  onDelete,
  id,
}: DeleteTransactionButtonProps) => {
  return (
    <button
      type="button"
      onClick={() => onDelete(id)}
      className="btn fs-1 text-white tw-bg-gradient-to-r tw-from-teal-400 tw-to-blue-500 hover:tw-from-pink-400 hover:tw-to-rose-600"
    >
      <i className="bi bi-trash" />
    </button>
  );
};

export default DeleteTransactionButton;
