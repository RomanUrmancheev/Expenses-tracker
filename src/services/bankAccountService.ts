import { IBankAccount } from "../interfaces";
import httpService from "./http.service";

const bankAccountEndpoint = "bankAccount/";

const bankAccountService = {
  createBankAccount: async (payload: IBankAccount) => {
    const { data } = await httpService.post(bankAccountEndpoint, payload);
    return data;
  },
  getBankAccount: async (userId: string) => {
    const { data } = await httpService.get(bankAccountEndpoint, {
      params: {
        orderBy: "userId",
        equalTo: `${userId}`,
      },
    });
    return data;
  },
  deleteBankAccount: async (bankAccountId: string) => {
    const { data } = await httpService.delete(
      bankAccountEndpoint + bankAccountId
    );
    return data;
  },
  updateBankAccount: async (payload: IBankAccount) => {
    const { data } = await httpService.patch(
      bankAccountEndpoint + payload._id,
      payload
    );
    return data;
  },
};

export default bankAccountService;
