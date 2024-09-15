import { useParams } from "react-router";
import { RouteParams } from "../interfaces";
import CreateTransaction from "../components/common/pages/CreateTransaction";
import EditTransaction from "../components/common/pages/EditTransaction";
import TransactionHistory from "../components/common/pages/TransactionHistory";

const Transactions = () => {
  const params = useParams();
  const { action }: RouteParams = params;
  return (
    <>
      {action ? (
        action === "edit" ? (
          <EditTransaction />
        ) : (
          <CreateTransaction />
        )
      ) : (
        <TransactionHistory />
      )}
    </>
  );
};

export default Transactions;
