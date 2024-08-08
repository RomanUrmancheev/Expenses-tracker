export interface HandleChangeProps {
  name: string;
  value: string | string[];
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
