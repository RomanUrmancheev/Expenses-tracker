import { ITransaction, ITransactionCreate } from "../interfaces";
import httpService from "./http.service";

const transactionEndpoint = "transaction/";

const transactionService = {
  createTransaction: async (payload: ITransactionCreate) => {
    const { data } = await httpService.post(transactionEndpoint, payload);
    return data;
  },
  getTransaction: async (userId: string) => {
    const { data } = await httpService.get(transactionEndpoint, {
      params: {
        orderBy: "userId",
        equalTo: `${userId}`,
      },
    });
    return data;
  },
  deleteTransaction: async (transactionId: string) => {
    const { data } = await httpService.delete(
      transactionEndpoint + transactionId
    );
    return data;
  },
  updateTransaction: async (payload: ITransaction) => {
    const { data } = await httpService.patch(
      transactionEndpoint + payload._id,
      payload
    );
    return data;
  },
};

export default transactionService;
