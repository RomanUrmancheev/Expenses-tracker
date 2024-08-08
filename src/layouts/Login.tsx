import { useParams } from "react-router";
import { useState } from "react";
import LoginForm from "../components/ui/LoginForm";
import RegistrationForm from "../components/ui/RegistrationForm";

interface Props {
  type: string;
}

const Login = () => {
  const { type }: Props = useParams();
  const [formType, setFormType] = useState(
    type === "registration" ? type : "login"
  );
  const toggleFormType = () => {
    setFormType((prevState: string) =>
      prevState === "registration" ? "login" : "registration"
    );
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6  offset-md-3 shadow p-4">
          {formType === "login" ? (
            <>
              <h3 className="mb-4">Login</h3>
              <LoginForm />
              <p>
                Dont have an account?{" "}
                <a role="button" onClick={toggleFormType}>
                  Sign Up
                </a>
              </p>
            </>
          ) : (
            <>
              <h3 className="mb-4">Registration</h3>
              <RegistrationForm />
              <p>
                Already have account?{" "}
                <a role="button" onClick={toggleFormType}>
                  Sign In
                </a>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
