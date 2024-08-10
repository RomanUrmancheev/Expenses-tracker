import { ILicenseCheckBox } from "../../../interfaces";

export const CheckBoxField = ({
  name,
  onChange,
  value,
  children,
  error,
}: ILicenseCheckBox) => {
  const handleChange = () => {
    onChange({ name: name, value: !value });
  };

  const getInputClasses = () => {
    return "form-check-input" + (error ? " is-invalid" : "");
  };

  return (
    <div className="form-check mb-4">
      <input
        className={getInputClasses()}
        type="checkbox"
        value=""
        id={name}
        onChange={handleChange}
        checked={value}
      />
      <label className="form-check-label" htmlFor={name}>
        {children}
      </label>
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
};
