import { useHistory } from "react-router";

interface Props {
  label: string;
  link: string;
}

const CreateNewButton = ({ label, link }: Props) => {
  const history = useHistory();
  return (
    <button
      className="btn btn-lg text-white tw-bg-gradient-to-r tw-from-teal-400 tw-to-blue-500 hover:tw-from-pink-400 hover:tw-to-rose-600"
      onClick={() => history.push(link)}
    >
      <i className="bi bi-plus-circle" />
      {"  "}
      {label}
    </button>
  );
};

export default CreateNewButton;
