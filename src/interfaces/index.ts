export interface HandleChangeProps {
  name: string;
  value: string | string[] | boolean;
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
  bankAccounts?: string[];
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
