type AnalyticsNavProps = {
  name: string;
  status: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

const AnalyticsNav = ({ name, status, onClick }: AnalyticsNavProps) => {
  return (
    <button
      name={name}
      className={"nav-link" + (name === status ? " show active" : "")}
      onClick={onClick}
      id={"nav-Expenses-tab" + { name }}
      type="button"
    >
      {name}
    </button>
  );
};

export default AnalyticsNav;
