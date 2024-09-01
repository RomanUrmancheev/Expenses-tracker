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
  value: string | number;
  onChange: (props: HandleChangeProps) => void;
  label: string;
  error: string;
}

export interface ICategories {
  _id: string;
  title: string;
  color: string;
}

export interface ISelectField {
  label: string;
  onChange: (props: HandleChangeProps) => void;
  name: string;
  value: string;
  defaultOption: string;
  options: ICategories[] | IBankAccount[];
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
  listLink: string;
  bgColor: string;
  data: ITransaction[] | IBankAccount[];
}

export interface IBankAccount {
  _id: string;
  title: string;
  total: number;
  userId: string;
}

export interface IBankAccountCreate {
  title: string;
  total: number;
  userId: string;
}

export interface IMainPageCardItem {
  data: ITransaction | IBankAccount;
}

export interface ITransaction {
  _id?: string;
  title: string;
  total: number;
  bankAccountId: string;
  userId: string;
  category: string;
  date: string;
}

export interface RouteParams {
  [key: string]: string;
}
