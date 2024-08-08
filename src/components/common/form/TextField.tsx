import React, { useState } from "react";
import PropTypes from "prop-types";
import { IErrors } from "../../ui/formTypes";

const TextField = ({ name, type, value, onChange, label, error }: IErrors) => {
  const [showPassword, setShowPassword] = useState(false);
  const getInputClasses = () => {
    return "form-control" + (error ? " is-invalid" : "");
  };
  const togleShowPasport = () => {
    setShowPassword((prevState) => !prevState);
  };

  const handleChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    onChange({ name: target.name, value: target.value });
  };

  return (
    <>
      <div className="mb-4">
        <label htmlFor={name}>{label}</label>
        <div className="input-group has-validation">
          <input
            className={getInputClasses()}
            type={showPassword ? "text" : type}
            name={name}
            id={name}
            value={value}
            onChange={handleChange}
          />
          {type === "password" && (
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={togleShowPasport}
            >
              <i className={"bi bi-eye" + (!showPassword ? "-slash" : "")} />
            </button>
          )}
          {error && <div className="invalid-feedback">{error}</div>}
        </div>
      </div>
    </>
  );
};

TextField.defaultProps = {
  type: "text",
};

TextField.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  error: PropTypes.string,
};

export default TextField;
