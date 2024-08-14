import { Link } from "react-router-dom";
import { useAppSelector } from "../../hooks/reduxHooks";
import { getIsLoggedIn } from "../../store/users";
import NavProfile from "./NavProfile";

const Navigation = () => {
  const isLoggedIn = useAppSelector(getIsLoggedIn());

  return (
    <nav className="navbar mb-3 tw-bg-gradient-to-r tw-from-teal-400 tw-to-blue-500 p-4 w-full">
      <div className="container-lg">
        <div className="d-flex justify-content-between">
          <div className="d-flex align-self-center me-3 tw-border-r-2 p-2">
            <Link
              className="text-white fw-bolder nav-link fs-5 tw-text-lg"
              to="../../"
            >
              Expenses Tracker
            </Link>
          </div>

          <ul className="nav me-3">
            <li>
              <Link
                className="text-white fs-5 nav-link tw-text-lg"
                aria-current="page"
                to="../../"
              >
                Main
              </Link>
            </li>
            {isLoggedIn && (
              <li>
                <Link
                  className="nav-link fs-5 text-white tw-text-lg"
                  to="../../history"
                >
                  History
                </Link>
              </li>
            )}
          </ul>
        </div>
        <div className="d-flex align-self-center">
          {isLoggedIn ? (
            <NavProfile />
          ) : (
            <Link className="nav-link fs-5 text-white tw-text-lg" to="../login">
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
