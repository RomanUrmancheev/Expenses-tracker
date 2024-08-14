export interface HandleChangeProps {
  name: string;
  value: string | string[] | boolean | number;
}

export interface IErrors {
  [key: string]: string;
}

export interface ITextField {
  type: string;
  name: string;
  value: string;
  onChange: (props: HandleChangeProps) => void;
  label: string;
  error: string;
}

export interface ILicenseCheckBox {
  name: string;
  onChange: (props: HandleChangeProps) => void;
  value: boolean;
  children: React.ReactNode;
  error: string;
}

export interface ISetTokenProps {
  accessToken: string;
  refreshToken: string;
  userId: string;
  expiresIn: string;
}

export interface IUser {
  _id?: string;
  name: string;
  email: string;
  password: string;
}

export interface IAuth {
  userId: string;
}

export interface IUserState {
  entities: IUser | null;
  isLoading: boolean;
  errors: IErrors | null;
  auth: IAuth | null;
  isLoggedIn: boolean;
  dataIsLoaded: boolean;
}

export interface ILoginPayload {
  email: string;
  password: string;
}

export interface IAppLoaderProps {
  children: React.ReactNode;
}

export interface IMainCard {
  headImg: string;
  name: string;
  link: string;
  bgColor: string;
  data: IBankAccount[];
}

export interface IBankAccount {
  _id?: string;
  title: string;
  total: number;
  userId: string;
}

export interface IMainPageCardItem {
  data: IBankAccount;
}

export interface ITransaction {
  _id?: string;
  title: string;
  total: number;
  bankAccountId: string;
  userId: string;
  category: string;
  isExpense: boolean;
  Date: string;
}
