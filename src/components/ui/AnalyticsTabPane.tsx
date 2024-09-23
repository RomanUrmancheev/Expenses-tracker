type TabPaneProps = {
  name: string;
  status: string;
  children: React.ReactNode;
};

const AnalyticsTabPane = ({ name, status, children }: TabPaneProps) => {
  return (
    <div
      className={"tab-pane" + (name === status ? " show active" : "")}
      id={"nav-expenses" + { name }}
      role="tabpanel"
    >
      <div className="d-flex">{children}</div>
    </div>
  );
};

export default AnalyticsTabPane;
