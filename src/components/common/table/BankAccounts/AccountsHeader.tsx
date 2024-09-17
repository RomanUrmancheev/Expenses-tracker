const AccountsHeader = () => {
  return (
    <thead>
      <tr>
        <th key="title" scope="col">
          Title
        </th>
        <th key="balance" scope="col">
          Account balance
        </th>
        <th key="edit" scope="col"></th>
        <th key="delete" scope="col"></th>
      </tr>
    </thead>
  );
};

export default AccountsHeader;
