import { useHistory } from "react-router";

const BackHistoryButton = () => {
  const history = useHistory();
  return (
    <button
      className="btn btn-lg text-white tw-bg-gradient-to-r tw-from-teal-400 tw-to-blue-500 hover:tw-from-pink-400 hover:tw-to-rose-600"
      onClick={() => history.goBack()}
    >
      Go back
    </button>
  );
};

export default BackHistoryButton;
