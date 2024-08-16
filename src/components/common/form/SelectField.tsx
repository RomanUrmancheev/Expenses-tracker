/* eslint-disable indent */
import React from "react";
import { ISelectField } from "../../../interfaces";

const SelectField = ({
  label,
  onChange,
  name,
  value,
  defaultOption,
  options,
  error,
}: ISelectField) => {
  const handleChange = ({ target }: React.ChangeEvent<HTMLSelectElement>) => {
    onChange({ name: target.name, value: target.value });
  };

  //   const optionsArray =
  //     !Array.isArray(options) && typeof options === "object"
  //       ? Object.keys(options).map((optionName) => ({
  //           name: options[optionName].name,
  //           _id: options[optionName]._id,
  //         }))
  //       : options;

  const getInputClasses = () => {
    return "form-select" + (error ? " is-invalid" : "");
  };

  return (
    <div className="mb-4">
      <label htmlFor={name} className="form-label">
        {label}
      </label>
      <select
        className={getInputClasses()}
        id={name}
        name={name}
        onChange={handleChange}
        value={value}
      >
        <option disabled value="">
          {defaultOption}
        </option>
        {options &&
          options.map((option) => (
            <option key={option._id} value={option._id}>
              {option.title}
            </option>
          ))}
      </select>
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
};

export default SelectField;
